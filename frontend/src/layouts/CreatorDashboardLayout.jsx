import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import CreatorDashboardSidebar from '@/pages/creator/CreatorDashboardSidebar';

export default function CreatorDashboardLayout() {
  // ✅ 메인페이지에서 설정한 theme 적용만
  useEffect(() => {
    const theme = localStorage.theme;
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, []);

  return (
    <div className="min-h-screen flex bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
      <CreatorDashboardSidebar />

      <main className="flex-1 p-6 relative">
        {/* 중첩 라우팅 콘텐츠 */}
        <Outlet />
      </main>
    </div>
  );
}