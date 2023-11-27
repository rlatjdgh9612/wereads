import React from 'react';
import './Login.scss';

const Login = () => {
  return (
    <div>
      <div className="login">
        <div className="userFrame">
          <div className="imageFrame">
            <img className="logo" src="/../images/Logo.svg" alt="위코드 로고" />
            <img
              className="logo"
              src="/../images/logo_wecode.svg"
              alt="위코드 로고"
            />
          </div>
          <input className="userInput" type="text" placeholder="이메일" />
          <input className="userInput" type="text" placeholder="비밀번호" />
          <button className="loginButton">로그인</button>
          <div className="buttonWrapper">
            <button className="actionButton">회원 가입</button>
            <div className="wall">|</div>
            <button className="actionButton">비밀번호 찾기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
