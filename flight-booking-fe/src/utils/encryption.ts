import CryptoJS from "crypto-js";

const keyHex = "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
const ivHex = "abcdef1234567890abcdef1234567890";

// Convert hex to WordArray
const hexToWordArray = (hex: string): CryptoJS.lib.WordArray => {
  return CryptoJS.enc.Hex.parse(hex);
};

const key = hexToWordArray(keyHex);
const iv = hexToWordArray(ivHex);

// Encrypting text
export const encrypt = (text: string): string => {
  const encrypted = CryptoJS.AES.encrypt(text, key, { iv });
  return encrypted.toString(); // Base64 encoded string
};

// Decrypting text
export const decrypt = (ciphertext: string): string => {
  const decrypted = CryptoJS.AES.decrypt(ciphertext, key, { iv : iv });
  return decrypted.toString(CryptoJS.enc.Utf8); // Returns the plaintext
};