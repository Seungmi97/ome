import React from 'react';

const MembershipSuccessModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">
          🎉 프리미엄 전환 완료!
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          이제 모든 프리미엄 콘텐츠를 자유롭게 이용하실 수 있어요.
        </p>
        <button
          onClick={onClose}
          className="mt-2 px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default MembershipSuccessModal;