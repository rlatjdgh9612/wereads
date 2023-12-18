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

  // 포스트 삭제시 데이터 가져오는 함수
  const fetchPostData = () => {
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
        alert('포스트가 삭제되었습니다.');
      })
      .catch(error => {
        console.error('포스트 삭제 오류:', error.message);
        alert(error.message);
      });
  };

  // 삭제 권한 로직 (삭제 버튼)
  const handleDelete = postId => {
    const userToken = localStorage.getItem('token');
    if (!userToken) {
      alert('로그인 후 삭제할 수 있습니다.');
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
              throw new Error('CONTENT_NOT_FOUND 에러가 발생했습니다.');
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
  let isLiked = false;
  const handlelike = postId => {
    const userToken = localStorage.getItem('token');
    if (!userToken) {
      alert('로그인 후 좋아요를 누를 수 있습니다.');
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
        isLiked: isLiked ? 0 : 1, // isLiked 값에 따라 반대로 전환해서 전송
      }),
    })
      .then(response => {
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('CONTENT_NOT_FOUND 애러가 발생했습니다.');
          } else {
            throw new Error('서버 요청 오류');
          }
        }
        return response.json();
      })
      .then(() => {
        isLiked = !isLiked; // 좋아요 상태를 반전시킴
        const currentImage = document.querySelector('.likeHearts').src;
        if (currentImage.includes('/images/heart.svg')) {
          // 이미지가 하트면 빈 하트로 변경
          document.querySelector('.likeHearts').src = '/images/likeHeart.svg';
        } else {
          // 이미지가 빈 하트면 하트로 변경
          document.querySelector('.likeHearts').src = '/images/heart.svg';
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  // 수정 권한 로직 (수정 버튼)
  const handleEdit = () => {
    const userToken = localStorage.getItem('token');
    if (!userToken) {
      alert('로그인 후 수정할 수 있습니다.');
      return;
    } else {
      navigate('/post-edit');
    }
  };

  // 포스트 작성 페이지 이동
  const handlePostAdd = () => {
    const userToken = localStorage.getItem('token');
    if (!userToken) {
      // 토큰이 없으면 로그인 페이지로 이동
      const loginConfirmed = window.confirm(
        '로그인이 필요합니다. 로그인 하시겠습니까?',
      );
      if (loginConfirmed) {
        navigate('/');
      }
    } else {
      navigate('/post-add');
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
                    onClick={handleDelete}
                  >
                    삭제
                  </button>
                  <button
                    className="actionButtons editButton"
                    onClick={handleEdit}
                  >
                    수정
                  </button>
                </div>
              )}
            </div>
            <div className="postContentFrame">
              <p className="contentTexts">{post.content}</p>
              <div className="likeCommentFrame">
                <p className="likeTexts">좋아요 {post.likedPost}</p>
                <p className="commentTexts">{post.comments}</p>
              </div>
              <img
                className="likeHearts"
                onClick={handlelike}
                src={isLiked ? '/images/likeHeart.svg' : '/images/heart.svg'}
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
