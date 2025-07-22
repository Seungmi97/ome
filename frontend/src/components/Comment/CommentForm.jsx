import React, { useState } from 'react';

const CommentForm = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text.trim());
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
        rows="4"
        placeholder="댓글을 입력하세요..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <div className="flex justify-end mt-2">
        <button
          type="submit"
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
        >
          등록하기
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
