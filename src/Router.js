import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login';
import SignupComplete from './Pages/SignupComplete/SignupComplete';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signupcomplete" element={<SignupComplete />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
