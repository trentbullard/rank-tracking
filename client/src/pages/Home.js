import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Divider, Link, Paper, Stack, Typography } from '@mui/material';
import styled from '@emotion/styled';

import { AuthContext } from '../contexts/AuthContext';
import { TitlePageLayout } from '../components/layouts';
import { icons } from '../img/icons';

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
  const imgSize = "100%";
  return (
    <StyledLink component={RouterLink} to={`/game/new?sport=${sport}`}>
      <Box display="flex" justifyContent="space-between" alignItems="center" flexDirection="column" sx={{ width: imgSize, height: imgSize }}>
        <Box component="img" src={icons()[sport]} alt={`${sport}`} sx={{ height: imgSize, width: imgSize }} />
        <Box>{sport}</Box>
      </Box>
    </StyledLink>
  );
};

const Home = () => {
  const { currentUser } = React.useContext(AuthContext);
  const name = currentUser?.first_name || currentUser?.username || currentUser?.email;
  
  return (
    <TitlePageLayout title={`${name}'s Dashboard`}>
      <Box display="flex" justifyContent="space-between" alignItems="center" flexDirection="column" sx={{ width: "100%", gap: "2rem" }}>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <StyledLink component={RouterLink} to="/leagues">LEAGUES</StyledLink>
          <StyledLink component={RouterLink} to="/teams">TEAMS</StyledLink>
          <StyledLink component={RouterLink} to="/games">GAMES</StyledLink>
        </Stack>
        <StyledNewGameList>
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ width: "100%", gap: "1rem" }}>
            {Object.keys(icons()).map((sport) => (
              <NewGameButton sport={sport} key={sport} />
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
