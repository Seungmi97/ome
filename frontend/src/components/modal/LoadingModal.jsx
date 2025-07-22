import React from 'react';

const LoadingModal = ({ open, message = '처리 중입니다...' }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="flex flex-col items-center gap-4 bg-gray-800 text-white p-6 rounded-lg shadow-lg">
        <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm text-gray-300">{message}</p>
      </div>
    </div>
  );
};

export default LoadingModal;