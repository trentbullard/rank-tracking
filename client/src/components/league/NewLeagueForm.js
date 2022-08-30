import _ from 'lodash';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { motion } from 'framer-motion';

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

const NewLeagueForm = () => {
  const [name, setName] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  const [sport, setSport] = React.useState('');
  const [sportTouched, setSportTouched] = React.useState(false);
  const [sportError, setSportError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (_.isNull(sport) || _.isEmpty(sport.trim())) {
      setSportError('Sport is required');
    } else {
      setSportError('');
    };
  }, [sport]);

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    // send data to server and await response
    let id = 1; // get id from server response
    navigate(`/leagues/${id}`, { replace: true });
  };

  const sports = [
    { value: 'football', label: 'Football' },
    { value: 'basketball', label: 'Basketball' },
    { value: 'baseball', label: 'Baseball' },
    { value: 'hockey', label: 'Hockey' },
    { value: 'soccer', label: 'Soccer' },
    { value: 'tennis', label: 'Tennis' },
    { value: 'volleyball', label: 'Volleyball' },
    { value: 'foosball', label: 'Foosball' },
    { value: 'tableTennis', label: 'Table Tennis' },
    { value: 'badminton', label: 'Badminton' },
    { value: 'cornhole', label: 'Cornhole' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <Box component="form" onSubmit={onSubmit} width="100%">
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 40 }}
        animate={animate}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <TextField
          label="Name"
          name="name"
          value={name}
          required
          fullWidth
          onChange={e => {
            setName(e.target.value)
            if (!_.isNull(e.target.value) || !_.isEmpty(e.target.value.trim())) {
              setNameError('');
            };
          }}
          onBlur={() => {
            if (_.isNull(name) || _.isEmpty(name.trim())) {
              setNameError('Name is required');
            };
          }}
          error={!_.isEmpty(nameError)}
          helperText={nameError}
        />

        <FormControl variant="outlined" fullWidth required error={!!sportTouched && _.isEmpty(sport)}>
          <InputLabel id="sport-select-label">Sport</InputLabel>
          <Select
            labelId="sport-select-label"
            id="sport-select"
            value={sport}
            label="Sport"
            onChange={e => setSport(e.target.value)}
            onBlur={() => setSportTouched(true)}
          >
            {_.sortBy(sports, 'label').map(sport => (
              <MenuItem key={sport.value} value={sport.value}>{sport.label}</MenuItem>
            ))}
          </Select>
          {!!sportTouched && _.isEmpty(sport) && <FormHelperText>{sportError}</FormHelperText>}
        </FormControl>

        <Box display="flex" justifyContent="space-between">
          <Button
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          
          <LoadingButton
            type="submit"
            size="large"
            variant="contained"
            loading={loading}
            onClick={()=>{}}
            disabled={!_.isEmpty(nameError) || !_.isEmpty(sportError) || _.isEmpty(name) || _.isEmpty(sport)}
          >
            {loading ? 'Loading...' : 'Create'}
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  )
};

export default NewLeagueForm;
