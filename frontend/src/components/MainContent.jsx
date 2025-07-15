import React, { useState } from 'react';
import RecipeCard from './RecipeCard';

const dummyData = [
    { title: '야메 야끼우동', price: '$ Free' },
    { title: '돈부리 덮밥', price: '$ Free' },
    { title: '간장계란 밥 (초간단)', price: '$ Free' },
    { title: '스폰지 밥', price: '$ Platinum' },
    { title: '고래밥', price: '$ Platinum' },
    { title: '캐비어 스시', price: '$ Platinum' },
    { title: '야메 야끼우동', price: '$ Free' },
    { title: '돈부리 덮밥', price: '$ Free' },
    { title: '간장계란 밥 (초간단)', price: '$ Free' },
    { title: '스폰지 밥', price: '$ Platinum' },
    { title: '고래밥', price: '$ Platinum' },
    { title: '캐비어 스시', price: '$ Platinum' },
    { title: '야메 야끼우동', price: '$ Free' },
    { title: '돈부리 덮밥', price: '$ Free' },
    { title: '간장계란 밥 (초간단)', price: '$ Free' },
    { title: '스폰지 밥', price: '$ Platinum' },
    { title: '고래밥', price: '$ Platinum' },
    { title: '캐비어 스시', price: '$ Platinum' },
    { title: '야메 야끼우동', price: '$ Free' },
    { title: '돈부리 덮밥', price: '$ Free' },
    { title: '간장계란 밥 (초간단)', price: '$ Free' },
    { title: '스폰지 밥', price: '$ Platinum' },
    { title: '고래밥', price: '$ Platinum' },
    { title: '캐비어 스시', price: '$ Platinum' },
    { title: '야메 야끼우동', price: '$ Free' },
    { title: '돈부리 덮밥', price: '$ Free' },
    { title: '간장계란 밥 (초간단)', price: '$ Free' },
    { title: '스폰지 밥', price: '$ Platinum' },
    { title: '고래밥', price: '$ Platinum' },
    { title: '캐비어 스시', price: '$ Platinum' },
];

const MainContent = ({ keywords, onAddKeyword, visibleCount, setVisibleCount }) => {
  const [inputValue, setInputValue] = useState('');

  const filteredData = keywords.length === 0
    ? dummyData
    : dummyData.filter(item =>
        keywords.some(k => item.title.toLowerCase().includes(k.toLowerCase()))
      );

  const visibleData = filteredData.slice(0, visibleCount);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      onAddKeyword(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="flex-1 px-4">
      {/* 검색바 */}
      <div className="mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="검색어 입력 후 Enter"
          className="border px-4 py-2 rounded-md w-full max-w-md
            placeholder-gray-500 dark:placeholder-gray-400
            bg-white text-black dark:bg-gray-800 dark:text-white
            border-gray-300 dark:border-gray-600"
        />
      </div>

      {/* 카드 목록 */}
      <div className="flex flex-wrap gap-6">
        {visibleData.map((item, idx) => (
          <RecipeCard key={idx} title={item.title} price={item.price} />
        ))}
      </div>

      {/* 더보기 버튼 */}
      {visibleCount < filteredData.length && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setVisibleCount((v) => v + 20)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            더보기 +
          </button>
        </div>
      )}
    </div>
  );
};

export default MainContent;