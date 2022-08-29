import * as React from 'react';
import { Box, Container, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import NewLeagueForm from '../../components/league/NewLeagueForm';

const NewLeague = () => {
  const RootStyle = styled("div")({
    background: "rgb(249, 250, 251)",
  });
  
  const HeadingStyle = styled(Box)({
    textAlign: "center",
  });
  
  const ContentStyle = styled("div")({
    maxWidth: 480,
    padding: 25,
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    background: "#fff",
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
    <RootStyle>
      <Container maxWidth="sm">
        <ContentStyle>
          <HeadingStyle component={motion.div} {...fadeInUp}>
            <Typography variant="h4" sx={{ color: "text.secondary", mb: 4 }}>
              New League
            </Typography>
          </HeadingStyle>

          <NewLeagueForm />

        </ContentStyle>
      </Container>
    </RootStyle>
  )
};

export default NewLeague;
