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
import { isFalse, isTrue } from '../../../helpers/boolean';

const SeasonSelector = ({ league }) => {
  const leagueId = league.id;
  const { addFlash } = React.useContext(FlashContext);
  const {
    seasons,
    setSeasons,
    selectedSeason,
    setSelectedSeason,
  } = React.useContext(NewGameContext);
  
  React.useEffect(() => {
    if (isFalse(leagueId)) return;
    api.get(`/seasons`, {
      headers: {
        'Authorization': `Bearer ${timedDigest(`GET/api/seasons`)}`,
      },
      params: {
        league_id: leagueId,
      },
    }).then(res => {
      setSeasons(res.data);
    }).catch(error => {
      addFlash(_.get(error, 'response.data.error', 'something went wrong'), 'error');
    });
  }, [leagueId, setSeasons, addFlash]);

  const onClickAddSeason = e => {
    e.preventDefault();
    addFlash('not implemented yet', 'info');
  };
  
  return (
    <Box display="flex" alignItems="flex-start" gap={1}>
      <FormControl
        fullWidth
        disabled={isFalse(seasons)}
      >
        <InputLabel id="season-select-label">Season (optional)</InputLabel>
        <Select
          labelId="season-select-label"
          id="season-select"
          value={isTrue(selectedSeason) ? selectedSeason.id : ''}
          label="Season (optional)"
          onChange={e => setSelectedSeason(_.find(seasons, { id: e.target.value }) || {})}
        >
          <MenuItem key={0} value={0}>None</MenuItem>
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

export default SeasonSelector;
