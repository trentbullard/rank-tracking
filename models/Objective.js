import { Model } from 'objection';
import Sport from './Sport.js';
import Player from './Player.js';
import Log from './Log.js';
import Tag from './Tag.js';

class Objective extends Model {
  static get tableName() {
    return 'objectives';
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
      required: ['name', 'value', 'sport_id'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        value: { type: 'integer' },
        sport_id: { type: 'integer' },
      },
    };
  };

  static get relationMappings() {
    return {
      sport: {
        relation: Model.BelongsToOneRelation,
        modelClass: Sport,
        join: {
          from: 'objectives.sport_id',
          to: 'sports.id',
        },
      },
      players: {
        relation: Model.ManyToManyRelation,
        modelClass: Player,
        join: {
          from: 'objectives.id',
          through: {
            from: 'player_objectives.objective_id',
            to: 'player_objectives.player_id',
          },
          to: 'players.id',
        },
      },
      logs: {
        relation: Model.HasManyRelation,
        modelClass: Log,
        filter(builder) {
          builder.where('loggable_type', 'objectives');
        },
        beforeInsert(model) {
          model.loggable_type = 'objectives';
        },
        join: {
          from: 'objectives.id',
          to: 'logs.loggable_id',
        },
      },
      tags: {
        relation: Model.ManyToManyRelation,
        modelClass: Tag,
        filter(builder) {
          builder.where('taggable_type', 'objectives');
        },
        beforeInsert(model) {
          model.taggable_type = 'objectives';
        },
        join: {
          from: 'objectives.id',
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

export default Objective;
