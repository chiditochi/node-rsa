var colors = require("colors/safe");

const {
  generatePemFiles,
  getPublicKey,
  encrypt,
  decrypt,
  arcaEncrypt,
} = require("./api/node-rsa");

/*
    actions 
    - encr e.g npm run rsa encr text 
    - decr e.g npm run rsa decr encrypted
    - gene e.g npm run rsa gene
    -      e.g npm run rsa
*/

(async function () {
  const args = process.argv;
  // actions can be encr or decr
  const action = args[2];
  const value = args[3];

  if (action === "arca_encr") {
    console.log(colors.yellow(`To Encrypt data: \n`) + colors.bgWhite(value));
    const cipherText = await arcaEncrypt(value);
    console.log("CipherText: \n" + cipherText);
  } else if (action === "encr") {
    console.log(colors.yellow(`To Encrypt data: \n`) + colors.bgWhite(value));
    await encryptData(value);
  } else if (action === "decr") {
    console.log(colors.yellow(`To Decrypt data: \n`) + colors.bgWhite(value));
    await decryptData(value);
  } else if (action === "gene") {
    await generatePemFiles();
    console.log(
      colors.red("Keys: \n") +
        colors.green("publicKey and privateKey generated ...")
    );
  } else {
    const publicKey = await getPublicKey();
    console.log(colors.yellow("Public Key: \n") + colors.green(publicKey));
  }

  console.log(colors.green("\n\nDone ..."));
})();

async function encryptData(data) {
  //encrypted data
  const encrypted = await encrypt(data);
  console.log(colors.blue("\nEncrypted data: \n") + colors.green(encrypted));
}

async function decryptData(encrypted) {
  //decrypted data ...
  const decrypted = await decrypt(encrypted);
  const size = decrypted.length;
  console.log({size})
  const r = size === 246 ? decrypted.substring(242) : decrypted.substring(232);


  //const r = await decrypt(encrypted);
  console.log(colors.yellow("\nDecrypted data: \n") + colors.green(r));
}
