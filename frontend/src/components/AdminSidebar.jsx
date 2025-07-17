// src/components/admin/AdminSidebar.jsx
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { name: '통계 시스템', path: '/admin/dashboard', icon: '📊' },
  { name: '승인 관리', path: '/admin/approve-manage', icon: '📝' },
  { name: '유저 관리', path: '/admin/user-manage', icon: '👥' },
  { name: '신고 관리', path: '/admin/report', icon: '🚨' },
  { name: '레시피 목록', path: '/admin/recipes', icon: '🧾' },
  // { name: 'Q&A 응답', path: '/admin/qna', icon: '📮' },
];

export default function AdminSidebar() {
  const location = useLocation(); // 현재 사용자 페이지(현재 경로 URL)

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-6">
      <h1 className="text-xl font-bold mb-8">🍳 OME 관리자</h1>
      <nav className="space-y-3">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path} // 페이지 이동을 위한 링크
            className={`block px-4 py-2 rounded hover:bg-gray-700 ${
              location.pathname === item.path ? 'bg-gray-700' : ''
            }`}
          >
            <span className="mr-2">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
