import React from 'react';
import './Signup.scss';

const Signup = () => {
  return (
    <div>
      <div className="signup">
        <div className="signupInputFrame">
          <div className="backButtonFrame">
            <img className="backIcon" src="/../images/Back_arrow.svg" />
            <button className="backButton">뒤로</button>
          </div>
          <h1 className="titleText">회원가입</h1>
          <div className="infoTextFrame">
            <p className="infoText">기본 정보</p>
            <p className="requiredText">필수 사항</p>
          </div>
          <input className="signupInput" type="text" placeholder="이메일" />
          <input className="signupInput" type="text" placeholder="비밀번호" />
          <input
            className="signupInput"
            type="text"
            placeholder="비밀번호 확인"
          />
          <div className="etcUserFrame">
            <div className="nicknameTextFrame">
              <p className="nicknameText">닉네임</p>
              <p className="selectText">선택 사항</p>
            </div>
            <input className="nicknameInput" type="text" placeholder="닉네임" />
            <div className="fileFrame">
              <button className="fileButton">파일 선택</button>
              <input className="fileInput" placeholder="파일을 선택해 주세요" />
            </div>
            <div className="phonenumberFrame">
              <div className="phonenumberTextFrame">
                <p className="phonenumberText">전화번호</p>
                <p className="selectText">선택 사항</p>
              </div>
              <div className="phoneSelectFrame">
                <select className="phoneSelectBox">
                  <option>010</option>
                </select>
                <input
                  className="phonenumberInput"
                  type="text"
                  placeholder="휴대폰 번호를 입력해주세요"
                ></input>
              </div>
            </div>
            <div className="birthdayFrame">
              <div className="birthdayTextFrame">
                <p className="birthdayText">생일</p>
                <p className="selectText">선택 사항</p>
              </div>
              <div className="birthdaySelectFrame">
                <select className="yearSelectBox">
                  <option>1990년</option>
                </select>
                <select className="monthSelectBox">
                  <option>1월</option>
                </select>
                <select className="daySelectBox">
                  <option>1일</option>
                </select>
              </div>
            </div>
            <div className="signupButtonFrame">
              <button className="signupButton">회원 가입</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
