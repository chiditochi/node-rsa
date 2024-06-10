const crypto = require('crypto');

function generateKeyPair(bits = 2048) {
  return new Promise((resolve, reject) => {
    crypto.generateKeyPair('rsa', { modulusLength: bits }, (err, publicKey, privateKey) => {
      if (err) reject(err);
      resolve({ publicKey, privateKey });
    });
  });
}

function publicKeyToPEM(publicKey) {
  const pemEncoded = crypto.publicEncryptPem(publicKey, { type: 'RSA-PKCS1-OAEP', padding: crypto.constants.RSA_PKCS1_PADDING });
  return pemEncoded.toString();
}

function privateKeyToPEM(privateKey) {
  const pemEncoded = crypto.privateExportPem({
    type: 'PKCS8',
    key: privateKey,
    // Optional attributes (e.g., encryption)
  });
  return pemEncoded.toString();
}

generateKeyPair()
  .then(keypair => {
    const publicKeyPEM = publicKeyToPEM(keypair.publicKey);
    const privateKeyPEM = privateKeyToPEM(keypair.privateKey);
    console.log("Public Key (PEM - X.509):", publicKeyPEM);
    console.log("Private Key (PEM - PKCS#8):", privateKeyPEM);
  })
  .catch(err => console.error(err));