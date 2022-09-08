import CryptoJS from 'crypto-js';

export default ({ method, _parsedUrl: { pathname }, headers: { authorization } }, res, next) => {
  const [type, token] = authorization.split(' ');
  const lcMethod = method.toLowerCase();
  const secret = process.env.SECRET || 'wrong';
  const thisMinute = new Date().toISOString().slice(0, 16);
  const thisMinuteString = thisMinute + lcMethod + pathname.toString();
  const thisMinuteHash = CryptoJS.HmacSHA512(thisMinuteString, secret).toString();
  const lastMinute = new Date(new Date() - 60000).toISOString().slice(0, 16);
  const lastMinuteString = lastMinute + lcMethod + pathname.toString();
  const lastMinuteHash = CryptoJS.HmacSHA512(lastMinuteString, secret).toString();
  if (type === 'Bearer' && (token === thisMinuteHash || token === lastMinuteHash)) {
    next();
  } else {
    res.status(401).json({ error: 'not authorized' });
  };
};