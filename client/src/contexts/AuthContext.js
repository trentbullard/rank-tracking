import * as React from 'react';
import Cookies from 'js-cookie';
import api from '../api/api';
import { digest, encrypt } from '../helpers/cryptography';

const cookieName = 'multiRankToken';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = React.useState(Cookies.get(cookieName));
  const [currentUser, setCurrentUser] = React.useState(null);
  const [referrer, setReferrer] = React.useState("/");

  if (!currentUser && session) {
    const data = encrypt(session);
    api.get('/auth/session', {
      headers: {
        'Authorization': `Bearer ${digest(`GET/auth/session`)}`,
      },
      params: {data},
    }).then(({data}) => {
      setCurrentUser(data);
    }).catch(error => console.log(error));
  };
  
  const logout = () => {
    Cookies.remove(cookieName);
    setSession(null);
    setCurrentUser(null);
    setReferrer("/");
  };

  const state = {
    currentUser,
    setCurrentUser: user => {
      setCurrentUser(user);
      if (user.remember) {
        Cookies.set(cookieName, user.sessionId, { expires: 365 });
      } else {
        Cookies.remove(cookieName);
      }
    },
    session,
    setSession,
    referrer,
    setReferrer,
    logout,
  }
  
  return (
    <AuthContext.Provider value={state}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
