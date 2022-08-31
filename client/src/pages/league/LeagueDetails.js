import _ from 'lodash';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Collapse, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, Paper, Typography } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { TitlePageLayout } from '../../components/layouts';
import LeagueDetailsItem from '../../components/league/LeagueDetailsItem';

const createObject = (name, sport, season, owner, memberCount, createdAt, joinedAt, teamCount, matchCount, format, status) => {
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
const leagueArray = [
  createObject('NFL',            'Football',       '2019',                 'Roger Goodell',  '2000', '2019-01-01', '2019-01-01', '10',   '10',     "win/loss",   'active'),
  createObject('Fusion',         'Soccer',         '2021 Spring',          'Greatwood Dad',  '100',  '2019-01-01', '2019-01-01', '10',   '10',     "win/loss",   'break'),
  createObject('RLCS',           'Rocket League',  '2022 Summer Split',    'Gibbs',          '10',   '2019-01-01', '2019-01-01', '10',   '10',     "DE bracket", 'break'),
  createObject('Olympic Games',  'Table Tennis',   '2020 Summer Games',    'Thomas Bach',    '10',   '2019-01-01', '2019-01-01', '10',   '10',     'points',     'break'),
  createObject('Olympic Games',  'Curling',        '2022 Winter Games',    'Thomas Bach',    '10',   '2019-01-01', '2019-01-01', '10',   '10',     'points',     'break'),
  createObject('Olympic Games',  'Bouldering',     '2016 Summer Games',    'Thomas Bach',    '10',   '2019-01-01', '2019-01-01', '10',   '10',     'points',     'break'),
  createObject('Olympic Games',  'Snowboarding',   '2018 Winter Games',    'Thomas Bach',    '10',   '2019-01-01', '2019-01-01', '10',   '10',     'points',     'break'),
]

const leagues = _.keyBy(leagueArray, 'name');

const LeagueDetails = () => {
  const { id } = useParams();
  const league = leagues[id];
  const [seasonOpen, setSeasonOpen] = React.useState(false);
  const [standingsOpen, setStandingsOpen] = React.useState(false);
  const navigate = useNavigate();
  
  return (
    <TitlePageLayout title={`${league.name} League`}>
      <Paper sx={{ width: "100%", mb: "1rem" }}>
        <List>
          <LeagueDetailsItem primary={league.name} secondary="league name" />
          <LeagueDetailsItem primary={league.sport} secondary="sport" />
          <LeagueDetailsItem primary={league.owner} secondary="owner" />
          <LeagueDetailsItem primary={league.createdAt} secondary="date created" />
          <LeagueDetailsItem primary={league.joinedAt} secondary="date joined" />
          <LeagueDetailsItem primary={league.format} secondary="format" />
          <LeagueDetailsItem primary={league.status} secondary="status" />

          <Divider />
          
          <ListItem
            secondaryAction={
              <IconButton edge="end" onClick={()=>setSeasonOpen(!seasonOpen)}>
                {seasonOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role="link" onClick={()=>navigate(`/leagues/${league.name}/seasons/${league.season}`)}>
              <ListItemText
                primary={league.season}
                secondary={
                  <Typography component="span" variant="body2" color="textSecondary">
                    current season
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
          <Collapse in={seasonOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                role="link"
                sx={{ pl: 4 }}
                onClick={()=>navigate(`/leagues/${league.name}/seasons/2019`)}
              >
                <ListItemText primary="2019" secondary="season ended Aug 2019" />
              </ListItemButton>
              <ListItemButton
                role="link"
                sx={{ pl: 4 }}
                onClick={()=>navigate(`/leagues/${league.name}/seasons/2018`)}
              >
                <ListItemText primary="2018" secondary="season ended Aug 2018" />
              </ListItemButton>
              <ListItemButton
                role="link"
                sx={{ pl: 4 }}
                onClick={()=>navigate(`/leagues/${league.name}/seasons/2017`)}
              >
                <ListItemText primary="2017" secondary="season ended Aug 2017" />
              </ListItemButton>
            </List>
          </Collapse>
          
          <Divider />
          
          <ListItem
            secondaryAction={
              <IconButton edge="end" onClick={()=>setStandingsOpen(!standingsOpen)}>
                {standingsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role="link" onClick={()=>navigate(`/leagues/${league.name}/seasons/${league.season}/teams`)}>
              <ListItemText
                primary="Standings"
                secondary={
                  <Typography component="span" variant="body2" color="textSecondary">
                    current season
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
          <Collapse in={standingsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                role="link"
                sx={{ pl: 4 }}
                onClick={()=>navigate(`/leagues/${league.name}/seasons/${league.season}/teams/Astros`)}
              >
                <ListItemText primary="Astros" secondary="record: 8 wins, 2 losses" />
              </ListItemButton>
              <ListItemButton
                role="link"
                sx={{ pl: 4 }}
                onClick={()=>navigate(`/leagues/${league.name}/seasons/${league.season}/teams/Rangers`)}
              >
                <ListItemText primary="Rangers" secondary="record: 5 wins, 5 losses" />
              </ListItemButton>
              <ListItemButton
                role="link"
                sx={{ pl: 4 }}
                onClick={()=>navigate(`/leagues/${league.name}/seasons/${league.season}/teams/Rockies`)}
              >
                <ListItemText primary="Rockies" secondary="record: 2 wins, 8 losses" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Paper>
    </TitlePageLayout>
  );
};

export default LeagueDetails;
