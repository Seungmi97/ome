import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { getRecipeList } from '@/services/recipeAPI';
import RecipeCard from './RecipeCard';
import SkeletonCard from './SkeletonCard';
import PaginationBar from './Pagenationbar';

export default function MainContent({ keywords, onAddKeyword }) {
  const [inputValue, setInputValue] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const { user } = useAuth();
  const navigate = useNavigate();

  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const params = {
          offset: page * ITEMS_PER_PAGE,
          limit: ITEMS_PER_PAGE,
          keyword: keywords.join(','),
        };
        const response = await getRecipeList(params);
        setRecipes(response.data?.content || []);
        const total = response.data?.totalElements || 0;
        setTotalPages(Math.ceil(total / ITEMS_PER_PAGE));
      } catch (err) {
        console.error('레시피 목록 불러오기 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [keywords, page]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      const keywordsToAdd = inputValue
        .split('+')
        .map((k) => k.trim())
        .filter((k) => k.length > 0);

      keywordsToAdd.forEach(onAddKeyword);
      setInputValue('');
    }
  };

  return (
    <div className="flex-1 px-4">
      {/* 검색창 + 업로드 버튼 */}
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
        {user?.role === 'CREATOR' && (
          <button
            onClick={() => navigate('/creator/recipes/upload')}
            className="flex items-center gap-1 bg-purple-100 hover:bg-purple-200 text-purple-800
              font-medium px-4 py-2 rounded transition whitespace-nowrap"
          >
            ＋ 레시피 생성하기
          </button>
        )}
      </div>

      {/* 카드 목록 */}
      <div className="flex flex-wrap gap-6 max-w-[1096px] justify-start">
        {loading
          ? Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="flex-shrink-0 w-[200px]">
              <SkeletonCard />
            </div>
          ))
          : recipes.length > 0
            ? recipes.map((item) => (
              <div key={item.recipeId} className="flex-shrink-0 w-[200px]">
                <RecipeCard
                  id={item.recipeId}
                  title={item.title}
                  imageUrl={item.imageUrl}
                  isPremium={item.isPremium}
                  bookmarkCount={item.bookmarkCount || 0}
                />
              </div>
            ))
            : <p className="text-center text-gray-500 w-full">레시피가 없습니다.</p>
        }
      </div>

      {/* 페이지네이션 */}
      {!loading && totalPages > 1 && (
        <PaginationBar page={page} totalPages={totalPages} onPageChange={setPage} />
      )}
    </div>
  );
}