import { Divider, Typography } from '@mui/material';

import FormLayout from '../components/layouts/formPage/FormLayout';
import LoginForm from '../components/login/LoginForm';
import SocialAuth from '../components/login/SocialAuth';

const Login = () => {
  return (
    <FormLayout title='login to your account'>
      <SocialAuth />
      <Divider sx={{ my: 3, width: '100%' }}>
        <Typography sx={{ color: "text.secondary" }} variant="body2">
          Or
        </Typography>
      </Divider>
      <LoginForm />
    </FormLayout>
  );
};

export default Login;
