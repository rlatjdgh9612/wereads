import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PostEdit.scss';

const PostEdit = () => {
  const userToken = localStorage.getItem('token');

  // 페이지 이동 하기
  const navigate = useNavigate();
  const handleCancel = () => {
    if (window.confirm('수정을 취소하시겠습니까?')) {
      window.alert('수정이 취소되었습니다.');
      navigate('/main-thread-list');
    }
  };

  return (
    <div className="postEdit">
      <div className="profileWrapper">
        <div className="profileContainer">
          <img
            className="image"
            src="/images/profileImage_01.jpg"
            alt="프로필 사진"
          />
          <span className="nickName">Name</span>
        </div>
        <div className="editInputContainer">
          <textarea
            className="editInput"
            placeholder="내용 수정하기"
          ></textarea>
        </div>
        <div className="editButtonContainer">
          <button className="editButtons cancelButton" onClick={handleCancel}>
            취소
          </button>
          <button className="editButtons actionButton">게시</button>
        </div>
      </div>
    </div>
  );
};

export default PostEdit;
