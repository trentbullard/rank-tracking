import * as React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Checkbox,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
  FormControlLabel,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { motion } from 'framer-motion';
import { AuthContext } from '../contexts/AuthContext';

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

const LoginForm = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remember, setRemember] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [ error, setError ] = React.useState({});
  const { setCurrentUser } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setCurrentUser({ username, remember });
    navigate("/", { replace: true });
  };

  return (
    <Box display="flex" flexDirection="column">
      <Box
        component={motion.div}
        animate={{
          transition: {
            staggerChildren: 0.55,
          },
        }}
      >
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
          <TextField
            label="Username"
            name="username"
            value={username}
            fullWidth
            onChange={event => {
              setUsername(event.target.value);
              if (!!event.target.value && event.target.value.length > 0) {
                setError({ ...error, username: null });
              };
            }}
            onBlur={() => {
              if (!username || username.length < 1) {
                setError({ ...error, username: 'Username is required' });
              };
            }}
            error={!!error.username}
            helperText={error.username}
          />
          <TextField
            label="Password"
            name="password"
            value={password}
            type={showPassword ? "text" : "password"}
            fullWidth
            onChange={event => {
              setPassword(event.target.value);
              if (!!event.target.value || event.target.value.length > 0) {
                setError({ ...error, password: null });
              };
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onBlur={() => {
              if (!password || password.length < 1) {
                setError({ ...error, password: 'Password is required' });
              };
            }}
            error={!!error.password}
            helperText={error.password}
          />
        </Box>
      </Box>

      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={animate}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={remember}
                onChange={event => setRemember(event.target.checked)}
              />
            }
            label="Remember Me"
          />
          <Link component={RouterLink} to="#">
            Forgot Password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          variant="contained"
          loading={loading}
          onClick={onSubmit}
        >
          {loading ? 'Loading...' : 'Login'}
        </LoadingButton>
      </Box>
      <Typography
        component={motion.p}
        {...fadeInUp}
        variant="body2"
        align="center"
        sx={{ mt: 3 }}
      >
        Don't have an account? <Link component={RouterLink} to="#">Sign up</Link>
      </Typography>
    </Box>
  );
};

export default LoginForm;
