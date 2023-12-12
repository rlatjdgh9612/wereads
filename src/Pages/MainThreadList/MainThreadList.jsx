import React, { useState, useEffect } from 'react';
import UserButton from '../../Components/UserButton';
import './MainThreadList.scss';

const MainThreadList = () => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    fetch('/data/Postlist.json', {
      method: 'GET',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('네트워크 응답이 올바르지 않습니다');
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data.data)) {
          // 데이터를 createdAt 기준으로 최신 순으로 정렬
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
  }, []);

  return (
    <div className="mainthread">
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
          </div>
          <div className="postContentFrame">
            <p className="contentTexts">{post.content}</p>
            <p className="commentTexts">{post.comments}</p>
          </div>
        </div>
      ))}
      <div className="footer">
        <div className="actionButtonFrame">
          <UserButton text="글 쓰기" />
        </div>
      </div>
    </div>
  );
};

export default MainThreadList;
