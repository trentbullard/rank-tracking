import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const authorization = req.headers.authorization || '';
  const [type, token] = authorization.split(' ');

  if (type !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'unauthorized: missing token' });
  };

  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    if (payload.token_type !== 'access') {
      return res.status(401).json({ error: 'unauthorized: invalid token type' });
    };
    req.auth = payload;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'unauthorized: invalid token' });
  };
};
