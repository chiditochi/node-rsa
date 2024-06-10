___

    Node RSA
___

- solution using node-forge works !!!

- solution using node-rsa does not work on "decrypt" ....

npm install node-forge

var forge = require('node-forge');

var rsa = forge.pki.rsa;

var keypair = rsa.generateKeyPair({bits: 2048, e: 0x10001}, function(err, keypair) {
  // keypair.privateKey, keypair.publicKey
});

   - // encrypt data with a public key (defaults to RSAES PKCS#1 v1.5)
    var encrypted = publicKey.encrypt(bytes);

   - // decrypt data with a private key (defaults to RSAES PKCS#1 v1.5)
    var decrypted = privateKey.decrypt(encrypted);

   - // encrypt data with a public key using RSAES PKCS#1 v1.5
    var encrypted = publicKey.encrypt(bytes, 'RSAES-PKCS1-V1_5');

   - // decrypt data with a private key using RSAES PKCS#1 v1.5
    var decrypted = privateKey.decrypt(encrypted, 'RSAES-PKCS1-V1_5');

   - // encrypt data with a public key using RSAES-OAEP
    var encrypted = publicKey.encrypt(bytes, 'RSA-OAEP');

   - // decrypt data with a private key using RSAES-OAEP
    var decrypted = privateKey.decrypt(encrypted, 'RSA-OAEP');

   - // encrypt data with a public key using RSAES-OAEP/SHA-256
    var encrypted = publicKey.encrypt(bytes, 'RSA-OAEP', {
    md: forge.md.sha256.create()
    });

   - // decrypt data with a private key using RSAES-OAEP/SHA-256
    var decrypted = privateKey.decrypt(encrypted, 'RSA-OAEP', {
    md: forge.md.sha256.create()
    });

   - // encrypt data with a public key using RSAES-OAEP/SHA-256/MGF1-SHA-1 | compatible with Java's RSA/ECB/OAEPWithSHA-256AndMGF1Padding
    var encrypted = publicKey.encrypt(bytes, 'RSA-OAEP', {
        md: forge.md.sha256.create(),
        mgf1: {
            md: forge.md.sha1.create()
        }
    });

    - // decrypt data with a private key using RSAES-OAEP/SHA-256/MGF1-SHA-1 | compatible with Java's RSA/ECB/OAEPWithSHA-256AndMGF1Padding
    var decrypted = privateKey.decrypt(encrypted, 'RSA-OAEP', {
        md: forge.md.sha256.create(),
        mgf1: {
            md: forge.md.sha1.create()
        }
    });



---------------------------------
    Node-rsa
---------------------------------
const NodeRSA = require('node-rsa');
 
const key = new NodeRSA([keyData, [format]], [options]);

- keyData — {string|buffer|object} — parameters for generating key or the key in one of supported formats.
- format — {string} — format for importing key. See more details about formats in Export/Import section.
- options — {object} — additional settings.

const key = new NodeRSA({b: 512});

- Load key from PEM string
    const key = new NodeRSA('-----BEGIN RSA PRIVATE KEY-----\n'+
                      'MIIBOQIBAAJAVY6quuzCwyOWzymJ7C4zXjeV/232wt2ZgJZ1kHzjI73wnhQ3WQcL\n'+
                      'DFCSoi2lPUW8/zspk0qWvPdtp6Jg5Lu7hwIDAQABAkBEws9mQahZ6r1mq2zEm3D/\n'+
                      'VM9BpV//xtd6p/G+eRCYBT2qshGx42ucdgZCYJptFoW+HEx/jtzWe74yK6jGIkWJ\n'+
                      'AiEAoNAMsPqwWwTyjDZCo9iKvfIQvd3MWnmtFmjiHoPtjx0CIQCIMypAEEkZuQUi\n'+
                      'pMoreJrOlLJWdc0bfhzNAJjxsTv/8wIgQG0ZqI3GubBxu9rBOAM5EoA4VNjXVigJ\n'+
                      'QEEk1jTkp8ECIQCHhsoq90mWM/p9L5cQzLDWkTYoPI49Ji+Iemi2T5MRqwIgQl07\n'+
                      'Es+KCn25OKXR/FJ5fu6A6A+MptABL3r8SEjlpLc=\n'+
                      '-----END RSA PRIVATE KEY-----');

