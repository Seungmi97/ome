import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const UserProfileCard = ({ imageUrl, name, role, plan }) => {
  const { logout } = useAuth();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex items-center space-x-3 p-3 rounded-xl border border-purple-400 shadow-sm transition-all duration-200"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={imageUrl}
        alt={`${name} 프로필`}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <p className="text-sm font-semibold text-gray-800">
          {name}{' '}
          <span className="text-gray-500 font-normal">
            {role}
          </span>
        </p>
        <p className="text-xs text-purple-700 font-medium">{plan}</p>
      </div>

      {hovered && (
        <button
          onClick={logout}
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition"
          title="로그아웃"
        >
          <LogOut size={18} />
        </button>
      )}
    </div>
  );
};

export default UserProfileCard;