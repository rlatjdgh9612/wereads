import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Comment.scss';
import UserInput from '../../Components/UserInput';

const Comment = () => {
  // 댓글 리스트 관리
  const [commentList, setCommentList] = useState([]);
  // 유저 토큰
  const userToken = localStorage.getItem('token');
  // 유저 프로필, 닉네임
  const nickName = localStorage.getItem('nickname');
  const profileImage = localStorage.getItem('profileImage');
  // postId 가져오기
  const { id: postId } = useParams();
  // 페이지 이동
  const navigate = useNavigate();

  // 댓글 리스트 데이터
  useEffect(() => {
    fetch(`/data/Commentlist.json?id=${postId}`, {
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
          setCommentList(sortedPosts);
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
  }, [userToken]);

  // 메인 스레드 페이지 이동
  const handleBack = () => {
    if (window.confirm('댓글 작성을 취소하시겠습니까?')) {
      window.alert('댓글 작성이 취소되었습니다.');
      navigate('/main-thread-list');
    }
  };

  return (
    <div className="comment">
      <div className="commentWrapper">
        <div className="backButtonContainer">
          <img
            className="backButtonIcon"
            src="/images/Back_arrow.svg"
            alt="뒤로 아이콘"
          />
          <button className="backButton" onClick={handleBack}>
            뒤로
          </button>
        </div>
        <div className="userPostContainer">
          <img className="profileImages" src={profileImage} />
          <span className="profileNames">{nickName}</span>
          <span className="dayTexts">2023-08-21</span>
        </div>
        <div className="mainPostFrame">
          <span className="postText">
            심심한데 그림 그리고 싶어...오늘은 뭐그릴까?
          </span>
          <p className="postCommentText">댓글 6</p>
        </div>
        <div className="commentActionsFrame">
          <UserInput type="text" placeholder="댓글을 작성해주세요." />
          <button className="actionButton">댓글 개시</button>
        </div>
        {commentList.map((comment, index) => (
          <div className="commentListFrame" key={index}>
            <img
              className="profileImages"
              src={comment.profileImage}
              alt="프로필 사진"
            />
            <div className="userInfo">
              <span className="profileNames">{comment.nickname}</span>
              <p className="commentText">{comment.comment}</p>
            </div>
            <div className="dayUpdates">
              <span className="updateText">{comment.updatedAt}</span>
              {comment.isUser && (
                <div>
                  <button className="actionButtons deleteButton">삭제</button>
                  <button className="actionButtons editButton">수정</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
