import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './header/header';
import Home from '../pages/home/home';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
