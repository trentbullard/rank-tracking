import { Model } from 'objection';
import Club from './Club.js';
import User from './User.js';

class ClubMember extends Model {
  static get tableName() {
    return 'club_members';
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
      required: ['club_id', 'user_id', 'role', 'status'],
      properties: {
        id: { type: 'integer' },
        club_id: { type: 'integer' },
        user_id: { type: 'integer' },
        invited_by_user_id: { type: 'integer' },
        role: { type: 'string', minLength: 1, maxLength: 255 },
        status: { type: 'string', minLength: 1, maxLength: 255 },
        joined_at: { type: 'string' },
      },
    };
  };

  static get relationMappings() {
    return {
      club: {
        relation: Model.BelongsToOneRelation,
        modelClass: Club,
        join: {
          from: 'club_members.club_id',
          to: 'clubs.id',
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'club_members.user_id',
          to: 'users.id',
        },
      },
      invited_by: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'club_members.invited_by_user_id',
          to: 'users.id',
        },
      },
    };
  };
};

export default ClubMember;
