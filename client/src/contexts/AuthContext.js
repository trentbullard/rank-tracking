import * as React from 'react';
import Cookies from 'js-cookie';

const cookieName = 'multiRankToken';

export const AuthContext = React.createContext({
  currentUser: null,
  setCurrentUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [session, setSession] = React.useState(Cookies.get(cookieName));
  const [currentUser, setCurrentUser] = React.useState(session);
  const [referrer, setReferrer] = React.useState("/");

  const logout = () => {
    Cookies.remove(cookieName);
    setCurrentUser(null);
    setReferrer("/");
  };

  const state = {
    currentUser,
    setCurrentUser: user => {
      setCurrentUser(user.username);
      if (user.remember) {
        Cookies.set(cookieName, user.username, { expires: 365 });
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
