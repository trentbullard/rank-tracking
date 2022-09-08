import { Model } from 'objection';
import League from './League.js';
import Season from './Season.js';
import Match from './Match.js';
import Set from './Set.js';
import Team from './Team.js';
import Standing from './Standing.js';
import Log from './Log.js';
import Tag from './Tag.js';

class Game extends Model {
  static get tableName() {
    return 'games';
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
      required: ['name', 'status'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        status: { type: 'string', minLength: 1, maxLength: 255 },
      },
    };
  };

  static get relationMappings() {
    return {
      league: {
        relation: Model.BelongsToOneRelation,
        modelClass: League,
        filter(builder) {
          builder.where('collection_type', 'leagues');
        },
        beforeInsert(model) {
          model.collection_type = 'leagues';
        },
        join: {
          from: 'games.collection_id',
          to: 'leagues.id',
        },
      },
      season: {
        relation: Model.BelongsToOneRelation,
        modelClass: Season,
        filter(builder) {
          builder.where('collection_type', 'seasons');
        },
        beforeInsert(model) {
          model.collection_type = 'seasons';
        },
        join: {
          from: 'games.collection_id',
          to: 'seasons.id',
        },
      },
      match: {
        relation: Model.BelongsToOneRelation,
        modelClass: Match,
        filter(builder) {
          builder.where('collection_type', 'matches');
        },
        beforeInsert(model) {
          model.collection_type = 'matches';
        },
        join: {
          from: 'games.collection_id',
          to: 'matches.id',
        },
      },
      set: {
        relation: Model.BelongsToOneRelation,
        modelClass: Set,
        filter(builder) {
          builder.where('collection_type', 'sets');
        },
        beforeInsert(model) {
          model.collection_type = 'sets';
        },
        join: {
          from: 'games.collection_id',
          to: 'sets.id',
        },
      },
      teams: {
        relation: Model.ManyToManyRelation,
        modelClass: Team,
        join: {
          from: 'games.id',
          through: {
            from: 'game_teams.game_id',
            to: 'game_teams.team_id',
          },
          to: 'teams.id',
        },
      },
      standings: {
        relation: Model.HasManyRelation,
        modelClass: Standing,
        filter(builder) {
          builder.where('contest_type', 'games');
        },
        beforeInsert(model) {
          model.contest_type = 'games';
        },
        join: {
          from: 'games.id',
          to: 'standings.contest_id',
        },
      },
      logs: {
        relation: Model.HasManyRelation,
        modelClass: Log,
        filter(builder) {
          builder.where('loggable_type', 'games');
        },
        beforeInsert(model) {
          model.loggable_type = 'games';
        },
        join: {
          from: 'games.id',
          to: 'logs.loggable_id',
        },
      },
      tags: {
        relation: Model.ManyToManyRelation,
        modelClass: Tag,
        filter(builder) {
          builder.where('taggable_type', 'games');
        },
        beforeInsert(model) {
          model.taggable_type = 'games';
        },
        join: {
          from: 'games.id',
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

export default Game;
