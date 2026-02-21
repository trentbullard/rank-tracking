import _ from 'lodash';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Divider, Link, Paper, Stack, Typography } from '@mui/material';
import styled from '@emotion/styled';

import api from '../api/api';
import { AuthContext } from '../contexts/AuthContext';
import { FlashContext } from '../contexts/FlashContext';
import { TitlePageLayout } from '../components/layouts';
import { icons } from '../img/icons';

const NEW_GAME_BUTTON_SIZE = 88;
const NEW_GAME_ICON_SIZE = 56;

const StyledLink = styled(Link)({
  color: 'text.primary',
  textDecoration: 'none',
});

const StyledNewGameList = styled(Paper)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'column',
  width: '100%',
  gap: '1rem',
  padding: '1rem',
});

const NewGameButton = ({sport}) => {
  return (
    <StyledLink
      component={RouterLink}
      to={`/games/new?sport=${sport}`}
      sx={{ width: `${NEW_GAME_BUTTON_SIZE}px` }}
    >
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        sx={{ width: '100%', gap: 0.5 }}
      >
        <Box
          component="img"
          src={icons()[sport]}
          alt={`${sport}`}
          sx={{ width: `${NEW_GAME_ICON_SIZE}px`, height: `${NEW_GAME_ICON_SIZE}px`, objectFit: 'contain' }}
        />
        <Typography
          variant="subtitle2"
          sx={{ textTransform: 'uppercase', fontWeight: 'light', fontSize: 'xx-small', textAlign: 'center' }}
        >
          {sport}
        </Typography>
      </Box>
    </StyledLink>
  );
};

const Home = () => {
  const [sports, setSports] = React.useState([]);
  const { currentUser } = React.useContext(AuthContext);
  const { addFlash } = React.useContext(FlashContext);
  const name = currentUser?.first_name || currentUser?.username || currentUser?.email;

  React.useEffect(() => {
    api.get(`/sports`).then(res => {
      setSports(res.data);
    }).catch(error => {
      addFlash(_.get(error, 'response.data.error', 'something went wrong'), 'error');
    });
  }, [addFlash]);
  
  return (
    <TitlePageLayout title={`${name}'s Dashboard`}>
      <Box display="flex" justifyContent="space-between" alignItems="center" flexDirection="column" sx={{ width: "100%", gap: "2rem" }}>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <StyledLink component={RouterLink} to="/clubs">CLUBS</StyledLink>
          <StyledLink component={RouterLink} to="/leagues">LEAGUES</StyledLink>
          <StyledLink component={RouterLink} to="/teams">TEAMS</StyledLink>
          <StyledLink component={RouterLink} to="/games">GAMES</StyledLink>
        </Stack>
        <StyledNewGameList>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="flex-end"
            sx={{ width: '100%', gap: '1rem', flexWrap: 'wrap' }}
          >
            {_.map(sports, sport => (
              <NewGameButton sport={sport.name} key={sport.name} />
            ))}
          </Box>
          <Typography variant="body2">
            Select a sport to start a new game
          </Typography>
        </StyledNewGameList>
      </Box>
    </TitlePageLayout>
  );
};

export default Home;
