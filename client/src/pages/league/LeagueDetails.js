import _ from 'lodash';
import * as React from 'react';
import { useParams } from 'react-router-dom';
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
import LeagueDetailsStandings from '../../components/league/LeagueDetailsStandings';
import { timedDigest } from '../../helpers/cryptography';
import { isFalse, isTrue } from '../../helpers/boolean';

const LeagueDetails = () => {
  const { id } = useParams();
  const [league, setLeague] = React.useState({});
  const [seasonOpen, setSeasonOpen] = React.useState(false);
  const { currentUser } = React.useContext(AuthContext);
  const { addFlash } = React.useContext(FlashContext);

  React.useEffect(() => {
    if (isFalse(id)) return;
    api.get(`/leagues`, {
      headers: {
        Authorization: `Bearer ${timedDigest(`GET/api/leagues`)}`,
      },
      params: {"leagues.id": id},
    })
    .then((res) => setLeague({
      id: res.data[0].id,
      name: res.data[0].name,
      sport: res.data[0].sport_name,
      owner: `${res.data[0].owner_fname} ${res.data[0].owner_lname}`,
      format: res.data[0].format,
      status: res.data[0].status,
      createdAt: new Date(res.data[0].created_at).toLocaleDateString(),
      seasons: _(res.data).map(season => ({
          id: season.season_id,
          name: season.season_name,
          format: season.season_format,
          status: season.season_status,
          createdAt: new Date(season.season_created_at).toLocaleDateString(),
      })).sortBy(['created_at'], ['desc']).value(),
    }))
    .catch((error) => addFlash(_.get(error, 'response.data.error', 'something went wrong'), 'error'));
  }, [id, currentUser, addFlash]);
  
  return (
    isTrue(league) ?
      <TitlePageLayout title={`${league.name} Details`}>
        <Paper sx={{ width: "100%", mb: "1rem" }}>
          <List disablePadding>
            <LeagueDetailsItem primary={league.sport} secondary="sport" />
            <LeagueDetailsItem primary={league.owner} secondary="owner" />
            <LeagueDetailsItem primary={league.createdAt} secondary="date created" />
            <LeagueDetailsItem primary={league.format} secondary="format" />
            <LeagueDetailsItem primary={league.status} secondary="status" />

            <Divider>
              <Typography sx={{ color: "text.secondary" }} variant="body2">
                Seasons
              </Typography>
            </Divider>
            
            <ListItem
              secondaryAction={
                <IconButton edge="end" onClick={() => setSeasonOpen(!seasonOpen)}>
                  {seasonOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton role="link" onClick={() => addFlash('not implemented yet', 'info')}>
                <ListItemText
                  primary={league.seasons[0].name}
                  secondary={`created ${league.seasons[0].createdAt}`}
                />
              </ListItemButton>
            </ListItem>
            <Collapse in={seasonOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {_.map(_.slice(league.seasons, 1), (season, index) => {
                  return (
                    <ListItemButton
                      role="link"
                      sx={{ pl: 4 }}
                      onClick={() => addFlash('not implemented yet', 'info')}
                      key={`season-${index}`}
                    >
                      <ListItemText primary={season.name} secondary={`created ${season.createdAt}`} />
                    </ListItemButton>
                  );
                })}
              </List>
            </Collapse>
            
            {isTrue(league.seasons[0].standings) ? <Divider /> : null}
            
            {isTrue(league.seasons[0].standings) ? <LeagueDetailsStandings standings={league.seasons[0].standings} /> : null}
          </List>
        </Paper>
      </TitlePageLayout>
    : <CircularProgress />
  );
};

export default LeagueDetails;
