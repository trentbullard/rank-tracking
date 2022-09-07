import { Model } from 'objection';

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
      required: ['first_name', 'last_name'],
      properties: {
        id: { type: 'integer' },
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        designator: { type: 'string' },
        user_id: { type: 'integer' },
      }
    };
  };

  static get relationMappings() {
    const User = require('./User').default;
    const Team = require('./Team').default;
    const Standing = require('./Standing').default;
    const Objective = require('./Objective').default;

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
      standings: {
        relation: Model.HasManyRelation,
        modelClass: Standing,
        join: {
          from: 'players.id',
          to: 'standings.player_id',
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
    };
  };
};

export default Player;
