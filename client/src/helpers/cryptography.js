import CryptoJS from 'crypto-js';
const secret = process.env.REACT_APP_SECRET || 'wrong';

/**
 * Encrypts the given input using AES-256-CBC and returns an encrypted string.
 * @param {object} data any type that can be stringified
 * @returns {string} encrypted string
 */
export const encrypt = data => CryptoJS.AES.encrypt(JSON.stringify(data), secret).toString();

/**
 * Returns an HMAC SHA512 digest for given string
 * @param {string} input
 * @returns {string} digest
 */
export const timedDigest = input => {
  const thisMinute = new Date().toISOString().slice(0, 16);
  console.log("🚀 ~ file: cryptography.js ~ line 19 ~ timedDigest ~ thisMinute + input", thisMinute + input)
  return CryptoJS.HmacSHA512(thisMinute + input, secret).toString();
};

/**
 * Takes an input string and returns a SHA3 hash
 * @param {string} input 
 * @returns {string} hash
 */
export const hash = input => CryptoJS.SHA3(input).toString();
