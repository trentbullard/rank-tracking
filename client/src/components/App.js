import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Container from '@mui/material/Container';

import Header from './header/header';
import Footer from './footer/footer';
import Home from '../pages/home/home';

const App = () => {
  return (
    <Container maxWidth="sm">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Container>
  )
}

export default App;
