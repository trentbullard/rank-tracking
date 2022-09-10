import _ from 'lodash';
import User from '../models/User.js';
import Log from '../models/Log.js';
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

export const socialLogin = async (req, res, next) => {
  const data = req.body.params.data;
  try {
    const {email, first_name, last_name, username, session_id} = JSON.parse(decrypt(data));
    const user = await User.query().where({email}).first();
    if (!user) {
      const newUser = await User.query().insert({email, first_name, last_name, username, session_id});
      await Log.query().insert({user_id: newUser.id, action: 'create', level: 'info', loggable_type: 'users', loggable_id: newUser.id});
      delete user.password_hash;
      delete user.session_id;
      res.json(newUser);
    } else {
      await User.query().patch({session_id}).where({id: user.id});
      delete user.password_hash;
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
      res.status(401).json({error: 'incorrect session'});
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
