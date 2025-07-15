import React from 'react';

const RecipeCard = ({ title, price }) => {
  return (
    <div className="w-[200px] border border-gray-200 dark:border-gray-700 rounded-md p-4 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition">
      {/* 이미지 영역 (임시로 빈 div 사용) */}
      <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
      {/* 제목과 가격 영역 */}
      <div className="text-sm font-medium text-gray-800 dark:text-white mb-1">{title}</div>
      <div className="text-xs font-semibold text-gray-500 dark:text-gray-300">{price}</div>
    </div>
  );
};

export default RecipeCard;