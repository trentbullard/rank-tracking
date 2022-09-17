import { Model } from 'objection';
import User from './User.js';
import Sport from './Sport.js';
import Season from './Season.js';
import Match from './Match.js';
import Set from './Set.js';
import Game from './Game.js';
import Standing from './Standing.js';
import Log from './Log.js';
import Tag from './Tag.js';

class League extends Model {
  static get tableName() {
    return 'leagues';
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
        format: { type: 'string' },
        status: { type: 'string' },
        owner_id: { type: 'integer' },
        sport_id: { type: 'integer' },
      },
    };
  };

  static get relationMappings() {
    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'leagues.owner_id',
          to: 'users.id',
        },
      },
      sport: {
        relation: Model.BelongsToOneRelation,
        modelClass: Sport,
        join: {
          from: 'leagues.sport_id',
          to: 'sports.id',
        },
      },
      seasons: {
        relation: Model.HasManyRelation,
        modelClass: Season,
        join: {
          from: 'leagues.id',
          to: 'seasons.league_id',
        },
      },
      matches: {
        relation: Model.HasManyRelation,
        modelClass: Match,
        filter(builder) {
          builder.where('collection_type', 'league');
        },
        beforeInsert(model) {
          model.collection_type = 'league';
        },
        join: {
          from: 'leagues.id',
          to: 'matches.collection_id',
        },
      },
      sets: {
        relation: Model.HasManyRelation,
        modelClass: Set,
        filter(builder) {
          builder.where('collection_type', 'league');
        },
        beforeInsert(model) {
          model.collection_type = 'league';
        },
        join: {
          from: 'leagues.id',
          to: 'sets.collection_id',
        },
      },
      games: {
        relation: Model.HasManyRelation,
        modelClass: Game,
        filter(builder) {
          builder.where('collection_type', 'league');
        },
        beforeInsert(model) {
          model.collection_type = 'league';
        },
        join: {
          from: 'leagues.id',
          to: 'games.collection_id',
        },
      },
      standings: {
        relation: Model.HasManyRelation,
        modelClass: Standing,
        filter(builder) {
          builder.where('contest_type', 'leagues');
        },
        beforeInsert(model) {
          model.contest_type = 'leagues';
        },
        join: {
          from: 'leagues.id',
          to: 'standings.contest_id',
        },
      },
      logs: {
        relation: Model.HasManyRelation,
        modelClass: Log,
        filter(builder) {
          builder.where('loggable_type', 'leagues');
        },
        beforeInsert(model) {
          model.loggable_type = 'leagues';
        },
        join: {
          from: 'leagues.id',
          to: 'logs.loggable_id',
        },
      },
      tags: {
        relation: Model.HasManyRelation,
        modelClass: Tag,
        filter(builder) {
          builder.where('taggable_type', 'leagues');
        },
        beforeInsert(model) {
          model.taggable_type = 'leagues';
        },
        join: {
          from: 'leagues.id',
          to: 'tags.taggable_id',
        },
      },
    };
  };
};

export default League;
