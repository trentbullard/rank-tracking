import _ from 'lodash';
import Season from '../models/Season.js';

export const get = async ({ query }, res, next) => {
  try {
    let seasons = [];
    if (_.isEmpty(query)) {
      seasons = await Season.query();
    } else {
      seasons = await Season.query().where(query);
    };
    res.json(seasons);
  } catch (err) {
    next(err);
  };
};

export const create = async (req, res, next) => {
  try {
    const season = await Season.query().insert(req.body);
    res.json(season);
  } catch (err) {
    next(err);
  };
};

export const update = async (req, res, next) => {
  try {
    const season = await Season.query().patch(req.body).where(req.query);
    res.json(season);
  } catch (err) {
    next(err);
  };
};

export const remove = async (req, res, next) => {
  try {
    const season = await Season.query().delete().where(req.query);
    res.json(season);
  } catch (err) {
    next(err);
  };
};
