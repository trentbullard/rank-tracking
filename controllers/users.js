import _ from 'lodash';
import User from '../models/User.js';

export const get = async ({ query }, res, next) => {
  try {
    let users = {};
    if (_.isEmpty(query)) {
      users = await User.query();
    } else {
      users = await User.query().where(query);
    };
    res.json(users);
  } catch (err) {
    next(err);
  };
};

export const create = async (req, res, next) => {
  try {
    const user = await User.query().insert(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  };
};

export const update = async (req, res, next) => {
  try {
    const user = await User.query().patch(req.body).where(req.query);
    res.json(user);
  } catch (err) {
    next(err);
  };
};

export const remove = async (req, res, next) => {
  try {
    const user = await User.query().delete().where(req.query);
    res.json(user);
  } catch (err) {
    next(err);
  };
};
