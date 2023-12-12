import React from 'react';
import './PostAdd.scss';

const PostAdd = () => {
  return (
    <div className="postAdd">
      <div className="profileContainer">
        <img
          className="profileImages"
          src="/images/profileImage_01.jpg"
          alt="프로필 사진"
        />
        <span className="profileText">Name</span>
      </div>
      <div className="postInputContainer">
        <input
          className="postInput"
          type="text"
          placeholder="스레드를 입력해주세요"
        ></input>
      </div>
      <div className="postButtonContainer">
        <button className="postButtons">취소</button>
        <button className="postButtons">게시</button>
      </div>
    </div>
  );
};

export default PostAdd;
