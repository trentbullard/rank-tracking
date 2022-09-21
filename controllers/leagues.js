import _ from 'lodash';
import League from '../models/League.js';

export const get = async ({ query }, res, next) => {
  try {
    let leagues = [];
    if (_.isEmpty(query)) {
      leagues = await League.query()
        .select(
          'leagues.*',
          'users.first_name as owner_fname',
          'users.last_name as owner_lname',
          'sports.name as sport_name',
        )
        .join('users', 'leagues.owner_id', 'users.id')
        .join('sports', 'leagues.sport_id', 'sports.id')
    } else {
      leagues = await League.query()
        .select(
          'leagues.*',
          'users.first_name as owner_fname',
          'users.last_name as owner_lname',
          'sports.name as sport_name',
          'seasons.id as season_id',
          'seasons.name as season_name',
          'seasons.format as season_format',
          'seasons.status as season_status',
          'seasons.created_at as season_created_at',
        )
        .join('users', 'leagues.owner_id', 'users.id')
        .join('sports', 'leagues.sport_id', 'sports.id')
        .join('seasons', 'leagues.id', 'seasons.league_id')
        .where(query);
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
