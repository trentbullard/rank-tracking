import { Model } from 'objection';
import Team from './Team.js';
import Player from './Player.js';
import League from './League.js';
import Season from './Season.js';
import Match from './Match.js';
import Set from './Set.js';
import Game from './Game.js';
import Log from './Log.js';
import Tag from './Tag.js';

class Standing extends Model {
  static get tableName() {
    return 'standings';
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
      required: [
        'rank',
        'points',
        'rankable_id',
        'rankable_type',
        'contest_id',
        'contest_type',
      ],
      properties: {
        id: { type: 'integer' },
        rank: { type: 'integer' },
        points: { type: 'integer' },
        rankable_id: { type: 'integer' },
        rankable_type: { type: 'string' },
        contest_id: { type: 'integer' },
        contest_type: { type: 'string' },
      },
    };
  };

  static get relationMappings() {
    return {
      team: {
        relation: Model.BelongsToOneRelation,
        modelClass: Team,
        filter(builder) {
          builder.where('rankable_type', 'Team');
        },
        beforeInsert(model) {
          model.rankable_type = 'Team';
        },
        join: {
          from: 'standings.rankable_id',
          to: 'teams.id',
        },
      },
      player: {
        relation: Model.BelongsToOneRelation,
        modelClass: Player,
        filter(builder) {
          builder.where('rankable_type', 'Player');
        },
        beforeInsert(model) {
          model.rankable_type = 'Player';
        },
        join: {
          from: 'standings.rankable_id',
          to: 'players.id',
        },
      },
      league: {
        relation: Model.BelongsToOneRelation,
        modelClass: League,
        filter(builder) {
          builder.where('contest_type', 'League');
        },
        beforeInsert(model) {
          model.contest_type = 'League';
        },
        join: {
          from: 'standings.contest_id',
          to: 'leagues.id',
        },
      },
      season: {
        relation: Model.BelongsToOneRelation,
        modelClass: Season,
        filter(builder) {
          builder.where('contest_type', 'Season');
        },
        beforeInsert(model) {
          model.contest_type = 'Season';
        },
        join: {
          from: 'standings.contest_id',
          to: 'seasons.id',
        },
      },
      match: {
        relation: Model.BelongsToOneRelation,
        modelClass: Match,
        filter(builder) {
          builder.where('contest_type', 'Match');
        },
        beforeInsert(model) {
          model.contest_type = 'Match';
        },
        join: {
          from: 'standings.contest_id',
          to: 'matches.id',
        },
      },
      set: {
        relation: Model.BelongsToOneRelation,
        modelClass: Set,
        filter(builder) {
          builder.where('contest_type', 'Set');
        },
        beforeInsert(model) {
          model.contest_type = 'Set';
        },
        join: {
          from: 'standings.contest_id',
          to: 'sets.id',
        },
      },
      game: {
        relation: Model.BelongsToOneRelation,
        modelClass: Game,
        filter(builder) {
          builder.where('contest_type', 'Game');
        },
        beforeInsert(model) {
          model.contest_type = 'Game';
        },
        join: {
          from: 'standings.contest_id',
          to: 'games.id',
        },
      },
      log: {
        relation: Model.HasManyRelation,
        modelClass: Log,
        filter(builder) {
          builder.where('loggable_type', 'standings');
        },
        beforeInsert(model) {
          model.loggable_type = 'standings';
        },
        join: {
          from: 'standings.id',
          to: 'logs.loggable_id',
        },
      },
      tags: {
        relation: Model.ManyToManyRelation,
        modelClass: Tag,
        filter(builder) {
          builder.where('taggable_type', 'standings');
        },
        beforeInsert(model) {
          model.taggable_type = 'standings';
        },
        join: {
          from: 'standings.id',
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

export default Standing;
