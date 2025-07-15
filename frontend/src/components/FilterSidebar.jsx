import React from 'react';
import { Home, Folder, Settings } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const FilterSidebar = ({ keywords = [], onRemoveKeyword, onReset }) => {
  const { isAuthenticated, user } = useAuth();
  const role = user?.role;

  return (
    <aside className="w-64 h-fit min-h-screen bg-white dark:bg-gray-800 text-black dark:text-white px-6 py-8 space-y-8 shadow-md border-r border-gray-200 dark:border-gray-700">
      {/* 타이틀 */}
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">OME</span>
        <span className="text-gray-500 dark:text-gray-400 text-sm">▾</span>
      </div>

      {/* 메뉴 */}
      <nav className="space-y-4">
        <SidebarItem icon={<Home size={18} />} label="Home" onClick={onReset} />

        {isAuthenticated && (role === 'user' || role === 'creator') && (
          <SidebarItem icon={<Folder size={18} />} label="멤버십 관리" />
        )}

        {role === 'creator' && (
          <SidebarItem icon={<Settings size={18} />} label="크리에이터 관리페이지" />
        )}
      </nav>

      {/* 필터 키워드 */}
      <div>
        <h4 className="text-xs text-gray-500 dark:text-gray-400 mb-2">Filter Keywords</h4>
        <div className="flex flex-wrap gap-2">
          {keywords.length === 0 && (
            <span className="text-xs text-gray-400 italic">No keywords</span>
          )}
          {keywords.map((tag) => (
            <span
              key={tag}
              className="flex items-center bg-gray-200 dark:bg-gray-700 text-sm px-3 py-1 rounded-full gap-1"
            >
              {tag}
              <button
                onClick={() => onRemoveKeyword(tag)}
                className="text-xs hover:text-red-500 ml-1"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
};

const SidebarItem = ({ icon, label, onClick }) => {
  return (
    <div
      className="flex items-center gap-3 cursor-pointer hover:text-yellow-500 dark:hover:text-yellow-400 transition"
      onClick={onClick}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </div>
  );
};

export default FilterSidebar;