import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostEdit.scss';

const PostEdit = () => {
  // 수정할 포스트 저장
  const [editContent, setEditContent] = useState('');
  const userToken = localStorage.getItem('token');
  const nickName = localStorage.getItem('nickname');
  const profileImage = localStorage.getItem('profileImage');

  // 페이지 이동 하기 : 취소
  const navigate = useNavigate();
  const handleCancel = () => {
    if (window.confirm('수정을 취소하시겠습니까?')) {
      window.alert('수정이 취소되었습니다.');
      navigate('/main-thread-list');
    }
  };

  // 포스트 수정 로직
  const handleEdit = () => {
    if (!editContent.trim()) {
      alert('수정할 내용을 입력해주세요.');
      return;
    }

    const editConfirmed = window.confirm('게시글을 수정하시겠습니까?');
    if (editConfirmed) {
      fetch('/data/Update.json', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          content: editContent,
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('네트워크 응답이 올바르지 않습니다');
          }
          return response.json();
        })
        .then(data => {
          if (data.message === 'EDIT SUCCESS') {
            alert('수정이 완료되었습니다.');
            navigate('/main-thread-list');
          } else {
            alert('수정에 실패했습니다. 다시 시도해주세요.');
          }
        })
        .catch(error => {
          alert(`오류가 발생했습니다: ${error.message}`);
        });
    }
  };

  return (
    <div className="postEdit">
      <div className="profileWrapper">
        <div className="profileContainer">
          <img className="image" src={profileImage} alt="프로필 사진" />
          <span className="nickName">{nickName}</span>
        </div>
        <div className="editInputContainer">
          <textarea
            className="editInput"
            placeholder="내용 수정하기"
            value={editContent}
            onChange={event => setEditContent(event.target.value)}
          ></textarea>
        </div>
        <div className="editButtonContainer">
          <button className="editButtons cancelButton" onClick={handleCancel}>
            취소
          </button>
          <button className="editButtons actionButton" onClick={handleEdit}>
            게시
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostEdit;
