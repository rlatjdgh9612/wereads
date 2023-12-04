import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInput from '../../Components/UserInput';
import UserButton from '../../Components/UserButton';
import './Signup.scss';

const Signup = () => {
  // 이미지 업로드
  const [imageName, setImageName] = useState('');
  // 유저 정보(필수 사항)
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    passwordConfir: '',
    nickname: '',
  });
  // 이메일
  const userEmail = event => {
    setUserInfo({ ...userInfo, email: event.target.value });
  };
  // 비밀번호
  const userPassword = event => {
    setUserInfo({ ...userInfo, password: event.target.value });
  };
  // 비밀번호 확인
  const userPasswordConfir = event => {
    setUserInfo({ ...userInfo, passwordConfir: event.target.value });
  };
  // 닉네임
  const userNickName = event => {
    setUserInfo({ ...userInfo, nickname: event.target.value });
  };

  // 이메일, 비밀번호, 비밀번호 확인 유효성 검사
  const isVaild =
    userInfo.email.includes('@') &&
    userInfo.email.includes('.') &&
    userInfo.password.length >= 10 &&
    userInfo.password === userInfo.passwordConfir;

  // 이미지 업로드 input
  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      setImageName(file.name);
    }
  };
  // 로그인 페이지 이동
  const moveNavigate = useNavigate();
  const goToLogin = () => {
    moveNavigate('/');
  };
  // 회원가입 완료 페이지 이동
  const goToComplete = () => {
    fetch('/data/Signup.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        email: userInfo.email,
        password: userInfo.password,
        nickname: userInfo.nickname,
      }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('서버 응답이 올바르지 않습니다.');
      })
      .then(data => {
        if (data.message === 'SIGNUP SUCCESS') {
          moveNavigate('/signupcomplete');
        } else {
          alert('회원가입에 실패했습니다. 다시 시도해주세요.');
        }
      })
      .catch(error => {
        alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
      });
  };

  return (
    <div className="signup">
      <div className="signupInputFrame">
        <div className="backButtonFrame">
          <img
            className="backIcon"
            src="/../images/Back_arrow.svg"
            alt="뒤로버튼"
          />
          <button className="backButton" onClick={goToLogin}>
            뒤로
          </button>
        </div>
        <h1 className="titleText">회원가입</h1>
        <div className="infoTextFrame">
          <p className="infoText">기본 정보</p>
          <p className="requiredText">필수 사항</p>
        </div>
        <UserInput
          className="signupInput"
          type="text"
          placeholder="이메일"
          onChange={userEmail}
        />
        <UserInput
          className="signupInput"
          type="password"
          placeholder="비밀번호"
          onChange={userPassword}
        />
        <UserInput
          className="signupInput"
          type="password"
          placeholder="비밀번호 확인"
          onChange={userPasswordConfir}
        />
        <div className="etcUserFrame">
          <div className="nicknameTextFrame">
            <p className="nicknameText">닉네임</p>
            <p className="selectText">선택 사항</p>
          </div>
          <input
            className="nicknameInput"
            type="text"
            placeholder="닉네임"
            onChange={userNickName}
          />
          <div className="fileFrame">
            <label htmlFor="fileInput" className="fileButton">
              <span className="fileButtonText">파일 선택</span>
              <input
                id="fileInput"
                className="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </label>
            <input
              className="fileInput"
              placeholder="파일을 선택해 주세요"
              value={imageName}
              readOnly
            />
          </div>
          <div className="phonenumberFrame">
            <div className="phonenumberTextFrame">
              <p className="phonenumberText">전화번호</p>
              <p className="selectText">선택 사항</p>
            </div>
            <div className="phoneSelectFrame">
              <select className="phoneSelectBox">
                {PHONENUMBER_LIST.map((number, index) => (
                  <option key={index}>{number}</option>
                ))}
              </select>
              <input
                className="phonenumberInput"
                type="text"
                placeholder="휴대폰 번호를 입력해주세요"
              />
            </div>
          </div>
          <div className="birthdayFrame">
            <div className="birthdayTextFrame">
              <p className="birthdayText">생일</p>
              <p className="selectText">선택 사항</p>
            </div>
            <div className="birthdaySelectFrame">
              <select className="yearSelectBox">
                {BIRTHDAY_YEAR_LIST.map((year, index) => (
                  <option key={index}>{year}</option>
                ))}
              </select>
              <select className="monthSelectBox">
                {BIRTHDAY_MONTH_LIST.map((month, index) => (
                  <option key={index}>{month}</option>
                ))}
              </select>
              <select className="daySelectBox">
                {BIRTHDAY_DAY_LIST.map((day, index) => (
                  <option key={index}>{day}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="signupButtonFrame">
            <UserButton
              className="signupButton"
              disabled={!isVaild}
              onClick={goToComplete}
              text="회원 가입"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

// 생일 데이터 : 년,월,일
const BIRTHDAY_YEAR_LIST = Array.from(
  { length: 15 },
  (_, i) => `${i + 1990}년`,
);
const BIRTHDAY_MONTH_LIST = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);
const BIRTHDAY_DAY_LIST = Array.from({ length: 31 }, (_, i) => `${i + 1}일`);
// 휴대폰 데이터 : (010)
const PHONENUMBER_LIST = ['010', '011', '016', '018', '019'];
