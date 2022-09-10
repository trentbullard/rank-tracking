import _ from 'lodash';
import * as React from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
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

  const responseFacebook = response => {
    if (isTrue(response)) {
      const [givenName, familyName] = _.get(response, 'name', '').split(' ');
      const serializedUser = {
        email: response.email,
        givenName,
        familyName,
        imageUrl: response.picture.data.url,
        name: response.name,
        socialId: response.id,
      };
      socialAuth(serializedUser);
    } else {
      addFlash('error', 'Facebook login failed');
    };
  };
  
  return (
    <Stack spacing={2} direction="row">
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
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
      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
        fields="name,email,picture"
        callback={responseFacebook}
        render={renderProps => (
          <IconButton onClick={renderProps.onClick} variant="outlined" sx={{ flex: 1 }}>
            <FacebookIcon sx={{ color: "#1877F2", fontSize: iconHeight }} />
          </IconButton>
        )}
      />
      <IconButton variant="outlined" sx={{ flex: 1 }} >
        <TwitterIcon sx={{ color: "#1C9CEA", fontSize: iconHeight }} />
      </IconButton>
    </Stack>
  );
};

export default SocialAuth;
