import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Divider, Link, Paper, Stack, Typography } from '@mui/material';
import styled from '@emotion/styled';

import { AuthContext } from '../contexts/AuthContext';
import { TitlePageLayout } from '../components/layouts';
import { icons } from '../img/icons';

const Home = () => {
  const { currentUser } = React.useContext(AuthContext);
  const name = currentUser?.first_name || currentUser?.username || currentUser?.email;
  const imgSize = "100%";

  const StyledLink = styled(Link)({
    color: 'text.primary',
    textDecoration: 'none',
  });
  
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
        <Box
          component={Paper}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexDirection="column"
          sx={{
            width: "100%",
            gap: "1rem",
            padding: "1rem",
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ width: "100%", gap: "1rem" }}>
            <RouterLink to="/game/new?sport=foosball">
              <Box component="img" src={icons().foosball} alt="foosball" sx={{ height: imgSize, width: imgSize }} />
            </RouterLink>
            <RouterLink to="/game/new?sport=cornhole">
              <Box component="img" src={icons().cornhole} alt="cornhole" sx={{ height: imgSize, width: imgSize }} />
            </RouterLink>
            <RouterLink to="/game/new?sport=tabletennis">
              <Box component="img" src={icons().tabletennis} alt="tabletennis" sx={{ height: imgSize, width: imgSize }} />
            </RouterLink>
            <RouterLink to="/game/new?sport=soccer">
              <Box component="img" src={icons().soccer} alt="soccer" sx={{ height: imgSize, width: imgSize }} />
            </RouterLink>
          </Box>
          <Typography variant="body2">
            Select a sport to start a new game
          </Typography>
        </Box>
      </Box>
    </TitlePageLayout>
  );
};

export default Home;
