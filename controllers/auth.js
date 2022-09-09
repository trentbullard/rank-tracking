import _ from 'lodash';
import User from '../models/User.js';
import { decrypt } from '../helpers/cryptography.js';

export const getAuth = async (req, res, next) => {
  const data = req.query.data;
  try {
    const {email, passwordHash: password_hash} = JSON.parse(decrypt(data));
    const user = await User.query().where({email, password_hash}).first();
    delete user.password_hash;
    res.json(user);
  } catch (err) {
    next(err);
  };
};

export const getSession = async (req, res, next) => {
  res.json({ message: 'ok' });
};

export const createSession = async (req, res, next) => {
  res.json({ message: 'ok' });
};

export const removeSession = async (req, res, next) => {
  res.json({ message: 'ok' });
};
