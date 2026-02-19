import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js';
import Log from '../models/Log.js';

const accessTtl = process.env.JWT_ACCESS_TTL || '15m';
const refreshTtl = process.env.JWT_REFRESH_TTL || '7d';
const refreshCookieName = process.env.JWT_REFRESH_COOKIE || 'refresh_token';
const refreshCookieMaxAgeMs = Number(process.env.JWT_REFRESH_COOKIE_MAX_AGE_MS || 1000 * 60 * 60 * 24 * 7);
const googleClientIds = (process.env.GOOGLE_CLIENT_ID || '')
  .split(',')
  .map((id) => id.trim())
  .filter(Boolean);
const googleClient = new OAuth2Client();

const optionalString = (value) => {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
};

const toPublicUser = (user) => {
  if (!user) return null;
  const publicUser = { ...user };
  delete publicUser.password_hash;
  delete publicUser.session_id;
  return publicUser;
};

const signAccessToken = (userId) => (
  jwt.sign(
    { sub: userId, token_type: 'access' },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: accessTtl },
  )
);

const signRefreshToken = (userId, sessionId) => (
  jwt.sign(
    { sub: userId, sid: sessionId, token_type: 'refresh' },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: refreshTtl },
  )
);

const setRefreshCookie = (res, refreshToken, persistSession = true) => {
  const secureCookie = process.env.NODE_ENV === 'production';
  const cookieOptions = {
    httpOnly: true,
    secure: secureCookie,
    sameSite: 'lax',
    path: '/api/auth',
  };
  if (persistSession) {
    cookieOptions.maxAge = refreshCookieMaxAgeMs;
  };

  res.cookie(refreshCookieName, refreshToken, cookieOptions);
};

const clearRefreshCookie = (res) => {
  const secureCookie = process.env.NODE_ENV === 'production';
  res.clearCookie(refreshCookieName, {
    httpOnly: true,
    secure: secureCookie,
    sameSite: 'lax',
    path: '/api/auth',
  });
};

const issueAuth = async (user, res, persistSession = true) => {
  const sessionId = randomUUID();
  await User.query().patch({ session_id: sessionId }).where({ id: user.id });
  const accessToken = signAccessToken(user.id);
  const refreshToken = signRefreshToken(user.id, sessionId);
  setRefreshCookie(res, refreshToken, persistSession);
  return accessToken;
};

export const signup = async (req, res, next) => {
  const {
    email = '',
    password = '',
    username,
    first_name,
    last_name,
  } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' });
  };

  try {
    const existing = await User.query().where({ email }).first();
    if (existing) {
      return res.status(409).json({ error: 'email already in use' });
    };

    const password_hash = await bcrypt.hash(password, 12);
    const userInput = {
      email,
      password_hash,
      username: optionalString(username),
      first_name: optionalString(first_name),
      last_name: optionalString(last_name),
    };
    const newUser = await User.query().insert(userInput);

    await Log.query().insert({
      user_id: newUser.id,
      action: 'create',
      level: 'info',
      message: 'signup',
      loggable_type: 'users',
      loggable_id: newUser.id,
    });

    const accessToken = await issueAuth(newUser, res);
    return res.status(201).json({
      user: toPublicUser(newUser),
      accessToken,
    });
  } catch (error) {
    return next(error);
  };
};

export const login = async (req, res, next) => {
  const { email = '', password = '', remember = true } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' });
  };

  try {
    const user = await User.query().where({ email }).first();
    if (!user || !user.password_hash) {
      return res.status(401).json({ error: 'incorrect email or password' });
    };

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'incorrect email or password' });
    };

    const accessToken = await issueAuth(user, res, Boolean(remember));
    return res.json({
      user: toPublicUser(user),
      accessToken,
    });
  } catch (error) {
    return next(error);
  };
};

export const refresh = async (req, res, next) => {
  const refreshToken = req.cookies?.[refreshCookieName];
  if (!refreshToken) {
    return res.status(401).json({ error: 'missing refresh token' });
  };

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    if (payload.token_type !== 'refresh') {
      return res.status(401).json({ error: 'invalid refresh token' });
    };

    const user = await User.query().findById(payload.sub);
    if (!user || !user.session_id || user.session_id !== payload.sid) {
      clearRefreshCookie(res);
      return res.status(401).json({ error: 'invalid refresh token' });
    };

    const accessToken = await issueAuth(user, res);
    return res.json({
      user: toPublicUser(user),
      accessToken,
    });
  } catch (error) {
    clearRefreshCookie(res);
    return res.status(401).json({ error: 'invalid refresh token' });
  };
};

export const logout = async (req, res, next) => {
  const refreshToken = req.cookies?.[refreshCookieName];
  clearRefreshCookie(res);

  if (!refreshToken) {
    return res.json({ message: 'ok' });
  };

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    if (payload?.sub) {
      await User.query().patch({ session_id: null }).where({ id: payload.sub });
    };
    return res.json({ message: 'ok' });
  } catch (error) {
    return res.json({ message: 'ok' });
  };
};

export const me = async (req, res, next) => {
  try {
    const user = await User.query().findById(req.auth.sub);
    if (!user) {
      return res.status(401).json({ error: 'unauthorized' });
    };
    return res.json(toPublicUser(user));
  } catch (error) {
    return next(error);
  };
};

export const googleOauth = async (req, res, next) => {
  const { credential = '', remember = true } = req.body || {};
  if (!credential) {
    return res.status(400).json({ error: 'missing google credential' });
  };
  if (!googleClientIds.length) {
    return res.status(500).json({ error: 'google auth is not configured' });
  };

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: googleClientIds.length === 1 ? googleClientIds[0] : googleClientIds,
    });
    const payload = ticket.getPayload();

    if (!payload?.email || payload.email_verified !== true) {
      return res.status(401).json({ error: 'invalid google account' });
    };

    const email = payload.email.toLowerCase();
    let user = await User.query().where({ email }).first();

    if (!user) {
      const payloadUsername = optionalString(payload.name)
        || optionalString(payload.email?.split('@')?.[0])
        || `user-${randomUUID().slice(0, 8)}`;
      user = await User.query().insert({
        email,
        first_name: optionalString(payload.given_name),
        last_name: optionalString(payload.family_name),
        username: payloadUsername,
        avatar_url: optionalString(payload.picture),
      });
      await Log.query().insert({
        user_id: user.id,
        action: 'create',
        level: 'info',
        message: 'signup_google',
        loggable_type: 'users',
        loggable_id: user.id,
      });
    } else {
      const patchData = {};
      const payloadFname = optionalString(payload.given_name);
      const payloadLname = optionalString(payload.family_name);
      const payloadAvatar = optionalString(payload.picture);
      if (!optionalString(user.first_name) && payloadFname) patchData.first_name = payloadFname;
      if (!optionalString(user.last_name) && payloadLname) patchData.last_name = payloadLname;
      if (payloadAvatar) patchData.avatar_url = payloadAvatar;

      if (Object.keys(patchData).length) {
        await User.query().patch(patchData).where({ id: user.id });
      };
    };

    const accessToken = await issueAuth(user, res, Boolean(remember));
    return res.json({
      user: toPublicUser(user),
      accessToken,
    });
  } catch (error) {
    console.error('Google OAuth error:', error);
    return res.status(401).json({ error: 'google authentication failed' });
  };
};
