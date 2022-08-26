import * as React from 'react';
import { Box, Container, TextField } from '@mui/material';

const LoginForm = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  // const [error, setError] = React.useState('');

  const onSubmit = async event => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    // const ciphertext = encryptData({ username, password });
    return null;
  };

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
    <Container maxWidth="sm">
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1em',
        }}
      >
        <TextField label="Username" name="username" value={username} fullWidth onChange={event => setUsername(event.target.value)} />
        <TextField label="Password" name="password" value={password} type="password" fullWidth onChange={event => setPassword(event.target.value)} />
      </Box>
    </Container>
  );
};

export default LoginForm;
