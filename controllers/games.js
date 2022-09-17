import _ from 'lodash';
import Game from '../models/Game.js';

export const get = async ({ query }, res, next) => {
  try {
    let games = {};
    if (_.isEmpty(query)) {
      games = await Game.query();
    } else {
      games = await Game.query().where(query);
    };
    res.json(games);
  } catch (err) {
    next(err);
  };
};

export const create = async (req, res, next) => {
  try {
    const game = await Game.query().insert(req.body);
    res.json(game);
  } catch (err) {
    next(err);
  };
};

export const update = async (req, res, next) => {
  try {
    const game = await Game.query().patch(req.body).where(req.query);
    res.json(game);
  } catch (err) {
    next(err);
  };
};

export const remove = async (req, res, next) => {
  try {
    const game = await Game.query().delete().where(req.query);
    res.json(game);
  } catch (err) {
    next(err);
  };
};
