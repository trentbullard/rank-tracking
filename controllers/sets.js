import _ from 'lodash';
import Set from '../models/Set.js';

export const get = async ({ query }, res, next) => {
  try {
    let sets = [];
    if (_.isEmpty(query)) {
      sets = await Set.query();
    } else {
      sets = await Set.query().where(query);
    };
    res.json(sets);
  } catch (err) {
    next(err);
  };
};

export const create = async (req, res, next) => {
  try {
    const set = await Set.query().insert(req.body);
    res.json(set);
  } catch (err) {
    next(err);
  };
};

export const update = async (req, res, next) => {
  try {
    const set = await Set.query().patch(req.body).where(req.query);
    res.json(set);
  } catch (err) {
    next(err);
  };
};

export const remove = async (req, res, next) => {
  try {
    const set = await Set.query().delete().where(req.query);
    res.json(set);
  } catch (err) {
    next(err);
  };
};
