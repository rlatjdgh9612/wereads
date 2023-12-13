import React from 'react';
import './PostAdd.scss';

const PostAdd = () => {
  return (
    <div className="postAdd">
      <div className="profileWrapper">
        <div className="profileContainer">
          <img
            className="profileImages"
            src="/images/profileImage_01.jpg"
            alt="프로필 사진"
          />
          <span className="profileText">Name</span>
        </div>
        <div className="postInputContainer">
          <textarea className="postInput" placeholder="스레드를 시작하세요." />
        </div>
        <div className="postButtonContainer">
          <button className="postButtons cancelButton">취소</button>
          <button className="postButtons actionButton">게시</button>
        </div>
      </div>
    </div>
  );
};

export default PostAdd;
