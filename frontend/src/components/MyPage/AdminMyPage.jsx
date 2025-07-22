import React, { useState } from 'react';

const AdminMyPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">관리자 대시보드</h1>
      
      <div className="flex space-x-4 border-b mb-6">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`pb-2 px-4 ${activeTab === 'dashboard' ? 'border-b-2 border-red-500 text-red-600' : 'text-gray-600'}`}
        >
          대시보드
        </button>
        <button 
          onClick={() => setActiveTab('users')}
          className={`pb-2 px-4 ${activeTab === 'users' ? 'border-b-2 border-red-500 text-red-600' : 'text-gray-600'}`}
        >
          사용자 관리
        </button>
        <button 
          onClick={() => setActiveTab('content')}
          className={`pb-2 px-4 ${activeTab === 'content' ? 'border-b-2 border-red-500 text-red-600' : 'text-gray-600'}`}
        >
          콘텐츠 관리
        </button>
      </div>

      {activeTab === 'dashboard' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">전체 현황</h2>
          <p>시스템 전체 현황을 확인하는 섹션입니다.</p>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">사용자 관리</h2>
          <p>전체 사용자를 관리하는 섹션입니다.</p>
        </div>
      )}

      {activeTab === 'content' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">콘텐츠 관리</h2>
          <p>레시피와 콘텐츠를 관리하는 섹션입니다.</p>
        </div>
      )}
    </div>
  );
};

export default AdminMyPage; 