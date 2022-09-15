import CryptoJS from 'crypto-js';
const secret = process.env.SECRET || 'wrong';

/**
 * Returns an HMAC SHA512 digest for given string
 * @param {string} input
 * @returns {string} digest
 */
export const digest = input => {
  console.log("🚀 ~ file: cryptography.js ~ line 11 ~ digest ~ input", input)
  return CryptoJS.HmacSHA512(input, secret).toString();
};

/**
 * Returns a JSON object from an AES encrypted string.
 * @param {string} cipher AES encrypted string
 * @returns {object} { email, passwordHash }
 */
export const decrypt = cipher => {
  const bytes = CryptoJS.AES.decrypt(cipher, secret);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decrypted);
};
