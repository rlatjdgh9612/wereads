import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PostAdd.scss';

const PostAdd = ({ placeholder }) => {
  // 유저 토큰, 닉네임, 프로필 이미지
  const userToken = localStorage.getItem('token');
  const nickName = localStorage.getItem('nickname');
  const profileImage = localStorage.getItem('profileImage');

  // 페이지 이동 하기
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate('/main-thread-list');
  };

  const handlePost = () => {
    fetch('http://10.58.52.215:8000/writePost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('네트워크 응답이 올바르지 않습니다');
        }
        return response.json();
      })
      .then(data => {
        if (data.message === 'UPLOAD SUCCESS') {
          alert('등록이 완료되었습니다.');
          navigate('/main-thread-list');
        } else {
          alert('등록에 실패했습니다. 다시 시도해주세요.');
        }
      });
  };

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
          <textarea
            className="postInput"
            placeholder={placeholder || '스레드를 시작하세요.'}
          />
        </div>
        <div className="postButtonContainer">
          <button className="postButtons cancelButton" onClick={handleCancel}>
            취소
          </button>
          <button className="postButtons actionButton" onClick={handlePost}>
            게시
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostAdd;
