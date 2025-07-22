import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '@/assets/ome-logo.svg';
import { useAuth } from '@/hooks/useAuth';
import UserProfileCard from '@/components/UserProfileCard';
import { getMembershipInfo } from '@/services/membershipAPI';

const Header = ({ onReset }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [membershipPlan, setMembershipPlan] = useState('');

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error('로그아웃 실패:', err);
    }
  };

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await getMembershipInfo();
        setMembershipPlan(res.data?.memberState || '정보 없음');
      } catch (err) {
        console.warn('멤버십 정보 조회 실패:', err);
        setMembershipPlan('정보 없음');
      }
    };

    if (isAuthenticated) {
      fetchPlan();
    }
  }, [isAuthenticated]);

  const handleLogoClick = () => {
    onReset?.();
    navigate('/');
  };

  return (
    <header className="w-full bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* 로고 클릭 → 메인 이동 */}
        <div
          className="flex items-center gap-2 flex-shrink-0 cursor-pointer"
          onClick={handleLogoClick}
        >
          <img src={logo} alt="OME 로고" className="h-20 w-auto invert-0 dark:invert" />
        </div>

        {/* 우측 인증 관련 영역 */}
        <div className="flex items-center gap-4 ml-auto">
          {isAuthenticated && user ? (
            <UserProfileCard
              imageUrl={user.imageUrl || '/default-profile.png'}
              name={user.username}
              role={user.role}
              plan={membershipPlan} 
              onLogout={handleLogout}
            />
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