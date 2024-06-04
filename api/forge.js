var forge = require("node-forge");
const fs = require("node:fs/promises");
const path = require("node:path");
var colors = require("colors/safe");

const pki = forge.pki;
const rsa = pki.rsa;

//key file names 
const publicFileName = "keys/node-forge/public.pem";
const privateFileName = "keys/node-forge/private.pem";


const getForgeGeneratedKeyPair = async function () {
  let result = null;
  try {
    const keypair = await rsa.generateKeyPair({ bits: 2048, e: 0x10001 });
    result = {
      publicKey: keypair.publicKey,
      privateKey: keypair.privateKey,
    };
  } catch (error) {
    console.error(colors.red(error));
  }
  return result;
};

const getForgeKeys = async () => {
  const keys = await getForgeGeneratedKeyPair();
  // convert a Forge public key to PEM-format in  pkcs8
  const pemPublicKey = pki.publicKeyToPem(keys.publicKey);
  // convert a Forge public key to PEM-format in pkcs1
  const pemPrivateKey = pki.privateKeyToPem(keys.privateKey);
  return {
    pemPrivateKey,
    pemPublicKey,
  };
};

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
    const { pemPrivateKey, pemPublicKey } = await getForgeKeys();
    //write public key
    await writePemFile(pemPublicKey, publicFileName);
    //write private key
    await writePemFile(pemPrivateKey, privateFileName);
    console.log("done writing pem files to /keys/node-forge/");
  } catch (error) {
    console.error(colors.red("error writing forge files " + error));
  }
};

const encrypt = async (data) => {
  let result = null;
  try {
    const pem = await readPemFile(publicFileName);
    const publicKey = forge.pki.publicKeyFromPem(pem);
    const encrypted = publicKey.encrypt(data); // Use appropriate padding scheme "RSA-OAEP"
    result = forge.util.encode64(encrypted);
  } catch (error) {
    console.error(colors.red(error));
    result = null;
  }
  return result;
};

const decrypt = async (encryptedData) => {
  let result = null;
  try {
    const pem = await readPemFile(privateFileName);
    const privateKey = forge.pki.privateKeyFromPem(pem);
    const decrypted = privateKey.decrypt(forge.util.decode64(encryptedData));
    result = decrypted;
  } catch (error) {
    console.error(colors.red(error));
    result = null;
  }
  return result;
};

const getPublicKey = async ()=>{
    const start = '-----BEGIN PUBLIC KEY-----';
    const end = '-----END PUBLIC KEY-----';
   let pubKey=  await readPemFile(publicFileName);
   pubKey = pubKey.replace(start, '');
   pubKey = pubKey.replace(end, '');
   pubKey = pubKey.replaceAll(/\r\n|\n|\r/gm, '');
   return pubKey;
}

module.exports = {
  generatePemFiles,
  getPublicKey,
  encrypt,
  decrypt,
};
