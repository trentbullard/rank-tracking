import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './header/Header';
import Home from '../pages/Home';
import Login from '../pages/Login';
import { AuthContext } from '../contexts/AuthContext';

const App = () => {
  const { currentUser } = React.useContext(AuthContext);
  
  return (
    <BrowserRouter>
      <Header currentUser={currentUser} />
      <Routes>
        <Route path="/" element={<Home currentUser={currentUser} />} />
        <Route path="/login" element={<Login currentUser={currentUser} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
