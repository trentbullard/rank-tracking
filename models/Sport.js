import { Model } from 'objection';
import League from './League.js';
import Objective from './Objective.js';
import Log from './Log.js';
import Tag from './Tag.js';

class Sport extends Model {
  static get tableName() {
    return 'sports';
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
      leagues: {
        relation: Model.HasManyRelation,
        modelClass: League,
        join: {
          from: 'sports.id',
          to: 'leagues.sport_id',
        },
      },
      objectives: {
        relation: Model.HasManyRelation,
        modelClass: Objective,
        join: {
          from: 'sports.id',
          to: 'objectives.sport_id',
        },
      },
      logs: {
        relation: Model.HasManyRelation,
        modelClass: Log,
        filter(builder) {
          builder.where('loggable_type', 'sports');
        },
        beforeInsert(model) {
          model.loggable_type = 'sports';
        },
        join: {
          from: 'sports.id',
          to: 'logs.loggable_id',
        },
      },
      tags: {
        relation: Model.HasManyRelation,
        modelClass: Tag,
        filter(builder) {
          builder.where('taggable_type', 'sports');
        },
        beforeInsert(model) {
          model.taggable_type = 'sports';
        },
        join: {
          from: 'sports.id',
          to: 'tags.taggable_id',
        },
      },
    };
  };
};

export default Sport;
