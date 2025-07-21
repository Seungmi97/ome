import React, { useState, useEffect } from 'react';
import Header from '../layouts/Header';
import { useAuth } from '../hooks/useAuth';

// 역할별 컴포넌트들을 lazy loading으로 변경하여 임포트 문제 해결
const UserMyPage = React.lazy(() => import('../components/MyPage/UserMyPage'));
const CreatorMyPage = React.lazy(() => import('../components/MyPage/CreatorMyPage'));
const AdminMyPage = React.lazy(() => import('../components/MyPage/AdminMyPage'));

const MyPage = () => {
  const { user, loading, isAuthenticated } = useAuth();
  
  // 실제 사용자 role 사용 (기본값: USER)
  const userRole = user?.role || 'USER';

  // 로딩 중 표시
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ome-background via-white to-ome-primary/5">
        <Header />
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-ome-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-ome-text-secondary">사용자 정보를 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  const renderMyPageByRole = () => {
    return (
      <React.Suspense 
        fallback={
          <div className="flex justify-center items-center min-h-[40vh]">
            <div className="animate-spin w-6 h-6 border-4 border-ome-primary border-t-transparent rounded-full"></div>
          </div>
        }
      >
        {userRole === 'ADMIN' && <AdminMyPage />}
        {userRole === 'CREATOR' && <CreatorMyPage />}
        {(userRole === 'USER' || !userRole) && <UserMyPage />}
      </React.Suspense>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ome-background via-white to-ome-primary/5">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {renderMyPageByRole()}
        </div>
      </div>
    </div>
  );
};

export default MyPage; 