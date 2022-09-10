import _ from 'lodash';
import * as React from 'react';
import GoogleLogin from 'react-google-login';
import { Stack, IconButton } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

import { AuthContext } from '../../contexts/AuthContext';
import { FlashContext } from '../../contexts/FlashContext';
import { isTrue } from '../../helpers/boolean';

const SocialAuth = () => {
  const { socialAuth } = React.useContext(AuthContext);
  const { addFlash } = React.useContext(FlashContext);
  const iconHeight = '1.75em';

  const responseGoogle = response => {
    const user = _.get(response, 'profileObj', null);
    if (isTrue(user)) {
      socialAuth({...user, socialId: user.googleId});
    } else {
      addFlash('error', 'Google login failed');
    };
  };
  
  return (
    <Stack spacing={2} direction="row">
      <GoogleLogin
        clientId="955609240865-lss719dqtftho8gjb0v8u36p9tcb1r0k.apps.googleusercontent.com"
        render={renderProps => (
          <IconButton onClick={renderProps.onClick} disabled={renderProps.disabled} variant="outlined" sx={{ flex: 1 }}>
            <GoogleIcon sx={{ color: "#DF3E30", fontSize: iconHeight }} />
          </IconButton>
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
      <IconButton variant="outlined" sx={{ flex: 1 }}>
        <FacebookIcon sx={{ color: "#1877F2", fontSize: iconHeight }} />
      </IconButton>
      <IconButton variant="outlined" sx={{ flex: 1 }} >
        <TwitterIcon sx={{ color: "#1C9CEA", fontSize: iconHeight }} />
      </IconButton>
    </Stack>
  );
};

export default SocialAuth;
