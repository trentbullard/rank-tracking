/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('logs').del();
  await knex('team_players').del();
  await knex('teams').del();
  await knex('games').del();
  await knex('sets').del();
  await knex('matches').del();
  await knex('seasons').del();
  await knex('leagues').del();
  await knex('players').del();
  await knex('users').del();
  await knex('objectives').del();
  await knex('positions').del();
  await knex('sports').del();

  await knex('sports').insert([
    {name: 'foosball'},
    {name: 'cornhole'},
    {name: 'tabletennis'},
    {name: 'soccer'},
  ]);

  await knex('positions').insert([
    {name: 'player'},
    {name: 'offense'},
    {name: 'defense'},
    {name: 'front'},
    {name: 'back'},
    {name: 'coach'},
    {name: 'manager'},
    {name: 'assistant coach'},
    {name: 'owner'},
  ]);

  await knex('objectives').insert([
    {name: 'goal', value: 1, sport_id: 1},
    {name: 'hole', value: 3, sport_id: 2},
    {name: 'board', value: 1, sport_id: 2},
    {name: 'point', value: 1, sport_id: 3},
    {name: 'goal', value: 1, sport_id: 4},
  ]);

  await knex('users').insert([
    {email: 'some@thing.com', password_hash: '9c46dbec5d03f74352cc4a4da354b4e9796887eeb66ac292617692e765dbe400352559b16229f97b27614b51dbfbbb14613f2c10350435a8feaf53f73ba01c7c', first_name: 'trent', last_name: 'bullard', },
  ]);

  await knex('players').insert([
    {first_name: 'trent', last_name: 'bullard', designator: '1111', user_id: 1},
  ]);

  await knex('leagues').insert([
    {name: 'test foosball league 1', format: 'elo', owner_id: 1, sport_id: 1},
    {name: 'test cornhole league 1', format: 'elo', owner_id: 1, sport_id: 2},
    {name: 'test tabletennis league 1', format: 'elo', owner_id: 1, sport_id: 3},
    {name: 'test soccer league 1', format: 'elo', owner_id: 1, sport_id: 4},
  ]);

  await knex('seasons').insert([
    {name: 'test league 1 season 1', format: 'elo', status: 'active', league_id: 1},
  ]);

  await knex('matches').insert([
    {name: 'test league 1 match 1', status: 'active', collection_type: 'league', collection_id: 1},
    {name: 'test season 1 match 1', status: 'active', collection_type: 'season', collection_id: 1},
  ]);

  await knex('sets').insert([
    {name: 'test league 1 set 1', status: 'active', collection_type: 'league', collection_id: 1},
    {name: 'test season 1 set 1', status: 'active', collection_type: 'season', collection_id: 1},
    {name: 'test match 1 set 1', status: 'active', collection_type: 'match', collection_id: 1},
    {name: 'test match 2 set 1', status: 'active', collection_type: 'match', collection_id: 2},
  ]);

  await knex('games').insert([
    {name: 'test league 1 game 1', status: 'active', collection_type: 'league', collection_id: 1},
    {name: 'test season 1 game 1', status: 'active', collection_type: 'season', collection_id: 1},
    {name: 'test match 1 game 1', status: 'active', collection_type: 'match', collection_id: 1},
    {name: 'test match 2 game 1', status: 'active', collection_type: 'match', collection_id: 2},
    {name: 'test set 1 game 1', status: 'active', collection_type: 'set', collection_id: 1},
    {name: 'test set 2 game 1', status: 'active', collection_type: 'set', collection_id: 2},
    {name: 'test set 3 game 1', status: 'active', collection_type: 'set', collection_id: 3},
    {name: 'test set 4 game 1', status: 'active', collection_type: 'set', collection_id: 4},
  ]);

  await knex('teams').insert([
    {name: 'test team 1'},
  ]);

  await knex('team_players').insert([
    {team_id: 1, player_id: 1, position_id: 1},
  ]);

  await knex('game_teams').insert([
    {game_id: 1, team_id: 1},
    {game_id: 2, team_id: 1},
    {game_id: 3, team_id: 1},
    {game_id: 4, team_id: 1},
    {game_id: 5, team_id: 1},
    {game_id: 6, team_id: 1},
    {game_id: 7, team_id: 1},
    {game_id: 8, team_id: 1},
  ]);
};
