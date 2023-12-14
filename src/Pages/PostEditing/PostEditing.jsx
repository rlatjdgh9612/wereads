import React from 'react';
import PostAdd from '../PostAdd/PostAdd';
import './PostEditing.scss';

const PostEditing = () => {
  // 포스트 내용 수정을 위한 텍스트(PostAdd 컴포넌트의 placeholder)
  const editText = '내용 수정하기';

  return (
    <div className="postEditing">
      <PostAdd placeholder={editText} />
    </div>
  );
};

export default PostEditing;
