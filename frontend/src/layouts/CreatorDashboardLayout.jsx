import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import CreatorDashboardSidebar from '@/pages/creator/CreatorDashboardSidebar';
import { getMembershipInfo } from '@/services/membershipAPI';

export default function CreatorDashboardLayout() {
  const [plan, setPlan] = useState(''); // 플랜 상태

  // ✅ 테마 적용
  useEffect(() => {
    const theme = localStorage.theme;
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, []);

  // ✅ 멤버십 정보 조회
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await getMembershipInfo();
        setPlan(res.data?.memberState || '플랜 조회 실패');
      } catch (err) {
        console.warn('멤버십 정보 조회 실패:', err);
        setPlan('플랜 조회 실패');
      }
    };

    fetchPlan();
  }, []);

  return (
    <div className="min-h-screen flex bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
      {/* plan prop 전달 */}
      <CreatorDashboardSidebar plan={plan} />

      <main className="flex-1 p-6 relative">
        <Outlet />
      </main>
    </div>
  );
}