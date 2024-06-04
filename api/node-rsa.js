var nodeRSA = require("node-rsa");
const fs = require("node:fs/promises");
const path = require("node:path");
var colors = require("colors/safe");
const crypto = require("crypto");

//key file names
const publicFileName = "keys/node-rsa/public.pem";
const privateFileName = "keys/node-rsa/private.pem";

const writePemFile = async (pemFileData, fileName) => {
  const filePath = path.resolve(__dirname, "..", fileName);
  await fs.writeFile(filePath, pemFileData, { flag: "w+" });
};

const readPemFile = async (fileName) => {
  const filePath = path.resolve(__dirname, "..", fileName);
  const pemFile = await fs.readFile(filePath, "utf-8");
  return pemFile;
};

const generatePemFiles = async () => {
  try {
    const key = new nodeRSA({ b: 2048 });

    const pubKey = key.exportKey("public");
    await writePemFile(pubKey, publicFileName);

    const privateKey = key.exportKey("private");
    await writePemFile(privateKey, privateFileName);

    console.log("done writing pem files to /keys/node-rsa/");
  } catch (error) {
    console.error(colors.red("error writing forge files " + error));
  }
};

const encrypt = async (data) => {
  let result = null;
  try {
    const key = new nodeRSA({ b: 2048 });

    const pem = await readPemFile(publicFileName);
    const publicKey = key.importKey(pem, "public");
    const encrypted = publicKey.encrypt(data, "base64"); // Use appropriate padding scheme "RSA-OAEP"

    result = encrypted;
  } catch (error) {
    console.error(colors.red(error));
    result = null;
  }
  return result;
};

const decrypt = async (encryptedData) => {
  let result = null;
  try {
    
    const k = new nodeRSA({ b: 2048 }, 'RSA-OAEP');

    const pem = await readPemFile(privateFileName);
    const privateKey = k.importKey(pem, 'private');

    // console.log('\n Encrypted Data: \n' +encryptedData);
    const decrypted = privateKey.decrypt(encryptedData, 'utf8');

    result = decrypted;
  } catch (error) {
    console.error(colors.red(error));
    result = null;
  }
  return result;
};

const getPublicKey = async () => {
  const start = "-----BEGIN RSA PUBLIC KEY-----";
  const end = "-----END RSA PUBLIC KEY-----";
  let pubKey = await readPemFile(publicFileName);
  pubKey = pubKey.replace(start, "");
  pubKey = pubKey.replace(end, "");
  pubKey = pubKey.replaceAll(/\r\n|\n|\r/gm, "");
  return pubKey;
};

module.exports = {
  generatePemFiles,
  getPublicKey,
  encrypt,
  decrypt,
};
