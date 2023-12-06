import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Wrapper from './Components/Wrapper';
import Login from './Pages/Login/Login';
import SignupComplete from './Pages/SignupComplete/SignupComplete';
import Signup from './Pages/Signup/Signup';

const Router = () => {
  return (
    <BrowserRouter>
      <Wrapper>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup-complete" element={<SignupComplete />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
};

export default Router;
