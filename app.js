var colors = require("colors/safe");

const {
  generatePemFiles,
  getPublicKey,
  encrypt,
  decrypt,
  arcaEncrypt
} = require("./api/forge");

/*
    actions 
    - encr e.g npm run forge encr text 
    - decr e.g npm run forge decr encrypted
    - gene e.g npm run forge gene
    -      e.g npm run forge
*/

(async function () {
  const args = process.argv;
  // actions can be encr or decr
  const action = args[2];
  const value = args[3];


  if (action === "arca_encr"){
    console.log(colors.yellow(`To Encrypt data: \n` +colors.bgWhite(value)));
    const cipherText = await arcaEncrypt(value);
    console.log(colors.green('Encrypted data: \n') + colors.yellow(cipherText));
  }
  else if (action === "encr"){
    console.log(colors.yellow(`To Encrypt data: \n` +colors.bgWhite(value)));
    await encryptData(value);
  }
  else if (action === "decr"){
    console.log(colors.yellow(`To Decrypt data: \n` +colors.bgWhite(value)));
    await decryptData(value);
  }
  else if (action === "gene") {
    await generatePemFiles();
    console.log(
      colors.green("Keys: \n") +
        colors.blue("publicKey and privateKey generated ...")
    );
  } else {
    const publicKey = await getPublicKey();
    console.log(colors.green("Public Key: \n") + colors.blue(publicKey));
  }

  console.log(colors.green("\n\nDone ..."));
})();

async function encryptData(data) {
  //encrypted data
  const encrypted = await encrypt(data);
  console.log(colors.yellow("\nEncrypted data: \n") + colors.green(encrypted));
}

async function decryptData(encrypted) {
  //decrypted data ...
  const decrypted = await decrypt(encrypted);
  console.log(colors.yellow("\nDecrypted data: \n") + colors.green(decrypted));
}
