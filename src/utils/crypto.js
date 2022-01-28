import CryptoJS from 'crypto-js';

const encryptText = (text) => 
    CryptoJS.AES.encrypt(text, 'secretKey').toString();

const decryptText = (text) => 
    CryptoJS.AES.decrypt(text, 'secretKey').toString(CryptoJS.enc.Utf8)

export {
    encryptText,
    decryptText
}