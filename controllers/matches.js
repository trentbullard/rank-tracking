import _ from 'lodash';
import Match from '../models/Match.js';

export const get = async ({ query }, res, next) => {
  try {
    let matches = [];
    if (_.isEmpty(query)) {
      matches = await Match.query();
    } else {
      matches = await Match.query().where(query);
    };
    res.json(matches);
  } catch (err) {
    next(err);
  };
};

export const create = async (req, res, next) => {
  try {
    const match = await Match.query().insert(req.body);
    res.json(match);
  } catch (err) {
    next(err);
  };
};

export const update = async (req, res, next) => {
  try {
    const match = await Match.query().patch(req.body).where(req.query);
    res.json(match);
  } catch (err) {
    next(err);
  };
};

export const remove = async (req, res, next) => {
  try {
    const match = await Match.query().delete().where(req.query);
    res.json(match);
  } catch (err) {
    next(err);
  };
};
