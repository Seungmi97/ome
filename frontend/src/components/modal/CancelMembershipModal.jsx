import React from 'react';
import { X } from 'lucide-react';

const CancelMembershipModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {/* 모달 콘텐츠 */}
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 animate-fade-in">
        {/* 상단 닫기 버튼 */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">구독 해지</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500">
            <X size={20} />
          </button>
        </div>

        {/* 설명 */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          정말로 <span className="font-medium text-red-500">구독을 해지</span>하시겠어요? <br />
          프리미엄 기능을 더 이상 이용하실 수 없습니다.
        </p>

        {/* 버튼 영역 */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-sm border border-gray-300 dark:border-gray-600
              text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md text-sm bg-red-500 hover:bg-red-600 text-white"
          >
            해지하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelMembershipModal;