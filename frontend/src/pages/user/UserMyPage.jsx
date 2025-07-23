import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { useAuth } from '@/hooks/useAuth';
import defaultProfile from '@/assets/default_profile.jpg';
import CancelMembershipModal from '@/components/modal/CancelMembershipModal';
import { User, Settings, MessageCircleHeart } from 'lucide-react';
import { cancelMembership } from '@/services/membershipAPI';
import { deleteAccount, updateUserInfo } from '@/services/authAPI';

const UserMyPage = () => {
  const { user, logout, refetch } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [editForm, setEditForm] = useState({
    username: user?.username || '',
    email: user?.email || '',
    password: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCancelLoading, setIsCancelLoading] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleCancelMembership = async () => {
    try {
      setIsCancelLoading(true);
      await cancelMembership();
      alert('구독이 해지되었습니다.');
      window.location.reload();
    } catch (err) {
      console.error('❌ 구독 해지 실패:', err);
      alert('구독 해지에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsCancelLoading(false);
      setIsModalOpen(false);
    }
  };

  const handleWithdraw = async () => {
    const confirm = window.confirm('정말로 회원 탈퇴하시겠습니까? 모든 데이터가 삭제됩니다.');
    if (!confirm) return;

    try {
      await deleteAccount();
      alert('회원 탈퇴가 완료되었습니다.');
      logout();
    } catch (err) {
      console.error('❌ 회원 탈퇴 실패:', err);
      alert('회원 탈퇴에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleSaveProfile = async () => {
    try {
      await updateUserInfo(editForm);
      await refetch();
      alert('프로필이 성공적으로 저장되었습니다!');
    } catch (error) {
      console.error('프로필 저장 실패:', error);
      alert('프로필 저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">내 마이페이지</h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex">
              {[{ id: 'profile', label: '회원 정보', icon: User }, { id: 'settings', label: '회원 정보 수정', icon: Settings }, { id: 'reviews', label: '후기 / Q&A', icon: MessageCircleHeart }].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
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

          <div className="p-6">
            {activeTab === 'profile' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">아이디</label>
                    <div className="p-3 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white">
                      {user.username}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">이메일</label>
                    <div className="p-3 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white">
                      {user.email}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">멤버십</label>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {user.membershipType || 'Premium'}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center space-y-4">
                  <img
                    src={defaultProfile}
                    alt="프로필 이미지"
                    className="w-32 h-32 rounded-full object-cover border shadow"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveProfile}
                      className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm font-medium"
                    >
                      저장
                    </button>
                    <button
                      onClick={handleWithdraw}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm font-medium"
                    >
                      회원 탈퇴
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">아이디</label>
                    <input
                      type="text"
                      value={user.username}
                      readOnly
                      className="w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">이메일</label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full p-3 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">닉네임</label>
                    <input
                      type="text"
                      value={editForm.username}
                      onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                      className="w-full p-3 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">비밀번호</label>
                    <input
                      type="password"
                      value={editForm.password}
                      onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                      className="w-full p-3 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">멤버십</label>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {user.membershipType || 'Premium'}
                      </div>
                    </div>
                    <button
                      onClick={handleOpenModal}
                      className="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      해지
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center space-y-4">
                  <img
                    src={defaultProfile}
                    alt="프로필 이미지"
                    className="w-32 h-32 rounded-full object-cover border shadow"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveProfile}
                      className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm font-medium"
                    >
                      저장
                    </button>
                    <button
                      onClick={handleWithdraw}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm font-medium"
                    >
                      회원 탈퇴
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="text-gray-700 dark:text-gray-300 space-y-4">
                <h2 className="text-xl font-bold">내가 작성한 후기 / Q&A</h2>
                <p className="text-sm">작성한 후기 또는 질문이 이곳에 표시됩니다.</p>
                <div className="p-4 border rounded-md bg-gray-50 dark:bg-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">아직 등록된 후기가 없습니다.</p>
                </div>
              </div>
            )}

            <CancelMembershipModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onConfirm={handleCancelMembership}
              loading={isCancelLoading}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserMyPage;