- Import/Export keys
    key.importKey(keyData, [format]);
    key.exportKey([format]);

- Format string syntax  | 
        Format string composed of several parts: 
                scheme-[key_type]-[output_type]
    - Scheme — NodeRSA supports multiple format schemes for import/export keys:
        - 'pkcs1' — public key starts from '-----BEGIN RSA PUBLIC KEY-----' header and private key starts from '-----BEGIN RSA PRIVATE KEY-----' header
        - 'pkcs8' — public key starts from '-----BEGIN PUBLIC KEY-----' header and private key starts from '-----BEGIN PRIVATE KEY-----' header
        - 'openssh' — public key starts from 'ssh-rsa' header and private key starts from '-----BEGIN OPENSSH PRIVATE KEY-----' header
        - 'components' — use it for import/export key from/to raw components (see example below). For private key, importing data should contain all private key components, for public key: only public exponent (e) and modulus (n). All components (except e) should be Buffer, e could be Buffer or just normal Number.
    - Key type — can be 'private' or 'public'. Default 'private'
    - Output type — can be:
        'pem' — Base64 encoded string with header and footer. Used by default.
        'der' — Binary encoded key data.
    - Notice: For import, if keyData is PEM string or buffer containing string, you can do not specify format, but if you provide keyData as DER you must specify it in format string.
    - Shortcuts and examples
        - 'private' or 'pkcs1' or 'pkcs1-private' == 'pkcs1-private-pem' — private key encoded in pcks1 scheme as pem string.
        - 'public' or 'pkcs8-public' == 'pkcs8-public-pem' — public key encoded in pcks8 scheme as pem string.
        - 'pkcs8' or 'pkcs8-private' == 'pkcs8-private-pem' — private key encoded in pcks8 scheme as pem string.
        - 'pkcs1-der' == 'pkcs1-private-der' — private key encoded in pcks1 scheme as binary buffer.
        - 'pkcs8-public-der' — public key encoded in pcks8 scheme as binary buffer.

   - Code example
        - const keyData = '-----BEGIN PUBLIC KEY----- ... -----END PUBLIC KEY-----';
        - key.importKey(keyData, 'pkcs8');
        - const publicDer = key.exportKey('pkcs8-public-der');
        - const privateDer = key.exportKey('pkcs1-der');

        - 
        key.importKey({
            n: Buffer.from('0086fa9ba066685845fc03833a9699c8baefb53cfbf19052a7f10f1eaa30488cec1ceb752bdff2df9fad6c64b3498956e7dbab4035b4823c99a44cc57088a23783', 'hex'),
            e: 65537,
            d: Buffer.from('5d2f0dd982596ef781affb1cab73a77c46985c6da2aafc252cea3f4546e80f40c0e247d7d9467750ea1321cc5aa638871b3ed96d19dcc124916b0bcb296f35e1', 'hex'),
            p: Buffer.from('00c59419db615e56b9805cc45673a32d278917534804171edcf925ab1df203927f', 'hex'),
            q: Buffer.from('00aee3f86b66087abc069b8b1736e38ad6af624f7ea80e70b95f4ff2bf77cd90fd', 'hex'),
            dmp1: Buffer.from('008112f5a969fcb56f4e3a4c51a60dcdebec157ee4a7376b843487b53844e8ac85', 'hex'),
            dmq1: Buffer.from('1a7370470e0f8a4095df40922a430fe498720e03e1f70d257c3ce34202249d21', 'hex'),
            coeff: Buffer.from('00b399675e5e81506b729a777cc03026f0b2119853dfc5eb124610c0ab82999e45', 'hex')
        }, 'components');
        const publicComponents = key.exportKey('components-public');
        console.log(publicComponents);
        
        /*
        { n: <Buffer 00 86 fa 9b a0 66 68 58 45 fc 03 83 3a 96 99 c8 ba ef b5 3c fb f1 90 52 a7 f1 0f 1e aa 30 48 8c ec 1c eb 75 2b df f2 df 9f ad 6c 64 b3 49 89 56 e7 db ... >,
        e: 65537 
        }
        */


    - 
        - key.isPrivate();
        - key.isPublic([strict]);


MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAywasB/KfIRnXlIxsGjxz
Yx9i69vAdpVJdObUOvO5iBqklJMt5+1POfPH5cyL79XvMdca2Kp78l3wwQcagE9g
R7qAE90Ov0o5KLQ+6e3qCaI5lcR/AOV7Ba8nC70YeSKFf+j8vOcV54Ju8l4Xo5nI
aIgjjiOwcYa/jMeGbjItHaYju9rFNFYRZ4ygcIkYtmOw1dMW3zki/x+c2Ki+PLR7
s8ADqe4AOr8c/OS41ayuEojNME5+J8vvU7xZymwv8gAABu/DO7mwlcMLakGPjVQM
rlU5ggBQyXOuj0UqFn2OWv6HZKjeTNXv7UEuNynlmYcmSQ/F61outHIiPKpQtfdd
YwIDAQAB




-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwsuWtioH+16YrRDoXdTYyi+4udHNZeMgz5EvvRCRGDTMGunYvhfYOO0l+iOHQJUwTlVecs0RwJK2LoW/0YFrzcWmubCJctPZwy0tCVOkpy+Bb76T8HOmVG0ivSlGg4w4cZzppNp72e+78gNw7Kq9xD+MAwk/0fE/gBnykUlsf63J7O3pXJj0Xghky3JltXD+fa6WTOj6nAOrxLrkPnXr5DKa6C7SNbG6pXDZE6X2v8BLXt6xR2bckVl3cOv+0OUB58OhWuyrC8WtOHnq7WSBg7F5qrw9RzidbbWO1vOluiZDoUfwqdqdAa5Ct9kvcf0J5GiImk0c7pQkqoNE0uvkWQIDAQAB
-----END PUBLIC KEY-----

-----BEGIN RSA PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDCy5a2Kgf7XpitEOhd1NjKL7i50c1l4yDPkS+9EJEYNMwa6di+F9g47SX6I4dAlTBOVV5yzRHAkrYuhb/RgWvNxaa5sIly09nDLS0JU6SnL4FvvpPwc6ZUbSK9KUaDjDhxnOmk2nvZ77vyA3Dsqr3EP4wDCT/R8T+AGfKRSWx/rcns7elcmPReCGTLcmW1cP59rpZM6PqcA6vEuuQ+devkMproLtI1sbqlcNkTpfa/wEte3rFHZtyRWXdw6/7Q5QHnw6Fa7KsLxa04eertZIGDsXmqvD1HOJ1ttY7W86W6JkOhR/Cp2p0BrkK32S9x/QnkaIiaTRzulCSqg0TS6+RZAgMBAAECggEAKoug7USc3bA5lIM+3U+h0fc+V4eVXw2OmwdQ7/BwYGMXuUEeD9bRaQ2S3+FmpxpupI1MxbI4kGD63Ypk7PNhgl4LHj+KpcPTqidx0LmuGr3rfWaYlUoNKB92GO6s8gpsQZROC62Uo3MTD7bksSxRqk1e3ULl54rTnb0NF+J7ih8fRjxcUwWtZyKjYAkW0p4RHobniY3ZQuAtjlZwpMQ/GUSaN516JAHxwBdjRmsDbROsWUf/nMQo4ct4rnsmkigWxxB5QWqSEQFgXRUOkZZrN1PV22Xw2u399TAUcbjuxMDEBgSiB4VtEU3FSrrpFeMg0BGOWrzImrrWNmCQNCH3iQKBgQDxRDYulkgFQu+7b0KwupmojcN7TQzcxNHGjl0F7iBKUQIEyxX6VnIDEpa55eZSFvmcKrfu4gxZ4GyIr1d1R6LUwZ3jbJcnEPCFM3u4bFUjp+5xmM/FAl7FCCqRec7osgbcWU42XGjzSpHZdoKSnRWBagFt5pjy/43AtEC+gccHdwKBgQDOsOEtEXeXx1wmHGbP2QX7wKGQGXtGWqga0jaKYLNrm6L8RDvmwuHmG9Pfns9QGW3qYndd+mhlLq8B9w7iganj6KxxYw1OjFoDq3kbPh5EnCU7hRF8gomiiv4Z+5OK45MspDZkNA7AKk76ZciTlsUA2xSKnlRHResU7RbN6hcGrwKBgDIsakwj6pRViD9lcuwH0j6wRI/WxS8AK1PsdUHvdH2f/Rh8F3T5Fzq2WewM+Gnn5z7nz1p5XfIu7sM6G6kDHcS7AxexlHmGV06MF1WSCd6hZL/w9HxW8thsy1V3jGTt6OlYFSDO9PBreItNzveofTltjyCIzRPzu0nw8mnr2TUfAoGATrDK2fS3emKdM6lGf0VZ4NIi8JCy/UMQkz2LJD3SsVpMwAxeXem+RXQ8wvtcZFt6HG0mkvH+At+2I2JjGVtSSgHQfU6/xzLqJlGHRxbsQSTNjA6KbMPqEKcoPM4qCwu/gZR3XMjxALpa3TwZFA+nqz69YFUNMyFsccgeEYFZCOMCgYBMnn7ir/Rsv9BuAX/JnvRfGGFT/gRBGd3KzA2mO5hQL++vbrZXFA2zUBgQl50cKcP4CNaFEXVfRVaEkimUX22IskoTZwr9c9Ce2RK2ctvz7daK9lhLM8Dw0d51qFDMFdVt7BMlhNACYJ9QTOWPxsXixOh4GLDDxokK5hvSPnBf1Q==
-----END RSA PRIVATE KEY-----




