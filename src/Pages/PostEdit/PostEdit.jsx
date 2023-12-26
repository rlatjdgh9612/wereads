import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './PostEdit.scss';

const PostEdit = () => {
  // 수정할 포스트 저장
  const [editContent, setEditContent] = useState('');
  // 유저 정보
  const userToken = localStorage.getItem('token');
  const nickName = localStorage.getItem('nickname');
  const profileImage = localStorage.getItem('profileImage');
  // postId 가져오기
  const { id: postId } = useParams();

  // 해당 postId의 포스트 데이터 가져오기
  useEffect(() => {
    fetch(`/data/Postlist.json?id=${postId}`, {
      method: 'GET',
      Authorization: `Bearer ${userToken}`,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('네트워크 응답이 올바르지 않습니다');
        }
        return response.json();
      })
      .then(data => {
        // 가져온 데이터에서 해당 postId의 내용을 가져와서 수정창에 표시
        if (data) {
          setEditContent(data.content);
        } else {
          throw new Error('포스트를 찾을 수 없습니다');
        }
      })
      .catch(error => {
        alert('포스트 데이터를 불러오던 중 오류가 발생했습니다.');
      });
  }, [postId, userToken]);

  // 페이지 이동 하기 : 취소
  const navigate = useNavigate();
  const handleCancel = () => {
    if (window.confirm('수정을 취소하시겠습니까?')) {
      window.alert('수정이 취소되었습니다.');
      navigate('/main-thread-list');
    }
  };

  // 포스트 수정 로직
  const handleEdit = postId => {
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
          postId: postId,
        }),
      })
        .then(response => {
          if (!response.ok) {
            if (response.status === 403) {
              throw new Error(
                '권한이 없습니다. 본인이 작성한 포스트만 수정할 수 있습니다.',
              );
            } else if (response.status === 404) {
              throw new Error(
                'CONTENT_NOT_FOUND: 해당 스레드를 찾을 수 없습니다.',
              );
            } else {
              throw new Error('네트워크 응답이 올바르지 않습니다');
            }
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
          if (error.message.includes('권한이 없습니다')) {
            alert(error.message);
          } else if (error.message.includes('CONTENT_NOT_FOUND')) {
            alert(error.message);
          } else {
            alert(`오류가 발생했습니다: ${error.message}`);
          }
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
            onChange={e => setEditContent(e.target.value)}
          />
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
