import _ from 'lodash';
import * as React from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import {
  CircularProgress,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import api from '../../api/api';
import { AuthContext } from '../../contexts/AuthContext';
import { FlashContext } from '../../contexts/FlashContext';
import { TitlePageLayout } from '../../components/layouts';
import LeagueDetailsItem from '../../components/league/LeagueDetailsItem';
import { isFalse, isTrue } from '../../helpers/boolean';

const ClubDetails = () => {
  const { id } = useParams();
  const [club, setClub] = React.useState({});
  const [leaguesOpen, setLeaguesOpen] = React.useState(false);
  const [seasonsOpen, setSeasonsOpen] = React.useState(false);
  const [teamsOpen, setTeamsOpen] = React.useState(false);
  const [playersOpen, setPlayersOpen] = React.useState(false);
  const { currentUser } = React.useContext(AuthContext);
  const { addFlash } = React.useContext(FlashContext);

  React.useEffect(() => {
    if (isFalse(id) || isFalse(currentUser)) return;
    Promise.all([
      api.get('/clubs', { params: { user_id: currentUser.id } }),
      api.get('/leagues'),
      api.get('/seasons'),
      api.get('/teams', { params: { club_id: id } }),
    ])
      .then(([clubsRes, leaguesRes, seasonsRes, teamsRes]) => {
        const clubRow = _.find(clubsRes.data, (clubResult) => String(clubResult.id) === String(id));
        if (isFalse(clubRow)) {
          addFlash('club not found', 'error');
          setClub({
            id,
            name: 'Unknown Club',
            owner: '',
            role: '',
            visibility: '',
            status: '',
            createdAt: '',
            description: '',
            leagues: [],
            seasons: [],
            teams: [],
          });
          return;
        };

        const leagues = _(leaguesRes.data)
          .filter((league) => String(league.club_id) === String(id))
          .uniqBy('id')
          .value();
        const leagueIds = new Set(_.map(leagues, 'id'));
        const seasons = _(seasonsRes.data)
          .filter((season) => leagueIds.has(season.league_id))
          .uniqBy('id')
          .map((season) => ({
            ...season,
            league_name: _.get(_.find(leagues, { id: season.league_id }), 'name'),
          }))
          .value();
        const teams = _(teamsRes.data).uniqBy('id').value();

        setClub({
          id: clubRow.id,
          name: clubRow.name,
          owner: `${clubRow.owner_fname || ''} ${clubRow.owner_lname || ''}`.trim(),
          role: clubRow.member_role,
          visibility: clubRow.visibility,
          status: clubRow.status,
          createdAt: new Date(clubRow.created_at).toLocaleDateString(),
          description: clubRow.description,
          leagues,
          seasons,
          teams,
        });
      })
      .catch((error) => addFlash(_.get(error, 'response.data.error', 'something went wrong'), 'error'));
  }, [id, currentUser, addFlash]);

  return (
    isTrue(club)
      ? (
        <TitlePageLayout title={`${club.name} Details`}>
          <Paper sx={{ width: '100%', mb: '1rem' }}>
            <List disablePadding>
              <LeagueDetailsItem primary={club.owner} secondary="owner" />
              <LeagueDetailsItem primary={club.role} secondary="your role" />
              <LeagueDetailsItem primary={club.visibility} secondary="visibility" />
              <LeagueDetailsItem primary={club.status} secondary="status" />
              <LeagueDetailsItem primary={club.createdAt} secondary="date created" />
              <LeagueDetailsItem primary={club.description} secondary="description" />

              <Divider>
                <Typography sx={{ color: 'text.secondary' }} variant="body2">
                  Leagues ({club.leagues?.length || 0})
                </Typography>
              </Divider>
              <ListItem
                secondaryAction={(
                  <IconButton edge="end" onClick={() => setLeaguesOpen(!leaguesOpen)}>
                    {leaguesOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                )}
                disablePadding
              >
                <ListItemButton component={RouterLink} to="/leagues">
                  <ListItemText primary="View all leagues" secondary="open league list page" />
                </ListItemButton>
              </ListItem>
              <Collapse in={leaguesOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {_.map(club.leagues, (league) => (
                    <ListItemButton
                      component={RouterLink}
                      to={`/leagues/${league.id}`}
                      sx={{ pl: 4 }}
                      key={`league-${league.id}`}
                    >
                      <ListItemText
                        primary={league.name}
                        secondary={`${league.sport_name || 'sport'} | ${league.status}`}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>

              <Divider>
                <Typography sx={{ color: 'text.secondary' }} variant="body2">
                  Seasons ({club.seasons?.length || 0})
                </Typography>
              </Divider>
              <ListItem
                secondaryAction={(
                  <IconButton edge="end" onClick={() => setSeasonsOpen(!seasonsOpen)}>
                    {seasonsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                )}
                disablePadding
              >
                <ListItemButton onClick={() => addFlash('season pages are not implemented yet', 'info')}>
                  <ListItemText primary="Season drill-down" secondary="open season from its league page" />
                </ListItemButton>
              </ListItem>
              <Collapse in={seasonsOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {_.map(club.seasons, (season) => (
                    <ListItemButton
                      component={RouterLink}
                      to={`/leagues/${season.league_id}`}
                      sx={{ pl: 4 }}
                      key={`season-${season.id}`}
                    >
                      <ListItemText
                        primary={season.name}
                        secondary={`${season.league_name || 'league'} | ${season.status}`}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>

              <Divider>
                <Typography sx={{ color: 'text.secondary' }} variant="body2">
                  Teams ({club.teams?.length || 0})
                </Typography>
              </Divider>
              <ListItem
                secondaryAction={(
                  <IconButton edge="end" onClick={() => setTeamsOpen(!teamsOpen)}>
                    {teamsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                )}
                disablePadding
              >
                <ListItemButton component={RouterLink} to="/teams">
                  <ListItemText primary="View all teams" secondary="open team list page" />
                </ListItemButton>
              </ListItem>
              <Collapse in={teamsOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {_.map(club.teams, (team) => (
                    <ListItemButton
                      component={RouterLink}
                      to={team.league_id ? `/leagues/${team.league_id}` : '/teams'}
                      sx={{ pl: 4 }}
                      key={`team-${team.id}`}
                    >
                      <ListItemText
                        primary={team.name}
                        secondary={team.league_id ? `league ${team.league_id}` : 'team details page not implemented'}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>

              <Divider>
                <Typography sx={{ color: 'text.secondary' }} variant="body2">
                  Players
                </Typography>
              </Divider>
              <ListItem
                secondaryAction={(
                  <IconButton edge="end" onClick={() => setPlayersOpen(!playersOpen)}>
                    {playersOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                )}
                disablePadding
              >
                <ListItemButton onClick={() => addFlash('player pages are not implemented yet', 'info')}>
                  <ListItemText primary="Player drill-down" secondary="coming soon" />
                </ListItemButton>
              </ListItem>
              <Collapse in={playersOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }} onClick={() => addFlash('player pages are not implemented yet', 'info')}>
                    <ListItemText primary="Open players" secondary="not implemented yet" />
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
          </Paper>
        </TitlePageLayout>
      )
      : <CircularProgress />
  );
};

export default ClubDetails;
