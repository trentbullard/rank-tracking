import { Model } from 'objection';
import Player from './Player.js';
import Log from './Log.js';
import Tag from './Tag.js';

class Position extends Model {
  static get tableName() {
    return 'positions';
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
      required: ['name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
      },
    };
  };

  static get relationMappings() {
    return {
      players: {
        relation: Model.ManyToManyRelation,
        modelClass: Player,
        join: {
          from: 'positions.id',
          through: {
            from: 'team_players.position_id',
            to: 'team_players.player_id',
          },
          to: 'players.id',
        },
      },
      logs: {
        relation: Model.HasManyRelation,
        modelClass: Log,
        filter(builder) {
          builder.where('loggable_type', 'positions');
        },
        beforeInsert(model) {
          model.loggable_type = 'positions';
        },
        join: {
          from: 'positions.id',
          to: 'logs.loggable_id',
        },
      },
      tags: {
        relation: Model.ManyToManyRelation,
        modelClass: Tag,
        join: {
          from: 'positions.id',
          through: {
            from: 'position_tags.position_id',
            to: 'position_tags.tag_id',
          },
          to: 'tags.id',
        },
      },
    };
  };
};

export default Position;