'�w�k�Y���&S�lQ5^�IV ���!�ssv���-����s��RiY5��S7��Sa$)�J�ݞmkyS������,�6���h�ܑ�ةj��Xx�NHx���>�e��@�����b̹zn�uX�9;�J!Y6��xM�<�^\t��RCoI\ri�O]��������?�h�A�@��(\\��R����]��F���i��X&Ng�z>^�R�Ke0��^1<��R0?�yb�H5591130003135190'
'\r�E���d�����1��:M�����J=���?�7�r���і�n�(���@Lf���2�e�]����3E������}2��+��ҷ�,��/���d�N�A�r���j���$��z/b� -_6b,�pr�MxI�\nr���*F�.B�K��z5C~R��O�e��4b f.V���x��������A�k-?��3�E�D����.�X}��kC\t)Q�N��ʙ�D�;?痴 ��+~���D�O)�\r�1899'




----------------------------------------------------

----------------------------------------------------
public encryptWithBackendPublicKey(valueToEncrypt: string): string {
    var pem =
      ‘-----BEGIN PUBLIC KEY-----\n’ +
      environment.backendPublicKey +
      ‘-----END PUBLIC KEY-----‘;
    const rsa = Forge.pki.publicKeyFromPem(pem);
    return Forge.util.encode64(rsa.encrypt(valueToEncrypt));
  }
  public decryptWithPrivateKey(encryptedValue: string): string {
    var pem =
      ‘-----BEGIN PRIVATE KEY-----\n’ +
      environment.privateKey +
      ‘-----END PRIVATE KEY-----’;
    const rsa = Forge.pki.privateKeyFromPem(pem);
    const decodedValue = Forge.util.decode64(encryptedValue);
    return rsa.decrypt(decodedValue);
  }

  export const environment = {
  production: false,
  endPoint: ‘https://api.qa.arca-payments.network/jcard/api/’,
  clientPublicKey:
    ‘MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxJOSrO861qOXCO6V3+jtiFkTvS665oodVkOUTsDW8b8QeIhDr03qRkzdWu+X7MOUJs3U8A1WJPaWzCmIl+aAQlDnKoCopbZ9XGWhu4k60IH0uUv64R34D2SvItzMO1Y85uJrulHo1kkpgjwn0ggtG6Lh++v0eyQ22F7sCXjQKbvo3s74gQEBQC/fRFATrQNldBUe2UdFbWYVaoecvMewk8htqupnt12beIJGC9CjRir6JqDQFQjElQa/8SMqSIyl2KcCvolGl0T6Z2O7NQmJPS67N9tDKuJOsszoL0J+ebU7aUFGt3QY+jA5kdZ/zgKiBqyumfRniFQjTuwXpyqVfQIDAQAB’,
  backendPublicKey : `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhidYZ2wlHLwQw7N+rYfQ2PqWZGWRP18I2ohGIZmP9QHswn0IQleqiV0jeFAQ7aVcK2V5tqBJC6dNgtKZRN5G+Vcyg/kK4p46/Avf9qBnzrnChv8OboWkrl6c+opJfd6cS8oxtDN4Gvst4ElFnlHVGdvdBxrJ4QONU0lJ3DgYDASGQeMeLmRAuZ0g9g7Ez3X1+B7NPxs5C2+bh5awhve3e83/vUtaYnWpdA2nZ8pGxP/CIoNJWCLMuytAprDMdeKCFooNLyxFO+Mck975QwFcxVyhT53199ZrTNG/fEX7wPWV0YoAYeeTWamuiwUM4Lh52G52DMvtuLTlpI/tAyI3MQIDAQAB`,
  privateKey: `MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDEk5Ks7zrWo5cI7pXf6O2IWRO9Lrrmih1WQ5ROwNbxvxB4iEOvTepGTN1a75fsw5QmzdTwDVYk9pbMKYiX5oBCUOcqgKiltn1cZaG7iTrQgfS5S/rhHfgPZK8i3Mw7Vjzm4mu6UejWSSmCPCfSCC0bouH76/R7JDbYXuwJeNApu+jezviBAQFAL99EUBOtA2V0FR7ZR0VtZhVqh5y8x7CTyG2q6me3XZt4gkYL0KNGKvomoNAVCMSVBr/xIypIjKXYpwK+iUaXRPpnY7s1CYk9Lrs320Mq4k6yzOgvQn55tTtpQUa3dBj6MDmR1n/OAqIGrK6Z9GeIVCNO7BenKpV9AgMBAAECggEAIJd+bO64bigvB/DqvMuKlR3TuyeOybS3hXsXO/FsEdEbAtObiUAH/4I0pyRB/PmLoYgPQy0AOIkBL+C+VWpcSeJ5A/UollpfMYe7h3OKt/xRSLw+CxSkHAVA+6zpAvja3cWc6oY0blGGBiJBez4WIIFif267w65EQPPdUFANZLBeg/5vJbC3FpB9ek0/47MRW5bmuYS+IXHjmfbbYTcyCvEgilmgj15vD8MdRHV4Rd1lzn58KmMpTmVC61VaftFXDgxWqhG6vKeed20uyAjKkHSchLylBGgqIAcD53ut7fjQQO1Bp4WnGEMfl4bDQVI7G4LpVWXxyuPEUXGqaX24zwKBgQDiVjtTX0IK+FWDfE7PGhVRHo177mC588FQ7Vqr+ZNH6DtfWr1j2Xz3bZOYT9ZUwLYYEwJD3besRF4HqOH3amSL/lp6SGORBKI4lYbb1CXWtFGXwVkxRfQ6k8lozUNY83oyUntS+mEMC4qssgXwq/zvI5+D5neulJc/5573Wu7O4wKBgQDeVtu4SoUZiSLZFioDs9MnH51D1703h7NfqsHoIEPqxwilCxb8D4DHxVjvF5jsacP5ZlX6mBwQg+2bJuIcO/sQoK5slI/cIbEtTMGs51pfBSOfgaXuIv2nrWlVcSPQ5JdEl5d7WgtL5wkaW2AEiObSL0maIg9XG2Zc5uAoApDYHwKBgQCzcbiRTgm3VtG9cDWvPre926JCqminpRkUR0pG5JUfQoCoBfH3kvvf01FcRZfhE/SKu69lDQjNHFsMaZnVpdVXpG4pWvENjYXrpKkJ6nWhds7lqRZE2XhbZMYfP/XwNQEhmoFJ9VYxzYjBiFbrTAA5vJ2AXp1unUIZGVLQO5jwDwKBgDUan84LlnC77WPWRGCwAZ3VkjVTAPGTasdNvJSZqD8aHLl2xZ2cglC0lQI+K5tDw7f8tkptLD7Rk9270sOVm+ijyCVM8nNMZMoCDDwk4dPSIWkGiUAwgU8cPw1WQYyyHGMYpeijYBFX9DekXXGX1TGcc8LpoapXdAJ6bk2AF2JXAoGBAKOOT1P1iQ7cRvqvKma4ubCMWI2zp0wjlx7+qJ8fhJRe3sgAAiLpXss8mo7Sou77uGQkQRFQEhK+Diy2HDxamC2etFDYQKV7bIDdi2hbxHdOCA9EqPvYKVOhQu626P5T51z10QmOO5zrFBPy5c7IWgthBPsVSOyVIEkNT3m8wALj`,
};