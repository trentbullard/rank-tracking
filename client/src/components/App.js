import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './header/Header';
import Home from '../pages/Home';
import Login from '../pages/Login';


const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
