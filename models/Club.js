import { Model } from 'objection';
import User from './User.js';
import ClubMember from './ClubMember.js';
import League from './League.js';
import Player from './Player.js';
import Team from './Team.js';

class Club extends Model {
  static get tableName() {
    return 'clubs';
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
      required: ['name', 'owner_id'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        visibility: { type: 'string', minLength: 1, maxLength: 255 },
        status: { type: 'string', minLength: 1, maxLength: 255 },
        owner_id: { type: 'integer' },
        description: { type: 'string' },
      },
    };
  };

  static get relationMappings() {
    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'clubs.owner_id',
          to: 'users.id',
        },
      },
      memberships: {
        relation: Model.HasManyRelation,
        modelClass: ClubMember,
        join: {
          from: 'clubs.id',
          to: 'club_members.club_id',
        },
      },
      members: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'clubs.id',
          through: {
            from: 'club_members.club_id',
            to: 'club_members.user_id',
          },
          to: 'users.id',
        },
      },
      leagues: {
        relation: Model.HasManyRelation,
        modelClass: League,
        join: {
          from: 'clubs.id',
          to: 'leagues.club_id',
        },
      },
      players: {
        relation: Model.HasManyRelation,
        modelClass: Player,
        join: {
          from: 'clubs.id',
          to: 'players.club_id',
        },
      },
      teams: {
        relation: Model.HasManyRelation,
        modelClass: Team,
        join: {
          from: 'clubs.id',
          to: 'teams.club_id',
        },
      },
    };
  };
};

export default Club;
