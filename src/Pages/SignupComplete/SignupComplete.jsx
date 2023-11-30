import React from 'react';
import './SignupComplete.scss';

const SignupComplete = () => {
  return (
    <div>
      <div className="signupcomplete">
        <div className="backButtonFrame">
          <img className="backIcon" src="/images/Back_arrow.svg"></img>
          <button className="backButton">뒤로</button>
        </div>
        <div className="completeFrame">
          <img className="completelogo" src="/images/banner_square.svg" />
          <h1 className="mainText">회원 가입되었습니다!</h1>
          <p className="subText">이제 로그인해주세요.</p>
          <button className="completeButton">확인</button>
        </div>
      </div>
    </div>
  );
};

export default SignupComplete;