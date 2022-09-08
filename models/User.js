import { Model } from 'objection';
import Player from './Player.js';
import League from './League.js';
import Log from './Log.js';

class User extends Model {
  static get tableName() {
    return 'users';
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
      required: ['email', 'password_hash'],
      properties: {
        id: { type: 'integer' },
        email: { type: 'string', minLength: 1, maxLength: 255 },
        password_hash: { type: 'string' },
        username: { type: 'string', minLength: 1, maxLength: 255 },
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        is_admin: { type: 'boolean' },
        session_id: { type: 'string' },
      },
    };
  };

  static get relationMappings() {
    return {
      players: {
        relation: Model.HasManyRelation,
        modelClass: Player,
        join: {
          from: 'users.id',
          to: 'players.user_id',
        },
      },
      leagues: {
        relation: Model.HasManyRelation,
        modelClass: League,
        join: {
          from: 'users.id',
          to: 'leagues.owner_id',
        },
      },
      logs: {
        relation: Model.HasManyRelation,
        modelClass: Log,
        filter(builder) {
          builder.where('loggable_type', 'users');
        },
        beforeInsert(model) {
          model.loggable_type = 'users';
        },
        join: {
          from: 'users.id',
          to: 'logs.loggable_id',
        },
      },
    };
  };
};

export default User;
