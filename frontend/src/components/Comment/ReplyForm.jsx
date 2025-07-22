import React, { useState } from 'react';

const ReplyForm = ({ onSubmit, onCancel }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text.trim());
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
        rows="3"
        placeholder="답글을 입력하세요..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <div className="flex justify-end mt-2 gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="text-sm text-gray-500 hover:text-red-500"
        >
          취소
        </button>
        <button
          type="submit"
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-1 text-sm rounded"
        >
          등록
        </button>
      </div>
    </form>
  );
};

export default ReplyForm;
