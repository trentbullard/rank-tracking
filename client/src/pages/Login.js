import { Divider, Typography } from '@mui/material';

import FormLayout from '../components/layouts/formPage/FormLayout';
import LoginForm from '../components/login/LoginForm';
import SocialAuth from '../components/login/SocialAuth';
import { getConfigValue } from '../config/runtimeConfig';

const Login = () => {
  const hasGoogleAuth = Boolean(getConfigValue('GOOGLE_CLIENT_ID'));

  return (
    <FormLayout title='login to your account'>
      {hasGoogleAuth ? <SocialAuth /> : null}
      {hasGoogleAuth ? (
        <Divider sx={{ my: 3, width: '100%' }}>
          <Typography sx={{ color: "text.secondary" }} variant="body2">
            Or
          </Typography>
        </Divider>
      ) : null}
      <LoginForm />
    </FormLayout>
  );
};

export default Login;
