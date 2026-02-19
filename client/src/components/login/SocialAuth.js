import _ from 'lodash';
import * as React from 'react';
import { GoogleLogin } from '@react-oauth/google';

import { AuthContext } from '../../contexts/AuthContext';
import { FlashContext } from '../../contexts/FlashContext';
import { getConfigValue } from '../../config/runtimeConfig';

const SocialAuth = () => {
  const { googleAuth } = React.useContext(AuthContext);
  const { addFlash } = React.useContext(FlashContext);
  const googleClientId = getConfigValue('GOOGLE_CLIENT_ID');

  if (!googleClientId) {
    return null;
  };

  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        const credential = credentialResponse?.credential;
        if (!credential) {
          addFlash('google login failed', 'error');
          return;
        };
        googleAuth(credential).catch((resError) => {
          addFlash(_.get(resError, 'response.data.error', 'something went wrong'), 'error');
        });
      }}
      onError={() => addFlash('google login failed', 'error')}
    />
  );
};

export default SocialAuth;
