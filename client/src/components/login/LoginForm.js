import _ from 'lodash';
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
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import { AuthContext } from '../../contexts/AuthContext';
import { FlashContext } from '../../contexts/FlashContext';
import { timedDigest, hash } from '../../helpers/cryptography';

const StyledLink = styled(Link)({
  color: 'text.primary',
  textDecoration: 'none',
});

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
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remember, setRemember] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState({});
  const {localAuth, referrer} = React.useContext(AuthContext);
  const { addFlash } = React.useContext(FlashContext);
  const navigate = useNavigate();

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    const passwordHash = hash(password);
    const sessionId = timedDigest(password);
    const authData = {email, passwordHash, sessionId, remember};
    localAuth(authData).then(_res => {
      navigate(referrer, {replace: true});
    }).catch(resError => {
      console.log("🚀 ~ file: LoginForm.js ~ line 77 ~ localAuth ~ resError", resError)
      addFlash(_.get(resError, 'response.data.error', 'something went wrong'), 'error');
    }).finally(() => setLoading(false));
  };

  return (
    <Box display="flex" flexDirection="column" sx={{ width: "100%" }}>
      <form onSubmit={onSubmit}>
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
              label="Email"
              name="email"
              value={email}
              fullWidth
              onChange={e => {
                setEmail(e.target.value);
                if (!_.isNull(e.target.value) && !_.isEmpty(e.target.value.trim())) {
                  setError({ ...error, email: null });
                };
              }}
              onBlur={() => {
                if (_.isNull(email) || _.isEmpty(email.trim())) {
                  setError({ ...error, email: 'Email is required' });
                };
              }}
              error={!!error.email}
              helperText={error.email}
            />
            <TextField
              label="Password"
              name="password"
              value={password}
              type={showPassword ? "text" : "password"}
              fullWidth
              onChange={e => {
                setPassword(e.target.value);
                if (!_.isNull(e.target.value) && !_.isEmpty(e.target.value.trim())) {
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
                if (_.isNull(password) || _.isEmpty(password.trim())) {
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
            <StyledLink component={RouterLink} to="#">
              Forgot Password?
            </StyledLink>
          </Stack>

          <LoadingButton
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            loading={loading}
            onClick={onSubmit}
            disabled={loading || email.length < 1 || password.length < 1}
          >
            {loading ? 'loading...' : 'login'}
          </LoadingButton>
        </Box>
      </form>
      <Typography
        component={motion.p}
        {...fadeInUp}
        variant="body2"
        align="center"
        sx={{ mt: 3 }}
      >
        Don't have an account? <StyledLink component={RouterLink} to="/signup">Sign up</StyledLink>
      </Typography>
    </Box>
  );
};

export default LoginForm;
