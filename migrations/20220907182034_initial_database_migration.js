/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email').unique().notNullable();
    table.string('password_hash');
    table.string('username').unique();
    table.string('first_name');
    table.string('last_name');
    table.boolean('is_admin').defaultTo(false);
    table.string('session_id').unique();
    table.string('avatar_url');
    table.timestamp('deleted_at');
    table.timestamps(true, true);
  })
  .createTable('players', (table) => {
    table.increments('id').primary();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('designator');
    table.integer('user_id').references('users.id');
    table.timestamp('deleted_at');
    table.timestamps(true, true);
    table.unique(['first_name', 'last_name', 'designator']);
  })
  .createTable('sports', (table) => {
    table.increments('id').primary();
    table.string('name').unique().notNullable();
    table.timestamp('deleted_at');
    table.timestamps(true, true);
  })
  .createTable('positions', (table) => {
    table.increments('id').primary();
    table.string('name').unique().notNullable();
    table.timestamp('deleted_at');
    table.timestamps(true, true);
  })
  .createTable('objectives', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('value').notNullable();
    table.integer('sport_id').references('sports.id');
    table.timestamp('deleted_at');
    table.timestamps(true, true);
    table.unique(['name', 'sport_id']);
  })
  .createTable('leagues', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('format').notNullable();
    table.string('status').notNullable().defaultTo('active');
    table.integer('owner_id').references('users.id');
    table.integer('sport_id').references('sports.id');
    table.timestamp('deleted_at');
    table.timestamps(true, true);
  })
  .createTable('seasons', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('format').notNullable();
    table.string('status').notNullable().defaultTo('active');
    table.integer('league_id').references('leagues.id');
    table.timestamp('deleted_at');
    table.timestamps(true, true);
  })
  .createTable('teams', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.timestamp('deleted_at');
    table.timestamps(true, true);
  })
  .createTable('matches', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('status').notNullable().defaultTo('active');
    table.string('collection_type').notNullable(); // league, season
    table.integer('collection_id').notNullable();
    table.timestamp('deleted_at');
    table.timestamps(true, true);
  })
  .createTable('sets', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('status').notNullable().defaultTo('active');
    table.string('collection_type').notNullable(); // league, season, match
    table.integer('collection_id').notNullable();
    table.timestamp('deleted_at');
    table.timestamps(true, true);
  })
  .createTable('games', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('status').notNullable().defaultTo('active');
    table.string('collection_type').notNullable(); // league, season, match, set
    table.integer('collection_id').notNullable();
    table.timestamp('deleted_at');
    table.timestamps(true, true);
  })
  .createTable('team_players', (table) => {
    table.increments('id').primary();
    table.integer('team_id').references('teams.id');
    table.integer('player_id').references('players.id');
    table.integer('position_id').references('positions.id');
    table.timestamp('deleted_at');
    table.timestamps(true, true);
    table.unique(['team_id', 'player_id', 'position_id']);
  })
  .createTable('game_teams', (table) => {
    table.increments('id').primary();
    table.integer('game_id').references('games.id');
    table.integer('team_id').references('teams.id');
    table.timestamp('deleted_at');
    table.timestamps(true, true);
    table.unique(['game_id', 'team_id']);
  })
  .createTable('player_objectives', (table) => {
    table.increments('id').primary();
    table.integer('player_id').references('players.id');
    table.integer('objective_id').references('objectives.id');
    table.integer('game_id').references('games.id');
    table.timestamp('deleted_at');
    table.timestamps(true, true);
  })
  .createTable('standings', (table) => {
    table.increments('id').primary();
    table.integer('rank').notNullable();
    table.integer('points').notNullable();
    table.string('rankable_type').notNullable(); // team or player
    table.integer('rankable_id').notNullable();
    table.string('contest_type').notNullable(); // league, season, match, set, game
    table.integer('contest_id').notNullable();
    table.timestamp('deleted_at');
    table.timestamps(true, true);
    table.unique(['rankable_type', 'rankable_id', 'contest_type', 'contest_id']);
  })
  .createTable('logs', (table) => {
    table.increments('id').primary();
    table.text('message');
    table.string('level');
    table.string('action').notNullable();
    table.string('loggable_type').notNullable();
    table.integer('loggable_id').notNullable();
    table.integer('user_id').references('users.id');
    table.timestamp('deleted_at');
    table.timestamps(true, true);
  })
  .createTable('tags', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.timestamp('deleted_at');
    table.timestamps(true, true);
  })
  .createTable('taggable_tags', (table) => {
    table.increments('id').primary();
    table.integer('tag_id').references('tags.id');
    table.integer('taggable_id').notNullable();
    table.string('taggable_type').notNullable();
    table.timestamp('deleted_at');
    table.timestamps(true, true);
    table.unique(['tag_id', 'taggable_id', 'taggable_type']);
  })
  .createTable('posts', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('body').notNullable();
    table.integer('user_id').references('users.id');
    table.string('status').notNullable().defaultTo('active');
    table.timestamp('published_at');
    table.timestamp('deleted_at');
    table.timestamps(true, true);
  })
  .createTable('comments', (table) => {
    table.increments('id').primary();
    table.text('body').notNullable();
    table.integer('user_id').references('users.id');
    table.integer('post_id').references('posts.id');
    table.timestamp('deleted_at');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 const down = (knex) => {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('players')
    .dropTableIfExists('sports')
    .dropTableIfExists('positions')
    .dropTableIfExists('objectives')
    .dropTableIfExists('leagues')
    .dropTableIfExists('seasons')
    .dropTableIfExists('teams')
    .dropTableIfExists('matches')
    .dropTableIfExists('sets')
    .dropTableIfExists('games')
    .dropTableIfExists('team_players')
    .dropTableIfExists('game_teams')
    .dropTableIfExists('player_objectives')
    .dropTableIfExists('standings')
    .dropTableIfExists('logs')
    .dropTableIfExists('tags')
    .dropTableIfExists('posts')
    .dropTableIfExists('comments')
};

export { up, down };
