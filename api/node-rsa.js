const nodeRSA = require("node-rsa");
const fs = require("node:fs/promises");
const path = require("node:path");
const colors = require("colors/safe");
const crypto = require("crypto");

//key file names
const publicFileName = "keys/node-rsa/public.pem";
const privateFileName = "keys/node-rsa/private.pem";
const arcaPublicFileName = "keys/arca-public-460.pem";

const writePemFile = async (pemFileData, fileName) => {
  const filePath = path.resolve(__dirname, "..", fileName);
  await fs.writeFile(filePath, pemFileData, { flag: "w+" });
};

const readPemFile = async (fileName) => {
  const filePath = path.resolve(__dirname, "..", fileName);
  const pemFile = await fs.readFile(filePath, "utf8");
  return pemFile;
};

const generatePemFiles = async () => {
  try {
    const key = new nodeRSA({ b: 2048 });

    const pubKey = key.exportKey("public");
    const pub = formatKey(pubKey, true);
    console.log(pub);
    await writePemFile(pub, publicFileName);

    const privateKey = key.exportKey();
    const priv = formatKey(privateKey, true);
    console.log(priv);
    await writePemFile(priv, privateFileName);

    console.log("done writing pem files to /keys/node-rsa/");

    /*
    const { pemPrivateKey, pemPublicKey } = await getForgeKeys();
    //write public key
    const pub = formatKey(pemPublicKey, true);
    await writePemFile(pub, publicFileName);
    //write private key
    const pri = formatKey(pemPrivateKey, true);
    await writePemFile(pri, privateFileName);
    console.log("done writing pem files to /keys/node-forge/");
    */
  } catch (error) {
    console.error(colors.red("error writing forge files " + error));
  }
};

const formatKey = (pem, withHeaders = false) => {
  let r = "";
  let array = pem.trim().split(/\r?\n/);
  let lastIndex = array.length - 1;
  pem.split(/\r?\n/).forEach(function (line, index) {
    console.log(line);
    if (index !== lastIndex && index !== 0) {
      r += line;
    }
  });
  result = withHeaders ? `${array[0]}\n${r}\n${array[lastIndex]}` : `${r}`;

  return result;
};



const encrypt = async (data) => {
  let result = null;
  try {
    const pem = await readPemFile(publicFileName);
    console.log(colors.yellow("\nClient public key: "));
    console.log(pem);
    const key = new nodeRSA(pem);

    const encrypted = key.encrypt(data, "base64");

    result = encrypted;
  } catch (error) {
    console.error(colors.red(error));
    result = null;
  }
  return result;
};

const arcaEncrypt = async (data) => {
  let result = null;
  try {
    const pem = await readPemFile(arcaPublicFileName);

    console.log(colors.yellow("\nArca public key: "));
    console.log(pem);
    const key = new nodeRSA(pem);
    const encrypted = key.encrypt(data, "base64");

    result = encrypted;
  } catch (error) {
    console.error(colors.red(error));
    result = null;
  }
  return result;
};


const decrypt = async (encryptedData) => {//working with hack
  let result = null;
  try {
    const pem = await readPemFile(privateFileName);
    console.log(colors.yellow("\nClient private key: "));
    console.log(pem);
    const k = formatKey(pem, true);
    // const key = new nodeRSA(k);
    // const decrypted = key.decrypt(encryptedData, "utf8");



    const buffer = Buffer.from(encryptedData, "base64");
    const decrypted = crypto.privateDecrypt(
      { key: k, padding: crypto.constants.RSA_NO_PADDING },
      buffer
    );
    result = decrypted.toString("utf8");
    console.log(result);

    //result = decrypted;
  } catch (error) {
    console.error(colors.red(error));
    result = null;
  }
  return result;
};

// const decrypt = async (encryptedData) => {
//   let result = null;
//   try {
//     const pem = await readPemFile(privateFileName);

//     console.log(colors.yellow("\nClient private key: "));
//     //let p = pem.replaceAll(' RSA ', ' ');
//     let p = pem.replaceAll('\r\n', '');
//     //formatKey(pem, )
//     console.log(p);
//     const key = new nodeRSA();
//     key.importKey(p)


//     const decrypted = key.decrypt(encryptedData, "utf8");
//     result = decrypted;
//   } catch (error) {
//     console.error(colors.red(error));
//     result = null;
//   }
//   return result;
// };

const getPublicKey = async () => {
  const start = "-----BEGIN PUBLIC KEY-----";
  const end = "-----END PUBLIC KEY-----";

  let pem = await readPemFile(publicFileName);
  pubKey = pem.replace(start, "");
  pubKey = pubKey.replace(end, "");
  //pubKey = formatKey(pubKey, true);


  return pubKey;
};

module.exports = {
  generatePemFiles,
  getPublicKey,
  encrypt,
  decrypt,
  arcaEncrypt,
};
