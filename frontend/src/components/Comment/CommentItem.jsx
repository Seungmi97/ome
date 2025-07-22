import React from 'react';

const CommentItem = ({ comment }) => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-gray-800">{comment.author}</span>
        <span className="text-sm text-gray-500">{comment.date}</span>
      </div>
      <p className="text-gray-700">{comment.content}</p>
      <div className="flex justify-end gap-2 mt-2 text-sm">
        <button className="text-gray-500 hover:text-gray-700">수정</button>
        <button className="text-red-500 hover:text-red-700">신고</button>
      </div>
    </div>
  );
};

export default CommentItem;