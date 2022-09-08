import { Model } from 'objection';
import Sport from './Sport.js';
import League from './League.js';
import Season from './Season.js';
import Match from './Match.js';
import Set from './Set.js';
import Game from './Game.js';
import Team from './Team.js';
import Player from './Player.js';
import Position from './Position.js';
import Objective from './Objective.js';
import Post from './Post.js';
import Comment from './Comment.js';

class Tag extends Model {
  static get tableName() {
    return 'tags';
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
      sport: {
        relation: Model.ManyToManyRelation,
        modelClass: Sport,
        filter(builder) {
          builder.where('taggable_type', 'sports');
        },
        beforeInsert(model) {
          model.taggable_type = 'sports';
        },
        join: {
          from: 'tags.id',
          through: {
            from: 'taggable_tags.tag_id',
            to: 'taggable_tags.taggable_id',
          },
          to: 'sports.id',
        },
      },
      league: {
        relation: Model.ManyToManyRelation,
        modelClass: League,
        filter(builder) {
          builder.where('taggable_type', 'leagues');
        },
        beforeInsert(model) {
          model.taggable_type = 'leagues';
        },
        join: {
          from: 'tags.id',
          through: {
            from: 'taggable_tags.tag_id',
            to: 'taggable_tags.taggable_id',
          },
          to: 'leagues.id',
        },
      },
      season: {
        relation: Model.ManyToManyRelation,
        modelClass: Season,
        filter(builder) {
          builder.where('taggable_type', 'seasons');
        },
        beforeInsert(model) {
          model.taggable_type = 'seasons';
        },
        join: {
          from: 'tags.id',
          through: {
            from: 'taggable_tags.tag_id',
            to: 'taggable_tags.taggable_id',
          },
          to: 'seasons.id',
        },
      },
      match: {
        relation: Model.ManyToManyRelation,
        modelClass: Match,
        filter(builder) {
          builder.where('taggable_type', 'matches');
        },
        beforeInsert(model) {
          model.taggable_type = 'matches';
        },
        join: {
          from: 'tags.id',
          through: {
            from: 'taggable_tags.tag_id',
            to: 'taggable_tags.taggable_id',
          },
          to: 'matches.id',
        },
      },
      set: {
        relation: Model.ManyToManyRelation,
        modelClass: Set,
        filter(builder) {
          builder.where('taggable_type', 'sets');
        },
        beforeInsert(model) {
          model.taggable_type = 'sets';
        },
        join: {
          from: 'tags.id',
          through: {
            from: 'taggable_tags.tag_id',
            to: 'taggable_tags.taggable_id',
          },
          to: 'sets.id',
        },
      },
      game: {
        relation: Model.ManyToManyRelation,
        modelClass: Game,
        filter(builder) {
          builder.where('taggable_type', 'games');
        },
        beforeInsert(model) {
          model.taggable_type = 'games';
        },
        join: {
          from: 'tags.id',
          through: {
            from: 'taggable_tags.tag_id',
            to: 'taggable_tags.taggable_id',
          },
          to: 'games.id',
        },
      },
      team: {
        relation: Model.ManyToManyRelation,
        modelClass: Team,
        filter(builder) {
          builder.where('taggable_type', 'teams');
        },
        beforeInsert(model) {
          model.taggable_type = 'teams';
        },
        join: {
          from: 'tags.id',
          through: {
            from: 'taggable_tags.tag_id',
            to: 'taggable_tags.taggable_id',
          },
          to: 'teams.id',
        },
      },
      player: {
        relation: Model.ManyToManyRelation,
        modelClass: Player,
        filter(builder) {
          builder.where('taggable_type', 'players');
        },
        beforeInsert(model) {
          model.taggable_type = 'players';
        },
        join: {
          from: 'tags.id',
          through: {
            from: 'taggable_tags.tag_id',
            to: 'taggable_tags.taggable_id',
          },
          to: 'players.id',
        },
      },
      position: {
        relation: Model.ManyToManyRelation,
        modelClass: Position,
        filter(builder) {
          builder.where('taggable_type', 'positions');
        },
        beforeInsert(model) {
          model.taggable_type = 'positions';
        },
        join: {
          from: 'tags.id',
          through: {
            from: 'taggable_tags.tag_id',
            to: 'taggable_tags.taggable_id',
          },
          to: 'positions.id',
        },
      },
      objective: {
        relation: Model.ManyToManyRelation,
        modelClass: Objective,
        filter(builder) {
          builder.where('taggable_type', 'objectives');
        },
        beforeInsert(model) {
          model.taggable_type = 'objectives';
        },
        join: {
          from: 'tags.id',
          through: {
            from: 'taggable_tags.tag_id',
            to: 'taggable_tags.taggable_id',
          },
          to: 'objectives.id',
        },
      },
      post: {
        relation: Model.ManyToManyRelation,
        modelClass: Post,
        filter(builder) {
          builder.where('taggable_type', 'posts');
        },
        beforeInsert(model) {
          model.taggable_type = 'posts';
        },
        join: {
          from: 'tags.id',
          through: {
            from: 'taggable_tags.tag_id',
            to: 'taggable_tags.taggable_id',
          },
          to: 'posts.id',
        },
      },
      comment: {
        relation: Model.ManyToManyRelation,
        modelClass: Comment,
        filter(builder) {
          builder.where('taggable_type', 'comments');
        },
        beforeInsert(model) {
          model.taggable_type = 'comments';
        },
        join: {
          from: 'tags.id',
          through: {
            from: 'taggable_tags.tag_id',
            to: 'taggable_tags.taggable_id',
          },
          to: 'comments.id',
        },
      },
    };
  };
};

export default Tag;
