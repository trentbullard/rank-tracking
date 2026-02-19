import * as React from 'react';
import api from '../api/api';
import { setAccessToken } from '../api/api';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [isAuthReady, setIsAuthReady] = React.useState(false);
  const [referrer, setReferrer] = React.useState("/");

  React.useEffect(() => {
    let isCancelled = false;

    api.post('/auth/refresh')
      .then(res => {
        if (isCancelled) return;
        const token = res?.data?.accessToken || null;
        const user = res?.data?.user || null;
        setAccessToken(token);
        setCurrentUser(user);
      })
      .catch(() => {
        if (isCancelled) return;
        setAccessToken(null);
        setCurrentUser(null);
      })
      .finally(() => {
        if (!isCancelled) {
          setIsAuthReady(true);
        };
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  const localAuth = (authData) => {
    return api.post('/auth/login', authData).then(res => {
      setAccessToken(res?.data?.accessToken || null);
      setCurrentUser(res?.data?.user || null);
      return res?.data?.user || null;
    });
  };

  const signup = (authData) => {
    return api.post('/auth/signup', authData).then(res => {
      setAccessToken(res?.data?.accessToken || null);
      setCurrentUser(res?.data?.user || null);
      return res?.data?.user || null;
    });
  };

  const googleAuth = (credential, remember = true) => {
    return api.post('/auth/oauth/google', { credential, remember }).then(res => {
      setAccessToken(res?.data?.accessToken || null);
      setCurrentUser(res?.data?.user || null);
      return res?.data?.user || null;
    });
  };
  
  const logout = () => {
    return api.post('/auth/logout')
      .finally(() => {
        setAccessToken(null);
        setCurrentUser(null);
        setReferrer("/");
      });
  };

  const state = {
    currentUser,
    isAuthReady,
    referrer,
    logout,
    localAuth,
    signup,
    googleAuth,
  }
  
  return (
    <AuthContext.Provider value={state}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
