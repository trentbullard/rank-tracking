import _ from 'lodash';
import * as React from 'react';
import {
  Box,
  IconButton,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { motion } from 'framer-motion';

import api from '../../api/api';
import { AuthContext } from '../../contexts/AuthContext';
import { FlashContext } from '../../contexts/FlashContext';
import { timedDigest } from '../../helpers/cryptography';
import { isFalse, isTrue } from '../../helpers/boolean';

let easing = [0.6, -0.05, 0.01, 0.99];
const animate = {
  opacity: 1,
  y: 0,
  transition: {
    duration: 0.6,
    ease: easing,
    delay: 0.16,
  },
};

const LeagueSelector = ({ leagues, setLeague, selectedLeague, onClickAddLeague }) => {
  return (
    <Box display="flex" alignItems="flex-start" gap={1}>
      <FormControl
        fullWidth
        disabled={isFalse(leagues)}
      >
        <InputLabel id="league-select-label">League</InputLabel>
        <Select
          labelId="league-select-label"
          id="league-select"
          value={selectedLeague}
          label="League"
          onChange={e => setLeague(e.target.value)}
        >
          {_.map(leagues, league => (
            <MenuItem key={league.id} value={league.id}>
              {league.name}
            </MenuItem>
          ))}
        </Select>
        {isFalse(leagues) && <FormHelperText component="span">No Leagues Found</FormHelperText>}
      </FormControl>
      <Tooltip title="Add League">
        <IconButton onClick={onClickAddLeague} aria-label="add" color="secondary">
          <AddCircleIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

const SeasonSelector = ({ seasons, setSeason, selectedSeason, onClickAddSeason }) => {
  return (
    <Box display="flex" alignItems="flex-start" gap={1}>
      <FormControl
        fullWidth
        disabled={isFalse(seasons)}
      >
        <InputLabel id="season-select-label">Season</InputLabel>
        <Select
          labelId="season-select-label"
          id="season-select"
          value={selectedSeason}
          label="Season"
          onChange={e => setSeason(e.target.value)}
        >
          {_.map(seasons, season => (
            <MenuItem key={season.id} value={season.id}>{season.name}</MenuItem>
          ))}
        </Select>
        {isFalse(seasons) && <FormHelperText>No Seasons Found</FormHelperText>}
      </FormControl>
      <Tooltip title="add season">
        <IconButton onClick={onClickAddSeason} aria-label="add" color="secondary">
          <AddCircleIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

const NewGameForm = ({ sport }) => {
  const [leagues, setLeagues] = React.useState([]);
  const [league, setLeague] = React.useState('');
  const [seasons, setSeasons] = React.useState([]);
  const [season, setSeason] = React.useState('');
  const { currentUser } = React.useContext(AuthContext);
  const { addFlash } = React.useContext(FlashContext);
  
  React.useEffect(() => {
    if (isFalse(currentUser)) return;
    api.get(`/leagues`, {
      headers: {
        'Authorization': `Bearer ${timedDigest(`GET/api/leagues`)}`,
      },
      params: {
        owner_id: currentUser.id,
        sport_id: sport.id,
      },
    }).then(res => {
      setLeagues(res.data);
    }).catch(error => {
      addFlash(_.get(error, 'response.data.error', 'something went wrong'), 'error');
    });
  }, [currentUser, sport, addFlash]);

  React.useEffect(() => {
    if (isFalse(league)) return;
    api.get(`/seasons`, {
      headers: {
        'Authorization': `Bearer ${timedDigest(`GET/api/seasons`)}`,
      },
      params: {
        league_id: league,
      },
    }).then(res => {
      setSeasons(res.data);
    }).catch(error => {
      addFlash(_.get(error, 'response.data.error', 'something went wrong'), 'error');
    });
  }, [league, addFlash]);
  
  const onSubmit = e => {
    e.preventDefault();
    console.log('submit');
  };

  const onClickAddLeague = e => {
    e.preventDefault();
    addFlash('not implemented yet', 'info');
  };
  
  const onClickAddSeason = e => {
    e.preventDefault();
    addFlash('not implemented yet', 'info');
  };
  
  return (
    <Box display="flex" flexDirection="column" sx={{ width: "100%" }}>
      <form onSubmit={onSubmit}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
          component={motion.div}
          initial={{ opacity: 0, y: 40 }}
          animate={animate}
        >
          <LeagueSelector leagues={leagues} setLeague={setLeague} selectedLeague={league} onClickAddLeague={onClickAddLeague} />
          {isTrue(league) && <SeasonSelector seasons={seasons} setSeason={setSeason} selectedSeason={season} onClickAddSeason={onClickAddSeason} />}
        </Box>
      </form>
    </Box>
  );
};

export default NewGameForm;
