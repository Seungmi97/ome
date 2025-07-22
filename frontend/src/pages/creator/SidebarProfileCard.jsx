import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import defaultProfile from '@/assets/human.png';

export default function SidebarProfileCard() {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center justify-between bg-purple-100 dark:bg-gray-800 p-3 rounded-xl border border-purple-300 dark:border-gray-600 relative">
      {/* 프로필 영역 */}
      <div className="flex items-center gap-3">
        <img
          src={user?.imageUrl || defaultProfile}
          alt="프로필"
          className="w-10 h-10 rounded-full border-2 border-purple-400 object-cover"
        />

        <div className="text-left">
          <div className="text-sm font-semibold text-gray-800 dark:text-white truncate max-w-[120px]">
            {user?.username}
          </div>
          <div
            className={`text-xs font-medium ${user?.plan === '베이직 플랜'
              ? 'text-purple-500'
              : 'text-yellow-500'
              }`}
          >
            {user?.plan || '베이직 플랜'}
          </div>
        </div>
      </div>

      {/* 로그아웃 버튼 */}
      <button
        onClick={logout}
        title="로그아웃"
        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow"
      >
        <LogOut size={14} />
      </button>
    </div>
  );
}