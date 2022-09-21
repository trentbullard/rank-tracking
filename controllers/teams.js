import _ from 'lodash';
import Team from '../models/Team.js';

export const get = async ({ query }, res, next) => {
  try {
    let teams = {};
    if (_.isEmpty(query)) {
      teams = await Team.query();
    } else {
      teams = await Team.query().where(query);
    };
    res.json(teams);
  } catch (err) {
    next(err);
  };
};

export const create = async (req, res, next) => {
  try {
    const team = await Team.query().insert(req.body);
    res.json(team);
  } catch (err) {
    next(err);
  };
};

export const update = async (req, res, next) => {
  try {
    const team = await Team.query().patch(req.body).where(req.query);
    res.json(team);
  } catch (err) {
    next(err);
  };
};

export const remove = async (req, res, next) => {
  try {
    const team = await Team.query().delete().where(req.query);
    res.json(team);
  } catch (err) {
    next(err);
  };
};
