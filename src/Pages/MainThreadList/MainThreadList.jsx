import React from 'react';
import UserButton from '../../Components/UserButton';
import './MainThreadList.scss';

const MainThreadList = () => {
  return (
    <div className="mainthread">
      {POST_LIST.map((post, index) => (
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

const POST_LIST = [
  {
    postId: 1,
    nickname: 'wecode',
    profileImage:
      'https://www.chemicalnews.co.kr/news/photo/202107/4159_10727_3352.png',
    content:
      '일라이자 효과는 인간의 사고 과정과 감정을 AI 시스템에 잘못 돌리는 사람들의 경향을 말하며, 따라서 시스템이 실제보다 더 지능적이라고 믿는다. 이 현상은 1966년 MIT 교수 조셉 웨이젠바움이 만든 챗봇인 ELIZA의 이름을 따서 명명되었다.',
    createdAt: '2023-08-22',
    updateAt: '2023-08-25',
    comments: '댓글 1',
    isUser: true,
  },
  {
    postId: 2,
    nickname: 'seongho',
    profileImage:
      'https://hamtopia.com/web/product/tiny/202306/4990d9e0c64dcf0342ee120905977429.jpg',
    content: '배고파 오늘은 뭐먹지?',
    createdAt: '2023-08-17',
    updateAt: '2023-08-18',
    comments: '댓글 5',
    isUser: false,
  },
  {
    postId: 3,
    nickname: 'drawing_kim95',
    profileImage:
      'https://img.jakpost.net/c/2020/08/26/2020_08_26_103148_1598423727._large.jpg',
    content: '그림 그리고 싶어...',
    createdAt: '2023-08-20',
    updateAt: '2023-08-21',
    comments: '댓글 3',
    isUser: false,
  },
  {
    postId: 4,
    nickname: 'guraeng',
    profileImage:
      'https://img.freepik.com/premium-photo/fluffy-dwarf-hamster-lies-front-view_109543-618.jpg',
    content: '일라이자 효과는 인간의 사고 과정과 감정을....',
    createdAt: '2023-08-19',
    updateAt: '2023-08-20',
    comments: '댓글 4',
    isUser: true,
  },
  {
    postId: 5,
    nickname: 'wecode_hong',
    profileImage:
      'https://img.famtimes.co.kr/resources/2018/05/22/7J6ugOP2q6T7Z9Xy.jpg',
    content: '성별과 성격과 같은 인간의 특성을 AI 음성 비서에게 돌리기',
    createdAt: '2023-08-24',
    updateAt: '2023-08-23',
    comments: '댓글 10',
    isUser: false,
  },
  {
    postId: 6,
    nickname: 'weread',
    profileImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7Xyj1ftWWW5ZjpyALJbMJ-mZwZLGAj_JLsTVAL2MKF7ULNCj7KGR5V6f4uJP8Msr7H3s&usqp=CAU',
    content: '에러 체크 잘하기',
    createdAt: '2023-08-21',
    updateAt: '2023-08-22',
    comments: '댓글 20',
    isUser: false,
  },
];