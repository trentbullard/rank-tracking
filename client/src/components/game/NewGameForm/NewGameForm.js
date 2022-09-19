import * as React from 'react';
import {
  Box,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { motion } from 'framer-motion';

import { AuthContext } from '../../../contexts/AuthContext';
import { FlashContext } from '../../../contexts/FlashContext';
import { NewGameContext } from '../../../contexts/NewGameContext';
import LeagueSelector from './LeagueSelector';
import SeasonSelector from './SeasonSelector';
import MatchSelector from './MatchSelector';
import SetSelector from './SetSelector';
import { isTrue } from '../../../helpers/boolean';

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

const GameNameInput = ({ gameName, setGameName }) => {
  return (
    <TextField
      fullWidth
      id="game-name"
      label="Name"
      value={gameName}
      onChange={e => setGameName(e.target.value)}
    />
  );
};

const NewGameForm = ({ sport }) => {
  const [name, setName] = React.useState('');
  const { currentUser } = React.useContext(AuthContext);
  const { addFlash } = React.useContext(FlashContext);
  const { selectedLeague } = React.useContext(NewGameContext);

  const onSubmit = e => {
    e.preventDefault();
    addFlash('New Game Created (sike)', 'success');
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
          <LeagueSelector currentUser={currentUser} sport={sport} />
          {isTrue(selectedLeague) && <SeasonSelector league={selectedLeague} />}
          {isTrue(selectedLeague) && <MatchSelector league={selectedLeague} />}
          {isTrue(selectedLeague) && <SetSelector league={selectedLeague} />}
          <GameNameInput gameName={name} setGameName={setName} />
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            loading={false}
            loadingPosition="start"
            startIcon={<SaveIcon />}
          >
            Save
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
};

export default NewGameForm;
