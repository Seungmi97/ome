import React from 'react';
import { Link } from 'react-router-dom';
import logo from '@/assets/ome.png';

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* 로고 */}
        <Link to="/" className="text-2xl font-bold text-gray-800 flex items-center gap-1">
          <img src={logo} alt="OME 로고" className="h-16 w-auto" />
        </Link>

        {/* 버튼들 */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-medium bg-yellow-400 hover:bg-yellow-500 text-black rounded-md transition px-4 py-2"
          >
            로그인
          </Link>
          <Link
            to="/signup"
            className="text-sm font-medium bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md transition"
          >
            회원가입
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;