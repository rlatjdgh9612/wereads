import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserButton from '../../Components/UserButton';
import './MainThreadList.scss';

const MainThreadList = () => {
  // 포스트 리스트 관리
  const [postList, setPostList] = useState([]);
  // 유저 토큰 가져오기
  const userToken = localStorage.getItem('token');
  // 페이지 이동
  const navigate = useNavigate();

  // 포스트 데이터
  useEffect(() => {
    fetchPostData();
  }, [userToken]);

  // 포스트 데이터 가져오는 함수
  const fetchPostData = () => {
    fetch('/data/Postlist.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
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
        console.error(
          '데이터를 불러오는 중 오류가 발생했습니다:',
          error.message,
        );
        alert(error.message);
      });
  };

  // 로그인 후 이용가능 함수
  const checkAuth = () => {
    const userToken = localStorage.getItem('token');
    if (!userToken) {
      alert('로그인 후 이용할 수 있습니다.');
      return false;
    }
    return true;
  };

  // 로그인 후 포스트 작성 이용가능 함수
  const redirectToLoginPage = () => {
    const loginConfirmed = window.confirm(
      '로그인이 필요합니다. 로그인 하시겠습니까?',
    );
    if (loginConfirmed) {
      navigate('/');
    }
  };

  // 삭제 권한 로직 (삭제 버튼)
  const handleDelete = postId => {
    if (!checkAuth()) {
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
          postId: postId,
        }),
      })
        .then(response => {
          if (!response.ok) {
            if (response.status === 404) {
              throw new Error('포스트 삭제 과정에서 문제가 발생했습니다.');
            } else {
              throw new Error('포스트 삭제에 실패했습니다.');
            }
            return;
          }
          // 포스트가 성공적으로 삭제되면 새로운 리스트 받아오기 함수 실행
          fetchPostData();
        })
        .catch(error => {
          console.error('포스트 삭제 오류:', error.message);
          alert(error.message);
        });
    }
  };

  // 좋아요 로직
  const handlelike = postId => {
    if (!checkAuth()) {
      return;
    }
    fetch('/data/Postlike.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        postId: postId,
      }),
    })
      .then(response => {
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('포스트 좋아요 처리 중 문제가 발생했습니다.');
          } else {
            throw new Error('서버 요청 오류');
          }
        }
        return response.json();
      })
      .then(data => {
        // 서버에서 받은 정보로 상태 업데이트
        fetchPostData();
        updateLike();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  // 서버 응답 이후에 상태를 업데이트하는 부분 수정
  const updateLike = (postId, isLiked) => {
    const updatedPostList = postList.map(post => {
      if (post.postId === postId) {
        return {
          ...post,
          isLiked: isLiked,
        };
      }
      return post;
    });
    setPostList(updatedPostList);
  };

  // 수정 권한 로직 (수정 버튼)
  const handleEdit = postId => {
    if (!checkAuth()) {
    } else {
      navigate(`/post-edit/${postId}`);
    }
  };

  // 포스트 작성 페이지 이동
  const handlePostAdd = () => {
    if (!checkAuth()) {
      redirectToLoginPage();
    } else {
      navigate('/post-add');
    }
  };

  // 댓글 페이지 이동
  const handleComment = postId => {
    if (!checkAuth()) {
    } else {
      navigate(`/comment/${postId}`);
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
                    onClick={() => handleDelete(post.postId)}
                  >
                    삭제
                  </button>
                  <button
                    className="actionButtons editButton"
                    onClick={() => handleEdit(post.postId)}
                  >
                    수정
                  </button>
                </div>
              )}
            </div>
            <div className="postContentFrame">
              <p className="contentTexts">{post.content}</p>
              <div className="likeCommentFrame">
                <p className="likeTexts">좋아요 {post.likeCount}</p>
                <p
                  className="commentTexts"
                  onClick={() => handleComment(post.postId)}
                >
                  {post.comments}
                </p>
              </div>
              <img
                className="likeHearts"
                onClick={() => handlelike(post.postId, post.isLiked)}
                src={
                  post.isLiked ? '/images/likeHeart.svg' : '/images/heart.svg'
                }
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
