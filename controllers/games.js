import _ from 'lodash';
import { raw } from 'objection';
import Game from '../models/Game.js';

export const get = async ({ query }, res, next) => {
  try {
    let games = {};
    if (_.isEmpty(query)) {
      games = await Game.query();
    } else if (query.user_id) {
      games = await Game.query()
        .select(
          'g.id as game_id',
          'g.name as game_name',
          'g.status as game_status',
          'g.updated_at as updated_at',
          'g.collection_type as game_collection_type',
          'g.collection_id as game_collection_id',
          'sp.name as sport_name',
          'l.id as league_id',
          'l.name as league_name',
          'l.format as league_format',
          'league_owners.first_name as league_owner_fname',
          'league_owners.last_name as league_owner_lname',
          'sn.id as season_id',
          'sn.name as season_name',
          'sn.format as season_format',
          'sn.status as season_status',
          'season_leagues.name as season_league_name',
          'm.id as match_id',
          'm.name as match_name',
          'm.status as match_status',
          'match_leagues.name as match_league_name',
          'match_seasons.name as match_season_name',
          'st.id as set_id',
          'st.name as set_name',
          'st.status as set_status',
          'set_leagues.name as set_league_name',
          'set_seasons.name as set_season_name',
          'set_matches.name as set_match_name',
        )
        .from({g: 'games'})
        .innerJoin({gt: 'game_teams'}, 'gt.game_id', 'g.id')
        .innerJoin({t: 'teams'}, 't.id', 'gt.team_id')
        .innerJoin({tp: 'team_players'}, 'tp.team_id', 't.id')
        .innerJoin({p: 'players'}, 'p.id', 'tp.player_id')
        .innerJoin({u: 'users'}, 'u.id', 'p.user_id')
        .leftJoin({l: 'leagues'}, function() {this.on('l.id', 'g.collection_id').andOn('g.collection_type', raw('?', ['league']))})
        .leftJoin({sp: 'sports'}, 'sp.id', 'l.sport_id')
        .leftJoin({league_owners: 'users'}, 'league_owners.id', 'l.owner_id')
        .leftJoin({sn: 'seasons'}, function() {this.on('sn.id', 'g.collection_id').andOn('g.collection_type', raw('?', ['season']))})
        .leftJoin({season_leagues: 'leagues'}, 'season_leagues.id', 'sn.league_id')
        .leftJoin({m: 'matches'}, function() {this.on('m.id', 'g.collection_id').andOn('g.collection_type', raw('?', ['match']))})
        .leftJoin({match_leagues: 'leagues'}, function() {this.on('match_leagues.id', 'm.collection_id').andOn('m.collection_type', raw('?', ['league']))})
        .leftJoin({match_seasons: 'seasons'}, function() {this.on('match_seasons.id', 'm.collection_id').andOn('m.collection_type', raw('?', ['season']))})
        .leftJoin({st: 'sets'}, function() {this.on('st.id', 'g.collection_id').andOn('g.collection_type', raw('?', ['set']))})
        .leftJoin({set_leagues: 'leagues'}, function() {this.on('set_leagues.id', 'st.collection_id').andOn('st.collection_type', raw('?', ['league']))})
        .leftJoin({set_seasons: 'seasons'}, function() {this.on('set_seasons.id', 'st.collection_id').andOn('st.collection_type', raw('?', ['season']))})
        .leftJoin({set_matches: 'matches'}, function() {this.on('set_matches.id', 'st.collection_id').andOn('st.collection_type', raw('?', ['match']))})
        .where('u.id', query.user_id);
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
