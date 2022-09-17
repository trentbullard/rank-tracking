import _ from 'lodash';
import Sport from '../models/Sport.js';

export const get = async ({ query }, res, next) => {
  try {
    let sports = [];
    if (_.isEmpty(query)) {
      sports = await Sport.query();
    } else {
      sports = await Sport.query().where(query);
    };
    res.json(sports);
  } catch (err) {
    next(err);
  };
};

export const create = async (req, res, next) => {
  try {
    const sport = await Sport.query().insert(req.body);
    res.json(sport);
  } catch (err) {
    next(err);
  };
};

export const update = async (req, res, next) => {
  try {
    const sport = await Sport.query().patch(req.body).where(req.query);
    res.json(sport);
  } catch (err) {
    next(err);
  };
};

export const remove = async (req, res, next) => {
  try {
    const sport = await Sport.query().delete().where(req.query);
    res.json(sport);
  } catch (err) {
    next(err);
  };
};
