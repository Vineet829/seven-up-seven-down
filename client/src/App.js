import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Home from './Home';
import Game from './Game';
import Login from './Login';
import Register from './Register';
import PrivateRoute from './PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

const App = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <Container>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={
          <PrivateRoute token={token}>
            <Game />
          </PrivateRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Container>
  );
};

export default App;
