import React, { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import api from '@/services/api';
import { User, Heart, Users, Settings, Edit, Save, X, Bell, BellOff, ChefHat } from 'lucide-react';

const UserMyPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [myPageData, setMyPageData] = useState(null);
  const [editForm, setEditForm] = useState({
    username: '',
    email: '',
    introduction: ''
  });
  const [notifications, setNotifications] = useState(true);

  // 백엔드에서 마이페이지 데이터 가져오기
  useEffect(() => {
    fetchMyPageData();
  }, []);

  const fetchMyPageData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/mypage/user');
      setMyPageData(response.data);
      setEditForm({
        username: response.data.userInfo.username,
        email: response.data.userInfo.email,
        introduction: response.data.userInfo.introduction || ''
      });
    } catch (error) {
      console.error('마이페이지 데이터 로딩 실패:', error);
      // Mock 데이터 사용
      setMyPageData({
        userInfo: {
          username: user?.username || '오메오메',
          email: user?.email || 'user@ome.com',
          role: user?.role || 'USER',
          membershipType: 'Premium',
          joinDate: '2024.01.15'
        },
        subscribedCreators: 3,
        favoriteRecipes: 12
      });
    } finally {
      setLoading(false);
    }
  };

  // 프로필 편집 모드 토글
  const handleEditToggle = () => {
    if (isEditing) {
      // 저장 로직
      handleSaveProfile();
    } else {
      setIsEditing(true);
    }
  };

  // 프로필 저장
  const handleSaveProfile = async () => {
    try {
      // 실제 API 호출 시 주석 해제
      // await api.put('/api/users/profile', editForm);
      alert('프로필이 성공적으로 저장되었습니다!');
      setIsEditing(false);

      // 로컬 데이터 업데이트
      setMyPageData(prev => ({
        ...prev,
        userInfo: {
          ...prev.userInfo,
          ...editForm
        }
      }));
    } catch (error) {
      console.error('프로필 저장 실패:', error);
      alert('프로필 저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 편집 취소
  const handleCancelEdit = () => {
    setEditForm({
      username: myPageData.userInfo.username,
      email: myPageData.userInfo.email,
      introduction: myPageData.userInfo.introduction || ''
    });
    setIsEditing(false);
  };

  // 알림 설정 토글
  const handleNotificationToggle = async () => {
    try {
      // 실제 API 호출 시 주석 해제
      // await api.put('/api/users/notifications', { enabled: !notifications });
      setNotifications(!notifications);
      alert(`알림이 ${!notifications ? '켜졌습니다' : '꺼졌습니다'}!`);
    } catch (error) {
      console.error('알림 설정 변경 실패:', error);
      alert('알림 설정 변경에 실패했습니다.');
    }
  };

  // 레시피 둘러보기
  const handleBrowseRecipes = () => {
    navigate('/recipes');
  };

  // 작가 둘러보기
  const handleBrowseCreators = () => {
    navigate('/creators');
  };

  // 계정 설정
  const handleAccountSettings = () => {
    navigate('/settings/account');
  };

  // 비밀번호 변경
  const handleChangePassword = () => {
    navigate('/settings/password');
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="space-y-4">
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!myPageData) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto p-6 text-center">
          <p className="text-gray-500">마이페이지 데이터를 불러올 수 없습니다.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-6">
        {/* 페이지 타이틀 */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          내 마이페이지
        </h1>

        {/* 탭 네비게이션 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex">
              {[
                { id: 'profile', label: '회원 정보', icon: User },
                // { id: 'favorites', label: '찜한 레시피', icon: Heart },
                { id: 'settings', label: '회원 정보 수정', icon: Settings }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id
                    ? 'border-orange-500 text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* 탭 컨텐츠 */}
          <div className="p-6">
            {/* 회원 정보 탭 */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        닉네임
                      </label>
                      <div className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700">
                        {myPageData.userInfo.username}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        이메일
                      </label>
                      <div className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700">
                        {myPageData.userInfo.email}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        아이디
                      </label>
                      <div className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700">
                        {myPageData.userInfo.username}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          멤버십
                        </label>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-gray-900 dark:text-white">
                            {myPageData.userInfo.membershipType || 'Premium'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {myPageData.userInfo.username}
                    </label>
                    <img
                      src={user?.imageUrl || '/src/assets/human.png'}
                      alt="프로필 이미지"
                      className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600 shadow"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 찜한 레시피 탭
            {activeTab === 'favorites' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    찜한 레시피
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: '아메 아카우동', price: 'Free' },
                    { name: '도넛의 달콤', price: 'Free' },
                    { name: '간장게장 딥 (초간단)', price: 'Free' },
                    { name: '스토지 보', price: 'Platinum' },
                    { name: '고래밥', price: 'Platinum' },
                    { name: '케이터 소시', price: 'Platinum' }
                  ].map((recipe, i) => (
                    <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <div className="aspect-video bg-gray-200 dark:bg-gray-700"></div>
                      <div className="p-3">
                        <h3 className="font-medium text-gray-900 dark:text-white text-sm">{recipe.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">$ {recipe.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )} */}

            {/* 회원 정보 수정 탭 */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    회원 정보 수정
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        아이디
                      </label>
                      <input
                        type="text"
                        value={myPageData.userInfo.username}
                        readOnly
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        이메일
                      </label>
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        닉네임
                      </label>
                      <input
                        type="text"
                        value={editForm.username}
                        onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          멤버십
                        </label>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-gray-900 dark:text-white">
                            {myPageData.userInfo.membershipType || 'Premium'}
                          </span>
                        </div>
                      </div>
                      <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                        해지
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {myPageData.userInfo.username}
                    </label>

                    <img
                      src={user?.imageUrl || '/src/assets/human.png'}
                      alt="프로필 이미지"
                      className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600 shadow"
                    />

                    <button
                      className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm font-medium"
                    >
                      회원 탈퇴
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 justify-center pt-4">
                  <button
                    onClick={handleSaveProfile}
                    className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-medium"
                  >
                    저장
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md font-medium hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    취소
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserMyPage; 