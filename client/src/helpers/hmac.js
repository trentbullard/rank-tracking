import CryptoJS from 'crypto-js';

export const digest = (method, path) => {
  let secret = process.env.SECRET || 'secret';
  let thisMinute = new Date().toISOString().slice(0, 16);
  return CryptoJS.HmacSHA256(`${thisMinute}${method}${path}`, secret).toString();
};
