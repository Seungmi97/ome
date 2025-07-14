import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import FilterSidebar from '@/components/FilterSidebar';
import RecipeCard from '@/components/RecipeCard';

const dummyData = [
    { title: '야메 야끼우동', price: '$ Free' },
    { title: '돈부리 덮밥', price: '$ Free' },
    { title: '간장계란 밥 (초간단)', price: '$ Free' },
    { title: '스폰지 밥', price: '$ Platinum' },
    { title: '고래밥', price: '$ Platinum' },
    { title: '캐비어 스시', price: '$ Platinum' },
];

const MainPage = () => {
    return (
        <MainLayout>
            <div className="flex gap-6">
                <FilterSidebar />
                <div className="flex-1">
                    <div className="mb-4 flex items-center justify-between">
                        <input
                            type="text"
                            placeholder="Search"
                            className="border px-4 py-2 rounded-md w-full max-w-md"
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {dummyData.map((item, idx) => (
                            <RecipeCard key={idx} title={item.title} price={item.price} />
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default MainPage;