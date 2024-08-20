const crypto = require("crypto");

const algorithm = 'aes-256-cbc'; // AES encryption
const keyHex = "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
const ivHex = "abcdef1234567890abcdef1234567890";
const keyBuffer = Buffer.from(keyHex, "hex");
const ivBuffer = Buffer.from(ivHex, "hex");


// //Encrypting text
// function encrypt(text) {
//    let cipher = crypto.createCipheriv(algorithm, keyBuffer, ivBuffer);
//    let encrypted = cipher.update(text);
//    encrypted = Buffer.concat([encrypted, cipher.final()]);
//    return encrypted.toString('hex');
// }

// Decrypting text
function decrypt(ciphertext) {
  const decipher = crypto.createDecipheriv(algorithm, keyBuffer, ivBuffer);
  const encryptedBuffer = Buffer.from(ciphertext, "base64"); // Base64 to Buffer
  
  let decrypted = decipher.update(encryptedBuffer, "binary", "utf8");
  decrypted += decipher.final("utf8");
  
  return decrypted;
}
 
module.exports = {
  decrypt
}