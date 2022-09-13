import * as React from 'react';
import Cookies from 'js-cookie';
import api from '../api/api';
import { timedDigest, encrypt } from '../helpers/cryptography';
import { isFalse, isTrue } from '../helpers/boolean';

const cookieName = 'MultiRankToken';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = React.useState(Cookies.get(cookieName));
  const [currentUser, setCurrentUser] = React.useState(null);
  const [referrer, setReferrer] = React.useState("/");
  
  if (isFalse(currentUser) && isTrue(session)) {
    const data = encrypt(session);
    api.get('/auth/session', {
      headers: {
        'Authorization': `Bearer ${timedDigest(`GET/auth/session`)}`,
      },
      params: {data},
    })
    .then(res => {setCurrentUser(res.data);})
    .catch(error => setSession(null));
  };

  React.useEffect(() => {
    if (isFalse(session)) {
      Cookies.remove(cookieName);
    } else {
      Cookies.set(cookieName, session, { expires: 7, SameSite: 'Strict' });
    };
  }, [session]);

  const localAuth = authData => {
    const data = encrypt(JSON.stringify(authData));
    const result = api.get('/auth', {
      headers: {
        'Authorization': `Bearer ${timedDigest(`GET/auth`)}`,
      },
      params: {data},
    }).then(res => {
      setCurrentUser(res.data);
      setSession(authData.sessionId);
      return res.data;
    });
    return result;
  };

  const socialAuth = user => {
    const serializedUser = {
      email: user.email,
      first_name: user.givenName,
      last_name: user.familyName,
      avatar_url: user.imageUrl,
      username: user.name,
      session_id: timedDigest(user.socialId),
    };
    const data = encrypt(JSON.stringify(serializedUser));
    api.post('/auth/social', {params: {data}}, {
      headers: {
        'Authorization': `Bearer ${timedDigest(`POST/auth/social`)}`,
      },
    }).then(res => {
      setCurrentUser(res.data);
      setSession(serializedUser.session_id);
    }).catch(error => console.log(error));
  };

  const signup = authData => {
    const data = encrypt(JSON.stringify(authData));
    const result = api.post('/auth/signup', {params: {data}}, {
      headers: {
        'Authorization': `Bearer ${timedDigest(`POST/auth/signup`)}`,
      },
    }).then(res => {
      setCurrentUser(res.data);
      setSession(authData.sessionId);
      return res.data;
    });
    return result;
  };
  
  const logout = () => {
    setSession(null);
    setCurrentUser(null);
    setReferrer("/");
  };

  const state = {
    currentUser,
    session,
    referrer,
    logout,
    localAuth,
    socialAuth,
    signup,
  }
  
  return (
    <AuthContext.Provider value={state}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
