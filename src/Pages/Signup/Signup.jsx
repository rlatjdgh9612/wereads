import React, { useState } from 'react';
import UserInput from '../../Components/UserInput';
import UserButton from '../../Components/UserButton';
import './Signup.scss';

const Signup = () => {
  const [imageName, setImageName] = useState('');
  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      setImageName(file.name);
    }
  };

  return (
    <>
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
          <UserInput className="signupInput" type="text" placeholder="이메일" />
          <UserInput
            className="signupInput"
            type="password"
            placeholder="비밀번호"
          />
          <UserInput
            className="signupInput"
            type="password"
            placeholder="비밀번호 확인"
          />
          <div className="etcUserFrame">
            <div className="nicknameTextFrame">
              <p className="nicknameText">닉네임</p>
              <p className="selectText">선택 사항</p>
            </div>
            <input className="nicknameInput" type="text" placeholder="닉네임" />
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
              <UserButton className="signupButton" text="회원 가입" />
            </div>
          </div>
        </div>
      </div>
    </>
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
