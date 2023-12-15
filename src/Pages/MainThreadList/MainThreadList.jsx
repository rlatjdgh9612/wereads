import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserButton from '../../Components/UserButton';
import './MainThreadList.scss';

const MainThreadList = () => {
  // 포스트 리스트 관리
  const [postList, setPostList] = useState([]);
  // 유저 토큰 가져오기
  const userToken = localStorage.getItem('token');
  // 포스트 작성 페이지 이동
  const navigate = useNavigate();
  const handlePostAdd = (profileImage, nickname) => {
    localStorage.setItem('profileImage', profileImage);
    localStorage.setItem('nickname', nickname);
    navigate('/post-add');
  };
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
          const sortedPosts = data.data.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          setPostList(sortedPosts);
        } else {
          console.error('데이터가 배열이 아닙니다');
        }
      })
      .catch(error => {
        console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
      });
  }, [userToken]);

  // 삭제 권한 에러 로직 : 로그인을 안했을 경우
  const handleDelete = postId => {
    if (postId === 3) {
      const postToDelete = postList.find(post => post.postId === postId);

      if (!postToDelete) {
        console.error('로그인 후 삭제할 수 있습니다.');
        return;
      }

      if (postToDelete.nickname !== localStorage.getItem('nickname')) {
        console.error('해당 게시물을 삭제할 권한이 없습니다.');
        return;
      }
    } else {
      console.error('삭제할 수 없는 게시물 입니다.');
    }
  };

  // 수정 권한 에러 로직 : 로그인을 안했을 경우
  const handleEdit = postId => {
    if (postId === 3) {
      const postToEdit = postList.find(post => post.postId === postId);
      if (!postToEdit) {
        console.error('로그인 후 수정할 수 있습니다.');
        return;
      }
      if (postToEdit.nickname !== localStorage.getItem('nickname')) {
        console.error('해당 게시물을 수정할 권한이 없습니다.');
        return;
      }
      navigate(`/post-editing/${postId}`);
    } else {
      console.error('수정할 수 없는 게시물 입니다.');
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
              {post.postId === 3 && (
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
              <p className="commentTexts">{post.comments}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="footer">
        <div className="actionButtonFrame">
          <UserButton
            text="글 쓰기"
            onClick={() =>
              handlePostAdd(
                postList.find(post => post.postId === 3)?.profileImage,
                postList.find(post => post.postId === 3)?.nickname,
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default MainThreadList;
