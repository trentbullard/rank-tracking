import { Model } from 'objection';
import User from './User.js';
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
import Standing from './Standing.js';
import Post from './Post.js';
import Comment from './Comment.js';
import Tag from './Tag.js';

class Log extends Model {
  static get tableName() {
    return 'logs';
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
      required: ['user_id', 'loggable_id', 'loggable_type', 'message'],
      properties: {
        id: { type: 'integer' },
        user_id: { type: 'integer' },
        message: { type: 'string', minLength: 1 },
        loggable_id: { type: 'integer' },
        loggable_type: { type: 'string' },
      },
    };
  };

  static get relationMappings() {
    return {
      actor: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'logs.user_id',
          to: 'users.id',
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        filter(builder) {
          builder.where('loggable_type', 'users');
        },
        beforeInsert(model) {
          model.loggable_type = 'users';
        },
        join: {
          from: 'logs.loggable_id',
          to: 'users.id',
        },
      },
      sport: {
        relation: Model.BelongsToOneRelation,
        modelClass: Sport,
        filter(builder) {
          builder.where('loggable_type', 'sports');
        },
        beforeInsert(model) {
          model.loggable_type = 'sports';
        },
        join: {
          from: 'logs.loggable_id',
          to: 'sports.id',
        },
      },
      league: {
        relation: Model.BelongsToOneRelation,
        modelClass: League,
        filter(builder) {
          builder.where('loggable_type', 'league');
        },
        beforeInsert(model) {
          model.loggable_type = 'league';
        },
        join: {
          from: 'logs.loggable_id',
          to: 'leagues.id',
        },
      },
      season: {
        relation: Model.BelongsToOneRelation,
        modelClass: Season,
        filter(builder) {
          builder.where('loggable_type', 'seasons');
        },
        beforeInsert(model) {
          model.loggable_type = 'seasons';
        },
        join: {
          from: 'logs.loggable_id',
          to: 'seasons.id',
        },
      },
      match: {
        relation: Model.BelongsToOneRelation,
        modelClass: Match,
        filter(builder) {
          builder.where('loggable_type', 'matches');
        },
        beforeInsert(model) {
          model.loggable_type = 'matches';
        },
        join: {
          from: 'logs.loggable_id',
          to: 'matches.id',
        },
      },
      set: {
        relation: Model.BelongsToOneRelation,
        modelClass: Set,
        filter(builder) {
          builder.where('loggable_type', 'sets');
        },
        beforeInsert(model) {
          model.loggable_type = 'sets';
        },
        join: {
          from: 'logs.loggable_id',
          to: 'sets.id',
        },
      },
      game: {
        relation: Model.BelongsToOneRelation,
        modelClass: Game,
        filter(builder) {
          builder.where('loggable_type', 'games');
        },
        beforeInsert(model) {
          model.loggable_type = 'games';
        },
        join: {
          from: 'logs.loggable_id',
          to: 'games.id',
        },
      },
      team: {
        relation: Model.BelongsToOneRelation,
        modelClass: Team,
        filter(builder) {
          builder.where('loggable_type', 'teams');
        },
        beforeInsert(model) {
          model.loggable_type = 'teams';
        },
        join: {
          from: 'logs.loggable_id',
          to: 'teams.id',
        },
      },
      player: {
        relation: Model.BelongsToOneRelation,
        modelClass: Player,
        filter(builder) {
          builder.where('loggable_type', 'players');
        },
        beforeInsert(model) {
          model.loggable_type = 'players';
        },
        join: {
          from: 'logs.loggable_id',
          to: 'players.id',
        },
      },
      position: {
        relation: Model.BelongsToOneRelation,
        modelClass: Position,
        filter(builder) {
          builder.where('loggable_type', 'positions');
        },
        beforeInsert(model) {
          model.loggable_type = 'positions';
        },
        join: {
          from: 'logs.loggable_id',
          to: 'positions.id',
        },
      },
      objective: {
        relation: Model.BelongsToOneRelation,
        modelClass: Objective,
        filter(builder) {
          builder.where('loggable_type', 'objectives');
        },
        beforeInsert(model) {
          model.loggable_type = 'objectives';
        },
        join: {
          from: 'logs.loggable_id',
          to: 'objectives.id',
        },
      },
      standing: {
        relation: Model.BelongsToOneRelation,
        modelClass: Standing,
        filter(builder) {
          builder.where('loggable_type', 'standings');
        },
        beforeInsert(model) {
          model.loggable_type = 'standings';
        },
        join: {
          from: 'logs.loggable_id',
          to: 'standings.id',
        },
      },
      tag: {
        relation: Model.BelongsToOneRelation,
        modelClass: Tag,
        filter(builder) {
          builder.where('loggable_type', 'tags');
        },
        beforeInsert(model) {
          model.loggable_type = 'tags';
        },
        join: {
          from: 'logs.loggable_id',
          to: 'tags.id',
        },
      },
      post: {
        relation: Model.BelongsToOneRelation,
        modelClass: Post,
        filter(builder) {
          builder.where('loggable_type', 'posts');
        },
        beforeInsert(model) {
          model.loggable_type = 'posts';
        },
        join: {
          from: 'logs.loggable_id',
          to: 'posts.id',
        },
      },
      comment: {
        relation: Model.BelongsToOneRelation,
        modelClass: Comment,
        filter(builder) {
          builder.where('loggable_type', 'comments');
        },
        beforeInsert(model) {
          model.loggable_type = 'comments';
        },
        join: {
          from: 'logs.loggable_id',
          to: 'comments.id',
        },
      },
    };
  };
};

export default Log;
