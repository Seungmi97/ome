import React from 'react';
import AdminSidebar from '@/components/AdminSidebar'; // 사이드바 컴포넌트
import AdminHeader from '@/layouts/Header';  
import { Outlet } from 'react-router-dom'; // Outlet을 사용하여 하위 라우트 렌더링
const AdminDashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* 관리자용 사이드바 */}
      <AdminSidebar />

      {/* 메인 콘텐츠 영역 */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <AdminHeader />

        {/* 페이지별 내용 */}
        <main className="p-6 bg-gray-50 min-h-[calc(100vh-4rem)]">
          <Outlet /> {/* Outlet을 사용하여 하위 라우트 렌더링 */}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;