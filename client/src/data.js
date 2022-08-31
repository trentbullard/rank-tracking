const createRow = (name, sport, season, owner, memberCount, createdAt, joinedAt, teamCount, matchCount, format, status) => {
  return {
    name,
    sport,
    season,
    owner,
    memberCount,
    createdAt,
    joinedAt,
    teamCount,
    matchCount,
    format,
    status,
  };
};

//           name,            sport,            season,                 owner,            members, createdAt,   dateJoined,   teams,  matches,  format,       status
const rows = [
  createRow('NFL',            'Football',       '2019',                 'Roger Goodell',  '2000', '2019-01-01', '2019-01-01', '10',   '10',     "win/loss",   'active'),
  createRow('Fusion',         'Soccer',         '2021 Spring',          'Greatwood Dad',  '100',  '2019-01-01', '2019-01-01', '10',   '10',     "win/loss",   'break'),
  createRow('RLCS',           'Rocket League',  '2022 Summer Split',    'Gibbs',          '10',   '2019-01-01', '2019-01-01', '10',   '10',     "DE bracket", 'break'),
  createRow('Olympic Games',  'Table Tennis',   '2020 Summer Games',    'Thomas Bach',    '10',   '2019-01-01', '2019-01-01', '10',   '10',     'points',     'break'),
  createRow('Olympic Games',  'Curling',        '2022 Winter Games',    'Thomas Bach',    '10',   '2019-01-01', '2019-01-01', '10',   '10',     'points',     'break'),
  createRow('Olympic Games',  'Bouldering',     '2016 Summer Games',    'Thomas Bach',    '10',   '2019-01-01', '2019-01-01', '10',   '10',     'points',     'break'),
  createRow('Olympic Games',  'Snowboarding',   '2018 Winter Games',    'Thomas Bach',    '10',   '2019-01-01', '2019-01-01', '10',   '10',     'points',     'break'),
]

export function getLeagues() {
  return rows;
};
