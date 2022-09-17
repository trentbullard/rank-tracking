import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { motion } from 'framer-motion';

import { AuthContext } from '../../contexts/AuthContext';
import { timedDigest, encrypt } from '../../helpers/cryptography';

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

const NewGameForm = ({ sport }) => {
  const [league, setLeague] = React.useState('');
  const { currentUser } = React.useContext(AuthContext);
  const [leagues, setLeagues] = React.useState([]);
  const data = encrypt(JSON.stringify({
    currentUser,
    sport,
  }));
  
  React.useEffect(() => {
    api.get(`/leagues`, {
      headers: {
        'Authorization': `Bearer ${timedDigest(`GET/api/leagues`)}`,
      },
      params: {data},
    }).then(res => {
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    });
  }, []);
  
  const onSubmit = e => {
    e.preventDefault();
    console.log('submit');
  };

  const onClickAddLeague = e => {
    e.preventDefault();
    console.log('add league');
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
          <Box display="flex" gap={1}>
            <FormControl fullWidth>
              <InputLabel id="league-select-label">League</InputLabel>
              <Select
                labelId="league-select-label"
                id="league-select"
                value={league}
                label="League"
                onChange={e => setLeague(e.target.value)}
              >
                {_.map(leagues, league => (
                  <MenuItem key={league.id} value={league.id}>{league.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Tooltip title="add league" placement="top">
              <IconButton onClick={onClickAddLeague} aria-label="add" component="span" color="secondary">
                <AddCircleIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default NewGameForm;
