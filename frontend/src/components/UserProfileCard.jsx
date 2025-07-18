import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import defaultProfile from '@/assets/human.png'; // 기본 프로필 이미지 경로

const UserProfileCard = ({ imageUrl, name, role, plan }) => {
  const { logout } = useAuth();

  return (
    <div className="relative flex items-center gap-8 p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-white dark:from-gray-800 dark:to-gray-900 border border-purple-300 shadow-sm">
      {/* 로그아웃 버튼 (왼쪽 배치) */}

      {/* 프로필 이미지 */}
      <img
        src={imageUrl || defaultProfile} // 기본 프로필 이미지 경로
        alt={`${name} 프로필`}
        className="w-16 h-16 rounded-full object-cover border-2 border-purple-400 shadow-sm"
      />

      {/* 사용자 정보 */}
      <div className="flex-1">
        <p className="text-lg font-semibold text-gray-800 dark:text-white">
          {name}
          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-purple-200 text-purple-800 font-medium">
            {role === 'CREATOR' ? '크리에이터' : '일반유저'}
          </span>
        </p>
        <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">{plan || '플랜 조회 실패'}</p>
      </div>
      <button
        onClick={logout}
        className="flex items-center gap-2 px-4 py-4 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-full transition"
        title="로그아웃"
      >
        <LogOut size={16} />
      </button>

    </div>
  );
};

export default UserProfileCard;