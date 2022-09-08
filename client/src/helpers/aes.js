import CryptoJS from 'crypto-js';

export const encrypt = data => {
  let secret = process.env.SECRET || 'secret';
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secret).toString();
  return ciphertext;
};
