import React, { useState, useEffect } from 'react';
import { getRecipeList } from '@/services/recipeAPI';
import RecipeCard from './RecipeCard';
import SkeletonCard from './SkeletonCard';

export default function MainContent({ keywords, onAddKeyword, visibleCount, setVisibleCount }) {
  const [inputValue, setInputValue] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const params = {
          offset: 0,
          limit: visibleCount,
          keyword: keywords.join(','), // ✅ 단수형으로 변경
        };
        const response = await getRecipeList(params);
        setRecipes(response.data?.content || []);
      } catch (err) {
        console.error('레시피 목록 불러오기 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [keywords, visibleCount]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      onAddKeyword(inputValue);
      setInputValue('');
    }
  };

  const recipeCards = recipes.map((item) => (
    <RecipeCard
      key={item.recipeId}
      id={item.recipeId}
      title={item.title}
      imageUrl={item.imageUrl}
      isPremium={item.isPremium}
      bookmarkCount={item.bookmarkCount || 0}
    />
  ));

  return (
    <div className="flex-1 px-4">
      {/* 검색창 */}
      <div className="mb-4 flex justify-between items-center flex-wrap gap-2">
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

      {/* 레시피 카드 목록 */}
      <div className="flex flex-wrap gap-6">
        {loading
          ? Array.from({ length: 8 }).map((_, idx) => <SkeletonCard key={idx} />)
          : recipes.length > 0
            ? recipeCards
            : <p className="text-center text-gray-500">레시피가 없습니다.</p>
        }
      </div>

      {/* 더보기 버튼 */}
      {!loading && recipes.length >= visibleCount && (
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
}