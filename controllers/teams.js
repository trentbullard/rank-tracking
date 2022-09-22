import _ from 'lodash';
import { raw } from 'objection';
import Team from '../models/Team.js';

export const get = async ({ query }, res, next) => {
  try {
    let teams = {};
    if (_.isEmpty(query)) {
      teams = await Team.query();
    } else if (query.user_id) {
      teams = await Team.query()
        .select(
          't.id as team_id',
          't.name as team_name',
          'tp.created_at as joined_at',
          'pos.name as position_name',
          't_standings.points as points',
          't_standings.rank as rank',
          't_standing_leagues.name as league_name',
          't_standing_seasons.name as season_name',
        )
        .from({t: 'teams'})
        .innerJoin({tp: 'team_players'}, 'tp.team_id', 't.id')
        .innerJoin({p: 'players'}, 'p.id', 'tp.player_id')
        .innerJoin({u: 'users'}, 'u.id', 'p.user_id')
        .leftJoin({pos: 'positions'}, 'pos.id', 'tp.position_id')
        .leftJoin({t_standings: 'standings'}, function() {this.on('t_standings.rankable_id', 't.id').andOn('t_standings.rankable_type', raw('?', ['team']))})
        .leftJoin({t_standing_leagues: 'leagues'}, function() {this.on('t_standing_leagues.id', 't_standings.contest_id').andOn('t_standings.contest_type', raw('?', ['league']))})
        .leftJoin({t_standing_seasons: 'seasons'}, function() {this.on('t_standing_seasons.id', 't_standings.contest_id').andOn('t_standings.contest_type', raw('?', ['season']))})
        .leftJoin({p_standings: 'standings'}, function() {this.on('p_standings.rankable_id', 'p.id').andOn('p_standings.rankable_type', raw('?', ['player']))})
        .leftJoin({p_standing_leagues: 'leagues'}, function() {this.on('p_standing_leagues.id', 'p_standings.contest_id').andOn('p_standings.contest_type', raw('?', ['league']))})
        .leftJoin({p_standing_seasons: 'seasons'}, function() {this.on('p_standing_seasons.id', 'p_standings.contest_id').andOn('p_standings.contest_type', raw('?', ['season']))})
        .where('u.id', query.user_id);
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
