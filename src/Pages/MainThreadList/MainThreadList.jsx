import React from 'react';
import UserButton from '../../Components/UserButton';
import './MainThreadList.scss';

const MainThreadList = () => {
  return (
    <div className="mainthread">
      <div className="postListFrame">
        <div className="postList">
          <img
            className="profileImages"
            src="/images/profileImage_01.jpg"
            alt="프로필 사진"
          />
          <span className="profileNameTexts">Name</span>
          <span className="dateTexts">00.00.00</span>
        </div>
        <div className="postContentFrame">
          <p className="contentTexts">
            일라이자 효과는 인간의 사고 과정과 감정을 AI 시스템에 잘못 돌리는
            사람들의 경향을 말하며, 따라서 시스템이 실제보다 더 지능적이라고
            믿는다. 이 현상은 1966년 MIT 교수 조셉 웨이젠바움이 만든 챗봇인
            ELIZA의 이름을 따서 명명되었다.
          </p>
          <p className="commentTexts">댓글 00</p>
        </div>
      </div>

      <div className="footer">
        <UserButton text="글 쓰기" />
      </div>
    </div>
  );
};

export default MainThreadList;
