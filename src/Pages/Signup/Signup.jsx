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
    passwordConfirm: '',
    nickname: '',
  });
  // 이미지 업로드 input
  const handleFileChange = event => {
    event.stopPropagation();
    const file = event.target.files[0];
    if (file) {
      setImageName(file.name);
    }
  };

  // 이메일, 비밀번호, 비밀번호 확인
  const handleInputChange = event => {
    const { name, value } = event.target;
    setUserInfo(userInfo => ({
      ...userInfo,
      [name]: value,
    }));
  };
  // isVaild 변수 업데이트
  const isVaild =
    userInfo.email &&
    userInfo.password.length >= 10 &&
    userInfo.password === userInfo.passwordConfirm;
  // 로그인 페이지 이동
  const moveNavigate = useNavigate();
  const goToLogin = () => {
    moveNavigate('/');
  };
  // 회원가입 로직
  const processSignUp = () => {
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
          moveNavigate('/signup-complete');
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
      <div className="registrationFrame" onChange={handleInputChange}>
        <div className="backButtonFrame">
          <img
            className="backIcon"
            src="/images/Back_arrow.svg"
            alt="뒤로버튼"
          />
          <button className="backButton" onClick={goToLogin}>
            뒤로
          </button>
        </div>
        <h1 className="titleText">회원가입</h1>
        <div className="infoTextFrame">
          <p className="userinfoText">기본 정보</p>
          <p className="infoOptionalText">필수 사항</p>
        </div>
        <div className="userInputFrame">
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
          <UserInput
            type="password"
            placeholder="비밀번호 확인"
            value={userInfo.passwordConfirm}
            name="passwordConfirm"
          />
        </div>
        <div className="etcUserFrame">
          <div className="infoTextFrame">
            <p className="userinfoText">닉네임</p>
            <p className="infoOptionalText">선택 사항</p>
          </div>
          <input
            className="nicknameInput"
            type="text"
            placeholder="닉네임"
            value={userInfo.nickname}
            name="nickname"
          />
          <div className="fileInputFrame">
            <label className="fileButton">
              <span className="selectFileText">파일 선택</span>
              <input
                className="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
            <input
              className="fileDisplay"
              placeholder="파일을 선택해 주세요"
              value={imageName}
              readOnly
            />
          </div>
          <div className="numberFrame">
            <div className="infoTextFrame">
              <p className="userinfoText">전화번호</p>
              <p className="infoOptionalText">선택 사항</p>
            </div>
            <div className="numberSelectFrame">
              <select className="numberBox">
                {PHONENUMBER_LIST.map((number, index) => (
                  <option key={index}>{number}</option>
                ))}
              </select>
              <input
                className="numberInput"
                type="text"
                placeholder="휴대폰 번호를 입력해주세요"
              />
            </div>
          </div>
          <div className="birthdayFrame">
            <div className="infoTextFrame">
              <p className="userinfoText">생일</p>
              <p className="infoOptionalText">선택 사항</p>
            </div>
            <div className="birthdaySelectFrame">
              <select className="birthdayBox yearBox">
                {BIRTHDAY_YEAR_LIST.map((year, index) => (
                  <option key={index}>{year}</option>
                ))}
              </select>
              <select className="birthdayBox monthBox">
                {BIRTHDAY_MONTH_LIST.map((month, index) => (
                  <option key={index}>{month}</option>
                ))}
              </select>
              <select className="birthdayBox dayBox">
                {BIRTHDAY_DAY_LIST.map((day, index) => (
                  <option key={index}>{day}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="signupButtonFrame">
            <UserButton
              disabled={!isVaild}
              onClick={processSignUp}
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
