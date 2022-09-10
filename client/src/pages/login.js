import * as React from 'react';
import { Box, Divider, Paper, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import LoginForm from '../components/login/LoginForm';
import SocialAuth from '../components/login/SocialAuth';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
  const { currentUser } = React.useContext(AuthContext);
  
  const HeadingStyle = styled(Box)({
    textAlign: "center",
  });
  
  const ContentStyle = styled(Paper)({
    maxWidth: 480,
    padding: 15,
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
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
      <HeadingStyle component={motion.div} {...fadeInUp}>
        <Typography variant="h4" sx={{ color: "text.secondary", mb: 4 }}>
          Login to Your Account
        </Typography>
      </HeadingStyle>

      <Box component={motion.div} {...fadeInUp} display="flex" justifyContent="center" alignItems="center" flexDirection="row">
        <SocialAuth />
      </Box>

      <Divider sx={{ my: 3 }} component={motion.div} {...fadeInUp}>
        <Typography sx={{ color: "text.secondary" }} variant="body2">
          Or
        </Typography>
      </Divider>

      <LoginForm currentUser={currentUser} />

    </ContentStyle>
  );
};

export default Login;
