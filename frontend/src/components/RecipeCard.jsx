import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

const RecipeCard = ({ id, title, imageUrl, isPremium, bookmarkCount }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/recipes/${id}`)}
      className="w-[200px] cursor-pointer border border-gray-200 dark:border-gray-700 rounded-md p-4 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition flex flex-col"
    >
      {/* 이미지 */}
      <div className="w-full h-32 bg-gray-100 dark:bg-gray-800 rounded mb-3 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover rounded"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
            이미지 없음
          </div>
        )}
      </div>

      {/* 제목 */}
      <div className="text-sm font-semibold text-gray-800 dark:text-white mb-1 line-clamp-1">
        {title}
      </div>

      {/* 유/무료 상태 + 찜 수 */}
      <div className="flex justify-between items-center mt-auto">
        {/* 유/무료 */}
        <span
          className={`text-xs font-bold px-2 py-0.5 rounded ${
            isPremium
              ? 'bg-amber-100 text-amber-700'
              : 'bg-green-100 text-green-700'
          }`}
        >
          {isPremium ? '유료' : '무료'}
        </span>

        {/* 찜 수 */}
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-300">
          <Heart size={14} className="fill-red-400 text-red-400" />
          <span>{bookmarkCount}</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;