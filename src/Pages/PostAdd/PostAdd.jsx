import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostAdd.scss';

const PostAdd = () => {
  // 포스트 작성(저장)
  const [postContent, setPostContent] = useState('');
  // 유저 토큰, 닉네임, 프로필 이미지
  const userToken = localStorage.getItem('token');
  const nickName = localStorage.getItem('nickname');
  const profileImage = localStorage.getItem('profileImage');

  // 페이지 이동 하기
  const navigate = useNavigate();
  // 유저 토큰 여부에 따라 접근 가능
  useEffect(() => {
    if (!userToken) {
      navigate('/'); // 토큰이 없으면 로그인 페이지로 이동
    }
  }, [navigate, userToken]);

  // 포스트 취소
  const handleCancel = () => {
    if (window.confirm('포스트 작성을 취소하시겠습니까?')) {
      window.alert('작성이 취소되었습니다.');
      navigate('/main-thread-list');
    }
  };

  // 작성한 포스트 등록하기
  const handlePost = () => {
    if (!postContent.trim()) {
      alert('포스트를 작성해주세요.');
      return;
    }

    const postConfirmed = window.confirm('포스트를 등록하시겠습니까?');
    if (postConfirmed) {
      fetch('/data/Create.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          content: postContent,
        }),
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
    }
  };

  return (
    <div className="postAdd">
      <div className="profileWrapper">
        <div className="profileContainer">
          <img className="profileImages" src={profileImage} alt="프로필 사진" />
          <span className="profileText">{nickName}</span>
        </div>
        <div className="postInputContainer">
          <textarea
            className="postInput"
            placeholder="스레드를 시작하세요."
            value={postContent}
            onChange={event => setPostContent(event.target.value)}
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
