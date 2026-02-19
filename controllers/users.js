import _ from 'lodash';
import User from '../models/User.js';

const safeFields = [
  'id',
  'email',
  'username',
  'first_name',
  'last_name',
  'is_admin',
  'created_at',
  'updated_at',
];

export const get = async ({ query }, res, next) => {
  try {
    let users = {};
    if (_.isEmpty(query)) {
      users = await User.query().select(safeFields);
    } else {
      users = await User.query().select(safeFields).where(query);
    };
    res.json(users);
  } catch (err) {
    next(err);
  };
};

export const create = async (req, res, next) => {
  try {
    const user = await User.query().insert(req.body);
    const safeUser = _.pick(user, safeFields);
    res.json(safeUser);
  } catch (err) {
    next(err);
  };
};

export const update = async (req, res, next) => {
  try {
    const user = await User.query().patch(req.body).where({ id: req.params.id });
    res.json(user);
  } catch (err) {
    next(err);
  };
};

export const remove = async (req, res, next) => {
  try {
    const user = await User.query().delete().where({ id: req.params.id });
    res.json(user);
  } catch (err) {
    next(err);
  };
};
