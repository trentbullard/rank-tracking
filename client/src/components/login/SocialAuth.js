import _ from 'lodash';
import * as React from 'react';
import GoogleLogin from 'react-google-login';

import { AuthContext } from '../../contexts/AuthContext';
import { FlashContext } from '../../contexts/FlashContext';
import { isTrue } from '../../helpers/boolean';

const SocialAuth = () => {
  const { socialAuth } = React.useContext(AuthContext);
  const { addFlash } = React.useContext(FlashContext);

  const responseGoogle = response => {
    if (isTrue(response.error)) {
      addFlash('something went wrong', 'error');
      return;
    };
    const user = _.get(response, 'profileObj', null);
    if (isTrue(user)) {
      socialAuth({...user, socialId: user.googleId});
    } else {
      addFlash('google login failed', 'error');
    };
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
      theme="dark"
      autoLoad={false}
    />
  );
};

export default SocialAuth;
