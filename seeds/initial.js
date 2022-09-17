/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  await knex('sports').del();
  await knex('sports').insert([
    {name: 'foosball'},
    {name: 'cornhole'},
    {name: 'tabletennis'},
    {name: 'soccer'},
  ]);

  await knex('positions').del();
  await knex('positions').insert([
    {name: 'front'},
    {name: 'back'},
  ]);

  await knex('objectives').del();
  await knex('objectives').insert([
    {name: 'goal', value: 1, sport_id: 1},
    {name: 'hole', value: 3, sport_id: 2},
    {name: 'board', value: 1, sport_id: 2},
    {name: 'point', value: 1, sport_id: 3},
    {name: 'goal', value: 1, sport_id: 4},
  ]);
};
