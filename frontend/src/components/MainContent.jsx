import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { getRecipeList } from '@/services/recipeAPI';
import RecipeCard from './RecipeCard';
import SkeletonCard from './SkeletonCard';
import PaginationBar from './Pagenationbar';

const CATEGORY_LABELS = {
  korean: '한식',
  japanese: '일식',
  chineses: '중식',
  western: '양식',
  dessert: '디저트',
  vegan: '비건',
};

export default function MainContent({ keywords, onAddKeyword }) {
  const [inputValue, setInputValue] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [premiumFilter, setPremiumFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('');

  const { user } = useAuth();
  const navigate = useNavigate();
  const ITEMS_PER_PAGE = 25;

  useEffect(() => {
    setPage(0);
  }, [keywords]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);

        const params = {
          page,
          size: ITEMS_PER_PAGE,
          keyword: keywords.join(','),
        };

        const res = await getRecipeList(params);
        let result = res.data?.content || [];

        // 전체 카테고리 최초 1회 추출
        if (allCategories.length === 0) {
          const catSet = new Set(result.map((r) => r.category).filter(Boolean));
          setAllCategories([...catSet]);
        }

        if (premiumFilter !== 'all') {
          result = result.filter((r) => r.isPremium === premiumFilter);
        }

        if (categoryFilter) {
          result = result.filter((r) => r.category === categoryFilter);
        }

        setRecipes(result);
        setTotalPages(Math.ceil(result.length / ITEMS_PER_PAGE));
      } catch (err) {
        console.error('레시피 목록 불러오기 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [keywords, page, premiumFilter, categoryFilter]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      const keywordsToAdd = inputValue
        .split('+')
        .map((k) => k.trim())
        .filter(Boolean);
      keywordsToAdd.forEach(onAddKeyword);
      setInputValue('');
    }
  };

  return (
    <div className="flex-1 px-4">
      {/* 검색창 + 필터 + 업로드 버튼 */}
      <div className="mb-4 flex justify-between items-center gap-2 flex-wrap">
        <div className="flex gap-2 items-center flex-nowrap overflow-x-auto">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="검색어 입력 후 Enter"
            className="border px-4 py-2 rounded-md w-[520px]
              placeholder-gray-500 dark:placeholder-gray-400
              bg-white text-black dark:bg-gray-800 dark:text-white
              border-gray-300 dark:border-gray-600"
          />
          <select
            value={premiumFilter}
            onChange={(e) => setPremiumFilter(e.target.value)}
            className="border px-3 py-2 rounded-md text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600"
          >
            <option value="all">전체</option>
            <option value="free">무료 레시피</option>
            <option value="premium">프리미엄 레시피</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border px-3 py-2 rounded-md text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600"
          >
            <option value="">전체 카테고리</option>
            {allCategories.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_LABELS[c] || c}
              </option>
            ))}
          </select>
        </div>

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
                  thumbnailUrl={item.thumbnailUrl}
                  isPremium={item.isPremium}
                  bookmarkCount={item.bookmarkCount || 0}
                  writerNickname={item.writerNickname}
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