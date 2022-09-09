import CryptoJS from 'crypto-js';
const secret = process.env.SECRET || 'wrong';

export const encrypt = data => {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secret).toString();
  return ciphertext;
};

/**
 * Returns an HMAC SHA512 digest for given string
 * @param {string} input
 * @returns {string} digest
 */
export const digest = input => {
  const thisMinute = new Date().toISOString().slice(0, 16);
  return CryptoJS.HmacSHA512(thisMinute + input, secret).toString();
};

export const hash = password => {
  return CryptoJS.SHA3(password).toString();
};
