import React, { useState } from 'react';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const CommentSection = ({ recipeId }) => {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: '사용자 이름',
      content: '정말 좋은 레시피네요!',
      date: '2025-07-15'
    }
  ]);

  const handleAddComment = (text) => {
    const newComment = {
      id: Date.now(),
      author: '내 닉네임',
      content: text,
      date: new Date().toISOString().split('T')[0]
    };
    setComments([newComment, ...comments]);
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-gray-200 pb-2">
        댓글
      </h2>

      <CommentForm onSubmit={handleAddComment} />

      <div className="space-y-4 mt-6">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
