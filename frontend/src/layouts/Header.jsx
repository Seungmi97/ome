import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '@/assets/ome-logo.svg';
import { useAuth } from '@/hooks/useAuth';

const Header = ({ onReset }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/'); // 로그아웃 후 홈으로 이동
    } catch (err) {
      console.error('로그아웃 실패:', err);
    }
  };

  const handleLogoClick = () => {
    onReset?.(); // 키워드/카운트 초기화
    navigate('/');
  };

  return (
    <header className="w-full bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* 로고 */}
        <div className="flex items-center gap-2 flex-shrink-0 cursor-pointer" onClick={handleLogoClick}>
          <img src={logo} alt="OME 로고" className="h-16 w-auto invert-0 dark:invert"/>
        </div>

        {/* 우측 버튼 */}
        <div className="flex items-center gap-4 ml-auto">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-gray-700 dark:text-gray-200">{user?.username}님</span>
              <button
                onClick={handleLogout}
                className="text-sm font-medium bg-gray-200 hover:bg-gray-300 text-black dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white px-4 py-2 rounded-md transition"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md transition"
              >
                로그인
              </Link>
              <Link
                to="/signup"
                className="text-sm font-medium bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md transition"
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;