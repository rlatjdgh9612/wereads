import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserButton from '../../Components/UserButton';
import './MainThreadList.scss';

const MainThreadList = () => {
  // 포스트 리스트 관리
  const [postList, setPostList] = useState([]);
  // 좋아요 상태 관리
  const [likedPost, setLikedPost] = useState([]);
  // 유저 토큰 가져오기
  const userToken = localStorage.getItem('token');
  // 포스트 데이터
  useEffect(() => {
    fetch('/data/Postlist.json', {
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
        if (Array.isArray(data.data)) {
          const sortedPosts = data.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
          );
          setPostList(sortedPosts);
        } else {
          console.error('데이터가 배열이 아닙니다');
        }
      })
      .catch(error => {
        console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
      });
  }, [userToken]);

  // 삭제 권한 로직 (삭제 버튼)
  const handleDelete = (isUser, postId) => {
    const postToDelete = postList.find(post => post.isUser === isUser);
    if (!postToDelete) {
      console.error('로그인 후 삭제할 수 있습니다.');
      return;
    }

    const deleteConfirmed = window.confirm('포스트를 삭제하시겠습니까?');
    if (deleteConfirmed) {
      fetch(`/data/Delete.json`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          postId: 1,
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('포스트 삭제에 실패했습니다.');
          }
          // 삭제 후에는 화면에서 해당 포스트를 제거하거나 상태 업데이트
          setPostList(prevPosts =>
            prevPosts.filter(post => post.postId !== postId),
          );
          alert('포스트가 삭제되었습니다.');
        })
        .catch(error => {
          console.error('포스트 삭제 오류:', error);
          alert('포스트 삭제에 실패했습니다.');
        });
    }
  };

  // 수정 권한 로직 (수정 버튼)
  const handleEdit = isUser => {
    const postToEdit = postList.find(post => post.isUser === isUser);
    if (!postToEdit) {
      console.error('로그인 후 수정할 수 있습니다.');
      return;
    }
    navigate('/post-edit', { state: { isUser: true } });
  };

  // 좋아요 관리 로직
  const handleLike = (isUser, postId) => {
    if (!userToken) {
      console.error('로그인 후 좋아요를 누를 수 있습니다.');
      return;
    }
    const alreadyLiked = likedPost.includes(postId);
    const method = alreadyLiked ? 'DELETE' : 'POST';

    fetch('/data/Postlike.json', {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        postId: 1,
      }),
    })
      .then(response => {
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('CONTENT_NOT_FOUND');
          } else {
            throw new Error('서버 요청 오류');
          }
        }
        return response.json();
      })
      .then(() => {
        // 좋아요 상태 업데이트
        if (alreadyLiked) {
          setLikedPost(prevLikedPost =>
            prevLikedPost.filter(id => id !== postId),
          );
        } else {
          setLikedPost(prevLikedPost => [...prevLikedPost, postId]);
        }
      })
      .catch(error => {
        console.error('좋아요 요청 오류:', error.message);
        if (error.message === 'CONTENT_NOT_FOUND') {
          alert('존재하지 않는 쓰레드입니다.');
        } else {
          alert('서버 요청 오류가 발생했습니다.');
        }
      });
  };

  // 포스트 작성 페이지 이동
  const navigate = useNavigate();
  const handlePostAdd = () => {
    // 토큰이 있으면 포스트 작성 페이지로 이동
    if (userToken) {
      navigate('/post-add'); //
    } else {
      // 토큰이 없으면 로그인 페이지로 이동
      const loginConfirmed = window.confirm(
        '로그인이 필요합니다. 로그인 하시겠습니까?',
      );
      if (loginConfirmed) {
        navigate('/');
      }
    }
  };

  return (
    <div className="mainthread">
      <div className="scrollWrapper">
        {postList.map((post, index) => (
          <div className="postListFrame" key={index}>
            <div className="postList">
              <img
                className="profileImages"
                src={post.profileImage}
                alt="프로필 사진"
              />
              <span className="profileNameTexts">{post.nickname}</span>
              <span className="dateTexts">{post.createdAt}</span>
              {post.isUser && (
                <div>
                  <button
                    className="actionButtons deleteButton"
                    onClick={() => handleDelete(post.isUser)}
                  >
                    삭제
                  </button>
                  <button
                    className="actionButtons editButton"
                    onClick={() => handleEdit(post.isUser)}
                  >
                    수정
                  </button>
                </div>
              )}
            </div>
            <div className="postContentFrame">
              <p className="contentTexts">{post.content}</p>
              <div className="likeCommentFrame">
                <p className="likeTexts">좋아요 0</p>
                <p className="commentTexts">{post.comments}</p>
              </div>
              <img
                className="likeHearts"
                src="/images/heart.svg"
                alt="좋아요"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="footer">
        <div className="actionButtonFrame">
          <UserButton text="글 쓰기" onClick={handlePostAdd} />
        </div>
      </div>
    </div>
  );
};

export default MainThreadList;
