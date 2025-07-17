import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ 추가
import MainLayout from '@/layouts/MainLayout';
import FilterSidebar from '@/components/FilterSidebar';
import MainContent from '@/components/MainContent';

const CreatorMainpage = () => {
  const [keywords, setKeywords] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const navigate = useNavigate(); // ✅ 훅 사용

  const handleAddKeyword = (word) => {
    if (!keywords.includes(word.trim())) {
      setKeywords((prev) => [...prev, word.trim()]);
    }
  };

  const resetState = () => {
    setKeywords([]);
    setVisibleCount(20);
  };

  const handleRemoveKeyword = (word) => {
    setKeywords((prev) => prev.filter((k) => k !== word));
  };

  return (
    <MainLayout onReset={resetState}>
      <div className="flex gap-6">
        <FilterSidebar
          keywords={keywords}
          onRemoveKeyword={handleRemoveKeyword}
          onReset={resetState}
        />

        <div className="flex-1">
          {/* ✅ 레시피 추가 버튼 */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => navigate('/creator/recipes/upload')}
              className="bg-black text-white px-4 py-2 rounded"
            >
              + 새 레시피 추가
            </button>
          </div>

          <MainContent
            keywords={keywords}
            onAddKeyword={handleAddKeyword}
            visibleCount={visibleCount}
            setVisibleCount={setVisibleCount}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default CreatorMainpage;
