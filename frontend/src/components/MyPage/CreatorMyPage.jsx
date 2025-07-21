import React, { useState } from 'react';

const CreatorMyPage = () => {
  const [activeTab, setActiveTab] = useState('info');

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">창작자 마이페이지</h1>
      
      <div className="flex space-x-4 border-b mb-6">
        <button 
          onClick={() => setActiveTab('info')}
          className={`pb-2 px-4 ${activeTab === 'info' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
        >
          창작자 정보
        </button>
        <button 
          onClick={() => setActiveTab('recipes')}
          className={`pb-2 px-4 ${activeTab === 'recipes' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
        >
          내 레시피
        </button>
        <button 
          onClick={() => setActiveTab('subscribers')}
          className={`pb-2 px-4 ${activeTab === 'subscribers' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
        >
          구독자 관리
        </button>
      </div>

      {activeTab === 'info' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">창작자 정보</h2>
          <p>창작자 정보를 관리하는 섹션입니다.</p>
        </div>
      )}

      {activeTab === 'recipes' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">내 레시피</h2>
          <p>업로드한 레시피를 관리하는 섹션입니다.</p>
        </div>
      )}

      {activeTab === 'subscribers' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">구독자 관리</h2>
          <p>구독자를 관리하는 섹션입니다.</p>
        </div>
      )}
    </div>
  );
};

export default CreatorMyPage; 