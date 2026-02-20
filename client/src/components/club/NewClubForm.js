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

import api from '../../api/api';
import { AuthContext } from '../../contexts/AuthContext';
import { FlashContext } from '../../contexts/FlashContext';
import { isFalse } from '../../helpers/boolean';

const visibilityOptions = [
  { value: 'private', label: 'Private' },
  { value: 'unlisted', label: 'Unlisted' },
  { value: 'public', label: 'Public' },
];

const NewClubForm = () => {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [visibility, setVisibility] = React.useState('private');
  const [nameError, setNameError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const { currentUser } = React.useContext(AuthContext);
  const { addFlash } = React.useContext(FlashContext);

  const validateName = React.useCallback((value) => {
    if (isFalse(value) || _.isEmpty(value.trim())) {
      return 'Name is required';
    };
    return '';
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const nextNameError = validateName(name);
    setNameError(nextNameError);
    if (isFalse(currentUser) || !_.isEmpty(nextNameError)) return;

    setLoading(true);
    try {
      const payload = {
        name: name.trim(),
        visibility,
        description: _.isEmpty(description.trim()) ? null : description.trim(),
        owner_id: currentUser.id,
      };
      const res = await api.post('/clubs', payload);
      addFlash('club created', 'success');
      navigate(`/clubs/${res.data.id}`, { replace: true });
    } catch (error) {
      addFlash(_.get(error, 'response.data.error', 'something went wrong'), 'error');
    } finally {
      setLoading(false);
    };
  };

  return (
    <Box component="form" onSubmit={onSubmit} width="100%">
      <Box
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

        <FormControl variant="outlined" fullWidth>
          <InputLabel id="club-visibility-select-label">Visibility</InputLabel>
          <Select
            labelId="club-visibility-select-label"
            id="club-visibility-select"
            value={visibility}
            label="Visibility"
            onChange={(e) => setVisibility(e.target.value)}
          >
            {_.map(visibilityOptions, (option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Who can discover this club.</FormHelperText>
        </FormControl>

        <TextField
          label="Description"
          name="description"
          value={description}
          fullWidth
          multiline
          minRows={3}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Box display="flex" justifyContent="space-between">
          <Button onClick={() => navigate(-1)}>
            Cancel
          </Button>

          <LoadingButton
            type="submit"
            size="large"
            variant="contained"
            loading={loading}
            disabled={loading || isFalse(currentUser)}
          >
            {loading ? 'Creating...' : 'Create'}
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
};

export default NewClubForm;
