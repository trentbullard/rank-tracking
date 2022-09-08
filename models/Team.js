import { Model } from 'objection';
import Game from './Game.js';
import Player from './Player.js';
import Standing from './Standing.js';
import Log from './Log.js';
import Tag from './Tag.js';

class Team extends Model {
  static get tableName() {
    return 'teams';
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
          from: 'teams.id',
          through: {
            from: 'team_players.team_id',
            to: 'team_players.player_id',
          },
          to: 'players.id',
        },
      },
      games: {
        relation: Model.ManyToManyRelation,
        modelClass: Game,
        join: {
          from: 'teams.id',
          through: {
            from: 'game_teams.team_id',
            to: 'game_teams.game_id',
          },
          to: 'games.id',
        },
      },
      standings: {
        relation: Model.HasManyRelation,
        modelClass: Standing,
        filter(builder) {
          builder.where('rankable_type', 'teams');
        },
        beforeInsert(model) {
          model.rankable_type = 'teams';
        },
        join: {
          from: 'teams.id',
          to: 'standings.rankable_id',
        },
      },
      logs: {
        relation: Model.HasManyRelation,
        modelClass: Log,
        filter(builder) {
          builder.where('loggable_type', 'teams');
        },
        beforeInsert(model) {
          model.loggable_type = 'teams';
        },
        join: {
          from: 'teams.id',
          to: 'logs.loggable_id',
        },
      },
      tags: {
        relation: Model.ManyToManyRelation,
        modelClass: Tag,
        filter(builder) {
          builder.where('taggable_type', 'teams');
        },
        beforeInsert(model) {
          model.taggable_type = 'teams';
        },
        join: {
          from: 'teams.id',
          through: {
            from: 'taggable_tags.taggable_id',
            to: 'taggable_tags.tag_id',
          },
          to: 'tags.id',
        },
      },
    };
  }
};

export default Team;
