import * as React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import NewLeagueForm from '../../components/league/NewLeagueForm';

const NewLeague = () => {
  const ContentStyle = styled(Paper)({
    maxWidth: 480,
    padding: 15,
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems:"center",
  });

  let easing = [0.6, -0.05, 0.01, 0.99];
  const fadeInUp = {
    initial: {
      y: 60,
      opacity: 0,
      transition: { duration: 0.6, ease: easing },
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: easing,
      },
    },
  };
  
  return (
    <ContentStyle>
      <Box component={motion.div} {...fadeInUp}>
        <Typography variant="h4" sx={{ color: "text.secondary", mb: 4 }}>
          New League
        </Typography>
      </Box>

      <NewLeagueForm />

    </ContentStyle>
  )
};

export default NewLeague;
