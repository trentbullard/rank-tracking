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

import api from '../../api/api';
import { AuthContext } from '../../contexts/AuthContext';
import { FlashContext } from '../../contexts/FlashContext';
import { isFalse } from '../../helpers/boolean';

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
  const [clubs, setClubs] = React.useState([]);
  const [sports, setSports] = React.useState([]);
  const [seasonOptions, setSeasonOptions] = React.useState([]);
  const [seasonName, setSeasonName] = React.useState('');
  const [clubId, setClubId] = React.useState('');
  const [clubTouched, setClubTouched] = React.useState(false);
  const [clubError, setClubError] = React.useState('');
  const [sportId, setSportId] = React.useState('');
  const [sportTouched, setSportTouched] = React.useState(false);
  const [sportError, setSportError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { currentUser } = React.useContext(AuthContext);
  const { addFlash } = React.useContext(FlashContext);
  const navigate = useNavigate();

  const validateName = React.useCallback((value) => {
    if (isFalse(value) || _.isEmpty(value.trim())) {
      return 'Name is required';
    };
    return '';
  }, []);

  const validateRequiredSelection = React.useCallback((value, label) => {
    if (_.isNil(value) || value === '' || (_.isString(value) && _.isEmpty(value.trim()))) {
      return `${label} is required`;
    };
    return '';
  }, []);

  React.useEffect(() => {
    if (isFalse(currentUser)) return;
    let mounted = true;
    Promise.all([
      api.get('/clubs', {
        params: { user_id: currentUser.id },
      }),
      api.get('/sports'),
      api.get('/seasons'),
    ]).then(([clubsRes, sportsRes, seasonsRes]) => {
      if (!mounted) return;
      const defaultSeasonOptions = ['Season 1', 'Spring', 'Summer', 'Fall', 'Winter'];
      const existingSeasonOptions = _(seasonsRes.data)
        .map('name')
        .filter((value) => _.isString(value) && !_.isEmpty(value.trim()))
        .map((value) => value.trim())
        .uniqBy((value) => _.toLower(value))
        .sortBy((value) => _.toLower(value))
        .value();
      setClubs(_.sortBy(clubsRes.data, (club) => _.toLower(club.name)));
      setSports(_.sortBy(sportsRes.data, (sport) => _.toLower(sport.name)));
      setSeasonOptions(_.uniqBy([
        ...defaultSeasonOptions,
        ...existingSeasonOptions,
      ], (value) => _.toLower(value)));
    }).catch((error) => {
      if (!mounted) return;
      addFlash(_.get(error, 'response.data.error', 'something went wrong'), 'error');
    });

    return () => {
      mounted = false;
    };
  }, [currentUser, addFlash]);

  React.useEffect(() => {
    setClubError(validateRequiredSelection(clubId, 'Club'));
  }, [clubId, validateRequiredSelection]);

  React.useEffect(() => {
    setSportError(validateRequiredSelection(sportId, 'Sport'));
  }, [sportId, validateRequiredSelection]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const nextNameError = validateName(name);
    const nextClubError = validateRequiredSelection(clubId, 'Club');
    const nextSportError = validateRequiredSelection(sportId, 'Sport');
    setNameError(nextNameError);
    setClubError(nextClubError);
    setSportError(nextSportError);
    if (
      isFalse(currentUser)
      || !_.isEmpty(nextNameError)
      || !_.isEmpty(nextClubError)
      || !_.isEmpty(nextSportError)
    ) return;

    setLoading(true);
    try {
      const payload = {
        name: name.trim(),
        format: 'elo',
        status: 'active',
        owner_id: currentUser.id,
        club_id: clubId,
        sport_id: sportId,
      };
      const res = await api.post('/leagues', payload);
      const selectedSeasonName = _.isString(seasonName) ? seasonName.trim() : '';
      if (!_.isEmpty(selectedSeasonName)) {
        await api.post('/seasons', {
          name: selectedSeasonName,
          format: 'elo',
          status: 'active',
          league_id: res.data.id,
        });
      };
      addFlash('league created', 'success');
      navigate(_.isEmpty(selectedSeasonName) ? '/leagues' : `/leagues/${res.data.id}`, { replace: true });
    } catch (error) {
      addFlash(_.get(error, 'response.data.error', 'something went wrong'), 'error');
    } finally {
      setLoading(false);
    };
  };

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
          onChange={(e) => {
            setName(e.target.value);
            if (!_.isEmpty(nameError)) {
              setNameError(validateName(e.target.value));
            };
          }}
          onBlur={() => setNameError(validateName(name))}
          error={!_.isEmpty(nameError)}
          helperText={nameError}
        />

        <FormControl
          variant="outlined"
          fullWidth
          required
          error={!!clubTouched && (_.isNil(clubId) || clubId === '')}
          disabled={isFalse(clubs)}
        >
          <InputLabel id="club-select-label">Club</InputLabel>
          <Select
            labelId="club-select-label"
            id="club-select"
            value={clubId}
            label="Club"
            onChange={(e) => setClubId(e.target.value)}
            onBlur={() => setClubTouched(true)}
          >
            {_.map(clubs, (club) => (
              <MenuItem key={club.id} value={club.id}>{club.name}</MenuItem>
            ))}
          </Select>
          {isFalse(clubs) ? <FormHelperText component="span">No clubs found. Create a club first.</FormHelperText> : null}
          {!!clubTouched && (_.isNil(clubId) || clubId === '') && <FormHelperText>{clubError}</FormHelperText>}
        </FormControl>

        <FormControl
          variant="outlined"
          fullWidth
          required
          error={!!sportTouched && (_.isNil(sportId) || sportId === '')}
          disabled={isFalse(sports)}
        >
          <InputLabel id="sport-select-label">Sport</InputLabel>
          <Select
            labelId="sport-select-label"
            id="sport-select"
            value={sportId}
            label="Sport"
            onChange={(e) => setSportId(e.target.value)}
            onBlur={() => setSportTouched(true)}
          >
            {_.map(sports, (sport) => (
              <MenuItem key={sport.id} value={sport.id}>{sport.name}</MenuItem>
            ))}
          </Select>
          {isFalse(sports) ? <FormHelperText component="span">No sports found.</FormHelperText> : null}
          {!!sportTouched && (_.isNil(sportId) || sportId === '') && <FormHelperText>{sportError}</FormHelperText>}
        </FormControl>

        <FormControl
          variant="outlined"
          fullWidth
          disabled={loading}
        >
          <InputLabel id="season-select-label">Season (Optional)</InputLabel>
          <Select
            labelId="season-select-label"
            id="season-select"
            value={seasonName}
            label="Season (Optional)"
            onChange={(e) => setSeasonName(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            {_.map(seasonOptions, (seasonOption) => (
              <MenuItem key={seasonOption} value={seasonOption}>{seasonOption}</MenuItem>
            ))}
          </Select>
          <FormHelperText>Create the league now and optionally create an initial season.</FormHelperText>
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
            disabled={
              loading
              || isFalse(currentUser)
              || !_.isEmpty(nameError)
              || !_.isEmpty(clubError)
              || !_.isEmpty(sportError)
              || _.isEmpty(name.trim())
              || _.isNil(clubId) || clubId === ''
              || _.isNil(sportId) || sportId === ''
            }
          >
            {loading ? 'Creating...' : 'Create'}
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  )
};

export default NewLeagueForm;
