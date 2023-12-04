import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserButton from '../../Components/UserButton';
import './SignupComplete.scss';

const SignupComplete = () => {
  const moveNavigate = useNavigate();
  // 확인 버튼 (로그인 페이지 이동)
  const goToLogin = () => {
    moveNavigate('/');
  };
  // 뒤로 버튼 (회원가입 페이지 이동)
  const goToSignup = () => {
    moveNavigate('/signup');
  };
  return (
    <div className="signupcomplete">
      <div className="backButtonFrame">
        <img
          className="backIcon"
          src="/images/Back_arrow.svg"
          alt="뒤로 버튼"
        />
        <button className="backButton" onClick={goToSignup}>
          뒤로
        </button>
      </div>
      <div className="completeFrame">
        <img
          className="completelogo"
          src="/images/banner_square.svg"
          alt="완료 로고"
        />
        <h1 className="mainText">회원 가입되었습니다!</h1>
        <p className="subText">이제 로그인해주세요.</p>
        <UserButton className="userButton" text="확인" onClick={goToLogin} />
      </div>
    </div>
  );
};

export default SignupComplete;
