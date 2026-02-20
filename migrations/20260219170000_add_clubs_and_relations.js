/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  await knex.schema
    .createTable('clubs', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('visibility').notNullable().defaultTo('private');
      table.string('status').notNullable().defaultTo('active');
      table.integer('owner_id').notNullable().references('users.id');
      table.text('description');
      table.timestamp('deleted_at');
      table.timestamps(true, true);
      table.index(['owner_id']);
    })
    .createTable('club_members', (table) => {
      table.increments('id').primary();
      table.integer('club_id').notNullable().references('clubs.id');
      table.integer('user_id').notNullable().references('users.id');
      table.integer('invited_by_user_id').references('users.id');
      table.string('role').notNullable().defaultTo('member');
      table.string('status').notNullable().defaultTo('active');
      table.timestamp('joined_at');
      table.timestamp('deleted_at');
      table.timestamps(true, true);
      table.unique(['club_id', 'user_id']);
      table.index(['club_id']);
      table.index(['user_id']);
    })
    .alterTable('leagues', (table) => {
      table.integer('club_id').references('clubs.id');
      table.index(['club_id']);
    })
    .alterTable('players', (table) => {
      table.integer('club_id').references('clubs.id');
      table.index(['club_id']);
    })
    .alterTable('teams', (table) => {
      table.integer('club_id').references('clubs.id');
      table.integer('league_id').references('leagues.id');
      table.index(['club_id']);
      table.index(['league_id']);
    });

  await knex.raw(`
    INSERT INTO clubs (name, visibility, status, owner_id, created_at, updated_at)
    SELECT
      CONCAT(
        COALESCE(
          NULLIF(TRIM(CONCAT(COALESCE(first_name, ''), ' ', COALESCE(last_name, ''))), ''),
          NULLIF(username, ''),
          email,
          CONCAT('User ', id::text)
        ),
        ' Club'
      ),
      'private',
      'active',
      id,
      NOW(),
      NOW()
    FROM users;
  `);

  await knex.raw(`
    INSERT INTO club_members (
      club_id,
      user_id,
      invited_by_user_id,
      role,
      status,
      joined_at,
      created_at,
      updated_at
    )
    SELECT
      id,
      owner_id,
      owner_id,
      'owner',
      'active',
      NOW(),
      NOW(),
      NOW()
    FROM clubs;
  `);

  await knex.raw(`
    UPDATE leagues AS l
    SET club_id = c.id
    FROM clubs AS c
    WHERE c.owner_id = l.owner_id
      AND l.club_id IS NULL;
  `);

  await knex.raw(`
    UPDATE players AS p
    SET club_id = c.id
    FROM clubs AS c
    WHERE c.owner_id = p.user_id
      AND p.club_id IS NULL;
  `);

  await knex.raw(`
    UPDATE teams AS t
    SET league_id = source.league_id
    FROM (
      SELECT
        s.rankable_id AS team_id,
        MIN(s.contest_id) AS league_id
      FROM standings AS s
      WHERE LOWER(s.rankable_type::text) IN ('team', 'teams')
        AND LOWER(s.contest_type::text) IN ('league', 'leagues')
      GROUP BY s.rankable_id
    ) AS source
    WHERE t.id = source.team_id
      AND t.league_id IS NULL;
  `);

  await knex.raw(`
    UPDATE teams AS t
    SET club_id = l.club_id
    FROM leagues AS l
    WHERE l.id = t.league_id
      AND t.club_id IS NULL;
  `);

  await knex.raw(`
    UPDATE teams AS t
    SET club_id = source.club_id
    FROM (
      SELECT
        tp.team_id,
        MIN(p.club_id) AS club_id,
        COUNT(DISTINCT p.club_id) AS club_count
      FROM team_players AS tp
      JOIN players AS p ON p.id = tp.player_id
      WHERE p.club_id IS NOT NULL
      GROUP BY tp.team_id
    ) AS source
    WHERE t.id = source.team_id
      AND source.club_count = 1
      AND t.club_id IS NULL;
  `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  await knex.schema
    .alterTable('teams', (table) => {
      table.dropColumn('league_id');
      table.dropColumn('club_id');
    })
    .alterTable('players', (table) => {
      table.dropColumn('club_id');
    })
    .alterTable('leagues', (table) => {
      table.dropColumn('club_id');
    })
    .dropTableIfExists('club_members')
    .dropTableIfExists('clubs');
};
