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

const SetSelector = ({ league }) => {
  const leagueId = league.id;
  const { addFlash } = React.useContext(FlashContext);
  const {
    selectedSeason,
    selectedMatch,
    sets,
    setSets,
    selectedSet,
    setSelectedSet,
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
    if (isTrue(selectedMatch)) {
      params.collection_type = 'matches';
      params.collection_id = selectedSeason.id;
    };
    api.get(`/sets`, {
      headers: {
        'Authorization': `Bearer ${timedDigest(`GET/api/sets`)}`,
      },
      params,
    }).then(res => {
      setSets(res.data);
    }).catch(error => {
      addFlash(_.get(error, 'response.data.error', 'something went wrong'), 'error');
    });
  }, [leagueId, selectedSeason, selectedMatch, setSets, addFlash]);

  const onClickAddSet = e => {
    e.preventDefault();
    addFlash('not implemented yet', 'info');
  };
  
  return (
    <Box display="flex" alignItems="flex-start" gap={1}>
      <FormControl
        fullWidth
        disabled={isFalse(sets)}
      >
        <InputLabel id="set-select-label">Set (optional)</InputLabel>
        <Select
          labelId="set-select-label"
          id="set-select"
          value={isTrue(selectedSet) ? selectedSet.id : ''}
          label="Set (optional)"
          onChange={e => setSelectedSet(_.find(sets, { id: e.target.value }) || {})}
        >
          <MenuItem key={0} value={0}>None</MenuItem>
          {_.map(sets, set => (
            <MenuItem key={set.id} value={set.id}>{set.name}</MenuItem>
          ))}
        </Select>
        {isFalse(sets) && <FormHelperText>No Sets Found</FormHelperText>}
      </FormControl>
      <Tooltip title="add set">
        <IconButton onClick={onClickAddSet} aria-label="add" color="secondary">
          <AddCircleIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default SetSelector;
