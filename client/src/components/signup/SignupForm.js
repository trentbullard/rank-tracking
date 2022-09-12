import _ from 'lodash';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { motion } from 'framer-motion';

import { AuthContext } from '../../contexts/AuthContext';
import { FlashContext } from '../../contexts/FlashContext';
import { timedDigest, hash } from '../../helpers/cryptography';
import { isTrue, isFalse } from '../../helpers/boolean';

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

const SignupForm = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');
  const [error, setError] = React.useState({});
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { signup, referrer } = React.useContext(AuthContext);
  const { addFlash } = React.useContext(FlashContext);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const passwordHash = hash(password);
    const sessionId = timedDigest(password);
    const authData = { email, passwordHash, sessionId };
    signup(authData).then(_res => {
      navigate(referrer, {replace: true});
    }).catch(resError => {
      console.log("🚀 ~ file: SignupForm.js ~ line 51 ~ signup ~ resError", resError)
      addFlash(_.get(resError, 'response.data.error', 'something went wrong'), 'error');
    }).finally(() => setLoading(false));
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
          <TextField
            label="email"
            name="email"
            value={email}
            fullWidth
            error={isTrue(error.email)}
            helperText={error.email}
            onChange={e => setEmail(e.target.value)}
            onBlur={e => {
              if (isFalse(email.trim())) {
                setError({ ...error, email: 'Email cant be blank' });
              } else {
                const tempError = { ...error };
                delete tempError.email;
                setError(tempError);
              };
            }}
          />
          <TextField
            label="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            fullWidth
            error={isTrue(error.password)}
            helperText={error.password}
            onChange={e => setPassword(e.target.value)}
            onBlur={e => {
              if (isFalse(password.trim())) {
                setError({ ...error, password: 'Password cant be blank' });
              } else {
                const tempError = { ...error };
                delete tempError.password;
                setError(tempError);
              };
              if (password !== passwordConfirm) {
                setError({ ...error, password: 'Passwords do not match' });
              } else {
                const tempError = { ...error };
                delete tempError.password;
                delete tempError.passwordConfirm;
                setError(tempError);
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
          />
          <TextField
            label="confirm password"
            name="passwordConfirm"
            type={showPassword ? 'text' : 'password'}
            value={passwordConfirm}
            fullWidth
            error={isTrue(error.passwordConfirm)}
            helperText={error.passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
            onBlur={e => {
              if (isFalse(passwordConfirm.trim())) {
                setError({ ...error, passwordConfirm: 'Password cant be blank' });
              } else {
                const tempError = { ...error };
                delete tempError.passwordConfirm;
                setError(tempError);
              };
              if (password !== passwordConfirm) {
                setError({ ...error, passwordConfirm: 'Passwords do not match' });
              } else {
                const tempError = { ...error };
                delete tempError.passwordConfirm;
                delete tempError.password;
                setError(tempError);
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
          />
          <LoadingButton
            type="submit"
            variant="contained"
            loading={loading}
            size="large"
            fullWidth
            onClick={onSubmit}
            disabled={isTrue(error)}
          >
            {loading ? 'loading' : 'submit'}
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
};

export default SignupForm;
