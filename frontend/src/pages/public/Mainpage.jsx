import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import FilterSidebar from '@/components/FilterSidebar';
import MainContent from '@/components/MainContent';

const Mainpage = () => {
  const [keywords, setKeywords] = useState([]);

  const handleAddKeyword = (word) => {
    if (!keywords.includes(word.trim())) {
      setKeywords((prev) => [...prev, word.trim()]);
    }
  };

  const resetState = () => {
    setKeywords([]);
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
          <MainContent
            keywords={keywords}
            onAddKeyword={handleAddKeyword}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Mainpage;