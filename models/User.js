import { Model } from 'objection';

export default class User extends Model {
  static get tableName() {
    return 'users';
  };

  static get idColumn() {
    return 'id';
  };

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password_hash'],
      properties: {
        id: { type: 'integer' },
        email: { type: 'string' },
        password_hash: { type: 'string' },
        username: { type: 'string' },
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        is_admin: { type: 'boolean' },
        session_id: { type: 'string' },
        deleted_at: { type: 'timestamp' },
        created_at: { type: 'timestamp' },
        updated_at: { type: 'timestamp' },
      }
    };
  };

  static get relationMappings() {
    const Player = require('./Player').default;
    const League = require('./League').default;

    return {
      players: {
        relation: Model.HasManyRelation,
        modelClass: Player,
        join: {
          from: 'users.id',
          to: 'players.user_id'
        }
      },
      leagues: {
        relation: Model.HasManyRelation,
        modelClass: League,
        join: {
          from: 'users.id',
          to: 'leagues.owner_id'
        }
      },
    };
  };
};
