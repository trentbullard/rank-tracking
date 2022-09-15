import { digest } from '../helpers/cryptography.js';
import { getThisAndLastMinute } from '../helpers/chronography.js';

export default ({ method, _parsedUrl: { pathname }, headers: { authorization='' } }, res, next) => {
  const [type, token] = authorization.split(' ');
  const [thisMinute, lastMinute] = getThisAndLastMinute();
  const thisMinuteHash = digest(thisMinute + method + pathname);
  console.log("🚀 ~ file: auth.js ~ line 8 ~ thisMinute + method + pathname", thisMinute + method + pathname)
  const lastMinuteHash = digest(lastMinute + method + pathname);
  console.log("🚀 ~ file: auth.js ~ line 10 ~ lastMinute + method + pathname", lastMinute + method + pathname)
  if (type === 'Bearer' && (token === thisMinuteHash || token === lastMinuteHash)) {
    next();
  } else {
    return res.status(401).json({ error: 'unauthorized: bad token' });
  };
};
