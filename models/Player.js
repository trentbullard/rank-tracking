import { Model } from 'objection';
import Team from './Team.js';
import Objective from './Objective.js';
import Standing from './Standing.js';
import Log from './Log.js';
import Tag from './Tag.js';

class Player extends Model {
  static get tableName() {
    return 'players';
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
      required: ['first_name', 'last_name', 'designator'],
      properties: {
        id: { type: 'integer' },
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        designator: { type: 'string', minLength: 1, maxLength: 255 },
        user_id: { type: 'integer' },
      },
    };
  };

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'players.user_id',
          to: 'users.id',
        },
      },
      teams: {
        relation: Model.ManyToManyRelation,
        modelClass: Team,
        join: {
          from: 'players.id',
          through: {
            from: 'team_players.player_id',
            to: 'team_players.team_id',
          },
          to: 'teams.id',
        },
      },
      objectives: {
        relation: Model.ManyToManyRelation,
        modelClass: Objective,
        join: {
          from: 'players.id',
          through: {
            from: 'player_objectives.player_id',
            to: 'player_objectives.objective_id',
          },
          to: 'objectives.id',
        },
      },
      standings: {
        relation: Model.HasManyRelation,
        modelClass: Standing,
        filter(builder) {
          builder.where('rankable_type', 'players');
        },
        beforeInsert(model) {
          model.rankable_type = 'players';
        },
        join: {
          from: 'players.id',
          to: 'standings.rankable_id',
        },
      },
      logs: {
        relation: Model.HasManyRelation,
        modelClass: Log,
        filter(builder) {
          builder.where('loggable_type', 'players');
        },
        beforeInsert(model) {
          model.loggable_type = 'players';
        },
        join: {
          from: 'players.id',
          to: 'logs.loggable_id',
        },
      },
      tags: {
        relation: Model.ManyToManyRelation,
        modelClass: Tag,
        filter(builder) {
          builder.where('taggable_type', 'players');
        },
        beforeInsert(model) {
          model.taggable_type = 'players';
        },
        join: {
          from: 'players.id',
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

export default Player;
