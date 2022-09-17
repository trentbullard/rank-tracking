import { Model } from 'objection';
import User from './User.js';
import Comment from './Comment.js';
import Log from './Log.js';
import Tag from './Tag.js';

class Post extends Model {
  static get tableName() {
    return 'posts';
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
      required: ['user_id', 'title', 'status'],
      properties: {
        id: { type: 'integer' },
        user_id: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        body: { type: 'string', minLength: 1 },
        status: { type: 'string', minLength: 1, maxLength: 255 },
      },
    };
  };

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'posts.user_id',
          to: 'users.id',
        },
      },
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: 'posts.id',
          to: 'comments.post_id',
        },
      },
      logs: {
        relation: Model.HasManyRelation,
        modelClass: Log,
        filter(builder) {
          builder.where('loggable_type', 'posts');
        },
        beforeInsert(model) {
          model.loggable_type = 'posts';
        },
        join: {
          from: 'posts.id',
          to: 'logs.loggable_id',
        },
      },
      tags: {
        relation: Model.ManyToManyRelation,
        modelClass: Tag,
        filter(builder) {
          builder.where('taggable_type', 'posts');
        },
        beforeInsert(model) {
          model.taggable_type = 'posts';
        },
        join: {
          from: 'posts.id',
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

export default Post;
