import _ from 'lodash';
import League from '../models/League.js';

export const get = async ({ query }, res, next) => {
  try {
    let leagues = [];
    if (_.isEmpty(query)) {
      leagues = await League.query();
    } else {
      leagues = await League.query().where(query);
    };
    res.json(leagues);
  } catch (err) {
    next(err);
  };
};

export const create = async (req, res, next) => {
  try {
    const league = await League.query().insert(req.body);
    res.json(league);
  } catch (err) {
    next(err);
  };
};

export const update = async (req, res, next) => {
  try {
    const league = await League.query().patch(req.body).where(req.query);
    res.json(league);
  } catch (err) {
    next(err);
  };
};

export const remove = async (req, res, next) => {
  try {
    const league = await League.query().delete().where(req.query);
    res.json(league);
  } catch (err) {
    next(err);
  };
};
