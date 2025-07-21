import React, { useState, useEffect } from 'react';
import { User, Heart, Users, Settings, Edit2, Clock, AlertCircle } from 'lucide-react';
import UserInfo from './UserInfo';
import SubscribedCreators from './SubscribedCreators';
import FavoriteRecipes from './FavoriteRecipes';
import UserInfoEdit from './UserInfoEdit';
import axios from 'axios';

const UserMyPage = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [userStats, setUserStats] = useState({
    subscribedCreators: 0,
    favoriteRecipes: 0
  });
  const [loading, setLoading] = useState(true);
  const [apiConnected, setApiConnected] = useState(false);

  // 백엔드 API 연결 테스트
  useEffect(() => {
    const testBackendConnection = async () => {
      try {
        setLoading(true);
        
        // 백엔드 연결 테스트
        const testResponse = await axios.get('http://localhost:8080/api/test');
        console.log('✅ 백엔드 연결 성공:', testResponse.data);
        setApiConnected(true);

        // 사용자 마이페이지 데이터 가져오기
        const userResponse = await axios.get('http://localhost:8080/api/mypage/user');
        console.log('✅ 사용자 데이터:', userResponse.data);
        
        if (userResponse.data.status === 'success') {
          setUserStats({
            subscribedCreators: userResponse.data.subscribedCreators || 0,
            favoriteRecipes: userResponse.data.favoriteRecipes || 0
          });
        }
      } catch (error) {
        console.log('❌ 백엔드 연결 실패:', error.message);
        console.log('🔄 목업 데이터로 동작합니다.');
        setApiConnected(false);
        
        // 목업 데이터 설정
        setUserStats({
          subscribedCreators: 3,
          favoriteRecipes: 12
        });
      } finally {
        setLoading(false);
      }
    };

    testBackendConnection();
  }, []);

  const tabs = [
    { id: 'info', label: '내 정보', icon: User },
    { id: 'creators', label: '구독 작가', icon: Users, count: userStats.subscribedCreators },
    { id: 'favorites', label: '찜한 레시피', icon: Heart, count: userStats.favoriteRecipes },
    { id: 'edit', label: '정보 수정', icon: Edit2 }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'info':
        return <UserInfo />;
      case 'creators':
        return <SubscribedCreators />;
      case 'favorites':
        return <FavoriteRecipes />;
      case 'edit':
        return <UserInfoEdit />;
      default:
        return <UserInfo />;
    }
  };

  // 개선된 로딩 스켈레톤
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <div className="animate-pulse">
          {/* 헤더 스켈레톤 */}
          <div className="bg-gradient-to-r from-gray-300 to-gray-400 h-32 rounded-xl mb-6"></div>
          
          {/* 탭 스켈레톤 */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-gray-300 h-12 w-24 rounded-lg"></div>
            ))}
          </div>
          
          {/* 콘텐츠 스켈레톤 */}
          <div className="bg-gray-300 h-64 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {/* 개선된 API 연결 상태 표시 */}
      <div className={`mb-6 p-4 rounded-xl border-l-4 transition-all duration-300 ${
        apiConnected 
          ? 'bg-green-50 border-green-500 text-green-800 shadow-green-100' 
          : 'bg-yellow-50 border-yellow-500 text-yellow-800 shadow-yellow-100'
      } shadow-lg`}>
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-3 transition-all duration-300 ${
            apiConnected ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'
          }`}></div>
          <span className="font-medium text-sm md:text-base">
            {apiConnected 
              ? '✅ 백엔드 서버 연결됨 (실제 데이터)' 
              : '🔄 백엔드 서버 미연결 (목업 데이터)'}
          </span>
        </div>
      </div>

      {/* 개선된 사용자 대시보드 헤더 */}
      <div className="bg-gradient-to-r from-ome-primary via-purple-600 to-ome-secondary text-white p-6 md:p-8 rounded-xl shadow-xl mb-6 transform transition-all duration-300 hover:scale-[1.01]">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">내 마이페이지</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 transition-all duration-300 hover:bg-white/30">
            <div className="flex items-center">
              <Users className="w-5 h-5 md:w-6 md:h-6 mr-3" />
              <div>
                <p className="text-white/80 text-xs md:text-sm">구독 작가</p>
                <p className="text-xl md:text-2xl font-bold">{userStats.subscribedCreators}명</p>
              </div>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 transition-all duration-300 hover:bg-white/30">
            <div className="flex items-center">
              <Heart className="w-5 h-5 md:w-6 md:h-6 mr-3" />
              <div>
                <p className="text-white/80 text-xs md:text-sm">찜한 레시피</p>
                <p className="text-xl md:text-2xl font-bold">{userStats.favoriteRecipes}개</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 개선된 탭 네비게이션 */}
      <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                isActive
                  ? 'bg-ome-primary text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-ome-primary border border-gray-200 hover:border-ome-primary'
              }`}
            >
              <Icon className={`w-4 h-4 mr-2 ${isActive ? 'text-white' : 'text-gray-500'}`} />
              <span className="text-sm md:text-base">{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
                  isActive 
                    ? 'bg-white/20 text-white' 
                    : 'bg-ome-primary/10 text-ome-primary'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 개선된 탭 콘텐츠 */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="min-h-[400px] transition-all duration-300">
          {renderTabContent()}
        </div>
      </div>

      {/* 빈 상태 처리 (예시) */}
      {activeTab === 'creators' && userStats.subscribedCreators === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">구독한 작가가 없습니다</h3>
          <p className="text-gray-500 mb-4">관심있는 작가를 구독해보세요!</p>
          <button className="bg-ome-primary text-white px-6 py-2 rounded-lg hover:bg-ome-primary/90 transition-colors">
            작가 둘러보기
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMyPage; 