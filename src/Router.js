import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Wrapper from './Components/Wrapper';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import MainThreadList from './Pages/MainThreadList/MainThreadList';

const Router = () => {
  return (
    <BrowserRouter>
      <Wrapper>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/main-thread-list" element={<MainThreadList />} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
};

export default Router;
