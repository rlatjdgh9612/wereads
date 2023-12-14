import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Wrapper from './Components/Wrapper';
import Login from './Pages/Login/Login';
import SignupComplete from './Pages/SignupComplete/SignupComplete';
import Signup from './Pages/Signup/Signup';
import MainThreadList from './Pages/MainThreadList/MainThreadList';
import PostEditing from './Pages/PostEditing/PostEditing';

const Router = () => {
  return (
    <BrowserRouter>
      <Wrapper>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup-complete" element={<SignupComplete />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/main-thread-list" element={<MainThreadList />} />
          <Route path="/post-editing" element={<PostEditing />} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
};

export default Router;
