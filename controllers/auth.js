import _ from 'lodash';
import User from '../models/User.js';
import { decrypt } from '../helpers/cryptography.js';

export const getAuth = async (req, res, next) => {
  const data = req.query.data;
  try {
    const {email, passwordHash: password_hash, sessionId: session_id, remember} = JSON.parse(decrypt(data));
    const user = await User.query().where({email, password_hash}).first();
    if (!user) {
      res.status(401).json({error: 'incorrect email or password'});
    } else {
      delete user.password_hash;
      remember && await User.query().patch({session_id}).where({id: user.id});
      delete user.session_id;
      res.json(user);
    };
  } catch (error) {
    next(error);
  };
};

export const getSession = async (req, res, next) => {
  const data = req.query.data;
  try {
    const session = decrypt(data);
    const user = await User.query().where({session_id: session}).first();
    if (!user) {
      res.json(null);
    } else {
      delete user.password_hash;
      delete user.session_id;
      res.json(user);
    };
  } catch (error) {
    next(error);
  };
};

export const createSession = async (req, res, next) => {
  res.json({ message: 'ok' });
};

export const removeSession = async (req, res, next) => {
  res.json({ message: 'ok' });
};
