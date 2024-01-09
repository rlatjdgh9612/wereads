import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInput from '../../Components/UserInput';
import UserButton from '../../Components/UserButton';
import './Login.scss';

const Login = () => {
  // 유저 정보(ID, PW)
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  // 이메일, 비밀번호
  const handleInputChange = event => {
    const { name, value } = event.target;
    setUserInfo(userInfo => ({
      ...userInfo,
      [name]: value,
    }));
  };
  // 유효성 검사
  const isVaild =
    userInfo.email.includes('@') &&
    userInfo.email.includes('.') &&
    userInfo.password.length >= 6;
  // 페이지 이동
  const navigate = useNavigate();
  // 회원가입 페이지 이동
  const goSignupPage = () => {
    navigate('/signup');
  };
  // fetch : 로그인 버튼 클릭시 메인 페이지로 이동
  const handleLogin = () => {
    fetch('/data/Login.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        email: userInfo.email,
        password: userInfo.password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'LOGIN SUCCESS') {
          alert('로그인 되었습니다.');
          localStorage.setItem('token', data.token);
          navigate('/main');
        } else {
          alert('가입되지 않은 정보입니다.');
        }
      });
  };

  return (
    <div className="login">
      <div className="userFrame" onChange={handleInputChange}>
        <div className="imageFrame">
          <img className="logo" src="/images/Logo.svg" alt="위코드 로고" />
          <img
            className="logo"
            src="/images/logo_wecode.svg"
            alt="위코드 로고"
          />
        </div>
        <UserInput
          type="text"
          placeholder="이메일"
          value={userInfo.email}
          name="email"
        />
        <UserInput
          type="password"
          placeholder="비밀번호"
          value={userInfo.password}
          name="password"
        />
        <UserButton text="로그인" disabled={!isVaild} onClick={handleLogin} />
        <div className="buttonWrapper">
          <button className="actionButton" onClick={goSignupPage}>
            회원 가입
          </button>
          <div className="wall">|</div>
          <button className="actionButton findPassword">비밀번호 찾기</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
