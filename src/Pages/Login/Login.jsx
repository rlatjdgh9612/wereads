import React from 'react';
import UserInput from '../../Components/UserInput';
import UserButton from '../../Components/UserButton';
import './Login.scss';

const Login = () => {
  return (
    <>
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
          <UserInput type="text" placeholder="이메일" />
          <UserInput type="password" placeholder="비밀번호" />
          <UserButton text="로그인" />
          <div className="buttonWrapper">
            <button className="actionButton">회원 가입</button>
            <div className="wall">|</div>
            <button className="actionButton">비밀번호 찾기</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
