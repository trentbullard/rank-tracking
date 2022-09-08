import { Model } from 'objection';
import User from './User.js';
import Post from './Post.js';
import Tag from './Tag.js';
import Log from './Log.js';

class Comment extends Model {
  static get tableName() {
    return 'comments';
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
      required: ['user_id', 'post_id', 'body'],
      properties: {
        id: { type: 'integer' },
        user_id: { type: 'integer' },
        post_id: { type: 'integer' },
        body: { type: 'text', minLength: 1 },
      },
    };
  };

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'comments.user_id',
          to: 'users.id',
        },
      },
      post: {
        relation: Model.BelongsToOneRelation,
        modelClass: Post,
        join: {
          from: 'comments.post_id',
          to: 'posts.id',
        },
      },
      tags: {
        relation: Model.ManyToManyRelation,
        modelClass: Tag,
        filter(builder) {
          builder.where('taggable_type', 'comments');
        },
        beforeInsert(model) {
          model.taggable_type = 'comments';
        },
        join: {
          from: 'comments.id',
          through: {
            from: 'taggable_tags.taggable_id',
            to: 'taggable_tags.tag_id',
          },
          to: 'tags.id',
        },
      },
      logs: {
        relation: Model.HasManyRelation,
        modelClass: Log,
        filter(builder) {
          builder.where('loggable_type', 'comments');
        },
        beforeInsert(model) {
          model.loggable_type = 'comments';
        },
        join: {
          from: 'comments.id',
          to: 'logs.loggable_id',
        },
      },
    };
  };
};

export default Comment;
