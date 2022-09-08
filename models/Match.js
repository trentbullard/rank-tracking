import { Model } from 'objection';
import League from './League.js';
import Season from './Season.js';
import Set from './Set.js';
import Game from './Game.js';
import Standing from './Standing.js';
import Log from './Log.js';
import Tag from './Tag.js';

class Match extends Model {
  static get tableName() {
    return 'matches';
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
          from: 'matches.collection_id',
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
          from: 'matches.collection_id',
          to: 'seasons.id',
        },
      },
      sets: {
        relation: Model.HasManyRelation,
        modelClass: Set,
        filter(builder) {
          builder.where('collection_type', 'matches');
        },
        beforeInsert(model) {
          model.collection_type = 'matches';
        },
        join: {
          from: 'matches.id',
          to: 'sets.collection_id',
        },
      },
      games: {
        relation: Model.HasManyRelation,
        modelClass: Game,
        filter(builder) {
          builder.where('collection_type', 'matches');
        },
        beforeInsert(model) {
          model.collection_type = 'matches';
        },
        join: {
          from: 'matches.id',
          to: 'games.collection_id',
        },
      },
      standings: {
        relation: Model.HasManyRelation,
        modelClass: Standing,
        filter(builder) {
          builder.where('contest_type', 'matches');
        },
        beforeInsert(model) {
          model.contest_type = 'matches';
        },
        join: {
          from: 'matches.id',
          to: 'standings.contest_id',
        },
      },
      logs: {
        relation: Model.HasManyRelation,
        modelClass: Log,
        filter(builder) {
          builder.where('loggable_type', 'matches');
        },
        beforeInsert(model) {
          model.loggable_type = 'matches';
        },
        join: {
          from: 'matches.id',
          to: 'logs.loggable_id',
        },
      },
      tags: {
        relation: Model.ManyToManyRelation,
        modelClass: Tag,
        filter(builder) {
          builder.where('taggable_type', 'matches');
        },
        beforeInsert(model) {
          model.taggable_type = 'matches';
        },
        join: {
          from: 'matches.id',
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

export default Match;
