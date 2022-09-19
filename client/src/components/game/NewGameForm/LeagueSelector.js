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

import api from '../../../api/api';
import { FlashContext } from '../../../contexts/FlashContext';
import { NewGameContext } from '../../../contexts/NewGameContext';
import { timedDigest } from '../../../helpers/cryptography';
import { isFalse } from '../../../helpers/boolean';

const LeagueSelector = ({ currentUser, sport }) => {
  const { addFlash } = React.useContext(FlashContext);
  const { leagues, setLeagues, selectedLeague, setSelectedLeague } = React.useContext(NewGameContext);
  
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
  }, [currentUser, sport, setLeagues, addFlash]);
  
  const onClickAddLeague = e => {
    e.preventDefault();
    addFlash('not implemented yet', 'info');
  };
  
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
          value={selectedLeague.name}
          label="League"
          onChange={e => setSelectedLeague(_.find(leagues, { id: e.target.value }))}
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

export default LeagueSelector;
