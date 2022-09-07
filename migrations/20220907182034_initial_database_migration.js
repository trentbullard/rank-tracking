/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.text('email').notNullable();
    table.string('password_hash').notNullable();
    table.string('username');
    table.string('first_name');
    table.string('last_name');
    table.boolean('is_admin').defaultTo(false);
    table.string('session_id');
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
  })
  .createTable('sports', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.timestamp('deleted_at');
    table.timestamps(true, true);
  })
  .createTable('positions', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
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
    table.integer('season_id').references('seasons.id');
    table.timestamp('deleted_at');
    table.timestamps(true, true);
  })
  .createTable('matches', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('status').notNullable().defaultTo('active');
    table.integer('season_id').references('seasons.id');
    table.timestamp('deleted_at');
    table.timestamps(true, true);
  })
  .createTable('sets', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('status').notNullable().defaultTo('active');
    table.integer('season_id').references('seasons.id');
    table.integer('match_id').references('matches.id');
    table.timestamp('deleted_at');
    table.timestamps(true, true);
  })
  .createTable('games', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('status').notNullable().defaultTo('active');
    table.integer('season_id').references('seasons.id');
    table.integer('match_id').references('matches.id');
    table.integer('set_id').references('sets.id');
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
  })
  .createTable('game_teams', (table) => {
    table.increments('id').primary();
    table.integer('game_id').references('games.id');
    table.integer('team_id').references('teams.id');
    table.timestamp('deleted_at');
    table.timestamps(true, true);
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
    table.integer('team_id').references('teams.id');
    table.integer('player_id').references('players.id');
    table.string('table_name').notNullable();
    table.integer('record_id').notNullable();
    table.timestamp('deleted_at');
    table.timestamps(true, true);
  })
  .createTable('logs', (table) => {
    table.increments('id').primary();
    table.text('message').notNullable();
    table.string('table_name').notNullable();
    table.integer('record_id').notNullable();
    table.integer('user_id').references('users.id');
    table.timestamp('deleted_at');
    table.timestamps(true, true);
  })
  .createTable('tags', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('table_name').notNullable();
    table.integer('record_id').notNullable();
    table.timestamp('deleted_at');
    table.timestamps(true, true);
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
    .dropTableIfExists('attachments');
};

export { up, down };
