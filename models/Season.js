import { Model } from 'objection';
import League from './League.js';
import Match from './Match.js';
import Set from './Set.js';
import Game from './Game.js';
import Team from './Team.js';
import Standing from './Standing.js';
import Log from './Log.js';
import Tag from './Tag.js';

class Season extends Model {
  static get tableName() {
    return 'seasons';
  };

  $beforeInsert() {
    const ts = new Date().toISOString();
    this.created_at = ts;
    this.updated_at = ts;
  };

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  };

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'format', 'status'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        status: { type: 'string', minLength: 1, maxLength: 255 },
        league_id: { type: 'integer' },
      },
    };
  };

  static get relationMappings() {
    return {
      league: {
        relation: Model.BelongsToOneRelation,
        modelClass: League,
        join: {
          from: 'seasons.league_id',
          to: 'leagues.id',
        },
      },
      matches: {
        relation: Model.HasManyRelation,
        modelClass: Match,
        filter(builder) {
          builder.where('collection_type', 'seasons');
        },
        beforeInsert(model) {
          model.collection_type = 'seasons';
        },
        join: {
          from: 'seasons.id',
          to: 'matches.collection_id',
        },
      },
      sets: {
        relation: Model.HasManyRelation,
        modelClass: Set,
        filter(builder) {
          builder.where('collection_type', 'seasons');
        },
        beforeInsert(model) {
          model.collection_type = 'seasons';
        },
        join: {
          from: 'seasons.id',
          to: 'sets.collection_id',
        },
      },
      games: {
        relation: Model.HasManyRelation,
        modelClass: Game,
        filter(builder) {
          builder.where('collection_type', 'seasons');
        },
        beforeInsert(model) {
          model.collection_type = 'seasons';
        },
        join: {
          from: 'seasons.id',
          to: 'games.collection_id',
        },
      },
      teams: {
        relation: Model.HasManyRelation,
        modelClass: Team,
        join: {
          from: 'seasons.id',
          to: 'teams.season_id',
        },
      },
      standings: {
        relation: Model.HasManyRelation,
        modelClass: Standing,
        filter(builder) {
          builder.where('contest_type', 'seasons');
        },
        beforeInsert(model) {
          model.contest_type = 'seasons';
        },
        join: {
          from: 'seasons.id',
          to: 'standings.contest_id',
        },
      },
      logs: {
        relation: Model.HasManyRelation,
        modelClass: Log,
        filter(builder) {
          builder.where('loggable_type', 'seasons');
        },
        beforeInsert(model) {
          model.loggable_type = 'seasons';
        },
        join: {
          from: 'seasons.id',
          to: 'logs.loggable_id',
        },
      },
      tags: {
        relation: Model.ManyToManyRelation,
        modelClass: Tag,
        filter(builder) {
          builder.where('taggable_type', 'seasons');
        },
        beforeInsert(model) {
          model.taggable_type = 'seasons';
        },
        join: {
          from: 'seasons.id',
          through: {
            from: 'taggable_tags.taggable_id',
            to: 'taggable_tags.tag_id',
          },
          to: 'tags.id',
        },
      },
    };
  };
};

export default Season;
