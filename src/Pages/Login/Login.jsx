import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInput from '../../Components/UserInput';
import UserButton from '../../Components/UserButton';
import './Login.scss';

const Login = () => {
  // 유저 정보(ID, PW)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // 이메일(ID)
  const userID = event => {
    setEmail(event.target.value);
  };
  // 비밀번호
  const userPW = event => {
    setPassword(event.target.value);
  };
  // 유효성 검사
  const isInvaild =
    email.includes('@') && email.includes('.') && password.length >= 10;

  return (
    <div className="login">
      <div className="userFrame">
        <div className="imageFrame">
          <img className="logo" src="/images/Logo.svg" alt="위코드 로고" />
          <img
            className="logo"
            src="/images/logo_wecode.svg"
            alt="위코드 로고"
          />
        </div>
        <UserInput type="text" placeholder="이메일" onChange={userID} />
        <UserInput type="password" placeholder="비밀번호" onChange={userPW} />
        <UserButton
          className="loginButton"
          text="로그인"
          // disabled={!isInvaild}
        />
        <div className="buttonWrapper">
          <button className="actionButton">회원 가입</button>
          <div className="wall">|</div>
          <button className="actionButton">비밀번호 찾기</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
