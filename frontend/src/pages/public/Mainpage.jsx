import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import FilterSidebar from '@/components/FilterSidebar';
import MainContent from '@/components/MainContent';

const MainPage = () => {
    const [keywords, setKeywords] = useState([]);
    const [visibleCount, setVisibleCount] = useState(20);

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
                <MainContent
                    keywords={keywords}
                    onAddKeyword={handleAddKeyword}
                    visibleCount={visibleCount}
                    setVisibleCount={setVisibleCount}
                />
            </div>
        </MainLayout>
    );
};

export default MainPage;