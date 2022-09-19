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

const MatchSelector = ({ league }) => {
  const leagueId = league.id;
  const { addFlash } = React.useContext(FlashContext);
  const {
    selectedSeason,
    matches,
    setMatches,
    selectedMatch,
    setSelectedMatch,
  } = React.useContext(NewGameContext);
  
  React.useEffect(() => {
    if (isFalse(leagueId)) return;
    const params = {
      collection_id: leagueId,
      collection_type: 'leagues',
    };
    if (isTrue(selectedSeason)) {
      params.collection_type = 'seasons';
      params.collection_id = selectedSeason.id;
    };
    api.get(`/matches`, {
      headers: {
        'Authorization': `Bearer ${timedDigest(`GET/api/matches`)}`,
      },
      params,
    }).then(res => {
      setMatches(res.data);
    }).catch(error => {
      addFlash(_.get(error, 'response.data.error', 'something went wrong'), 'error');
    });
  }, [leagueId, selectedSeason, setMatches, addFlash]);

  const onClickAddMatch = e => {
    e.preventDefault();
    addFlash('not implemented yet', 'info');
  };
  
  return (
    <Box display="flex" alignItems="flex-start" gap={1}>
      <FormControl
        fullWidth
        disabled={isFalse(matches)}
      >
        <InputLabel id="match-select-label">Match (optional)</InputLabel>
        <Select
          labelId="match-select-label"
          id="match-select"
          value={isTrue(selectedMatch) ? selectedMatch.id : ''}
          label="Match (optional)"
          onChange={e => setSelectedMatch(_.find(matches, { id: e.target.value }) || {})}
        >
          <MenuItem key={0} value={0}>None</MenuItem>
          {_.map(matches, match => (
            <MenuItem key={match.id} value={match.id}>{match.name}</MenuItem>
          ))}
        </Select>
        {isFalse(matches) && <FormHelperText>No Matches Found</FormHelperText>}
      </FormControl>
      <Tooltip title="add match">
        <IconButton onClick={onClickAddMatch} aria-label="add" color="secondary">
          <AddCircleIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default MatchSelector;
