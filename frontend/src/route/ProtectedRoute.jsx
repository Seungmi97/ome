import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ role }) {
  const isAuthenticated = true; // 테스트용 로그인 여부
  const userRole = 'ADMIN';     // 테스트용 사용자 권한

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />; // 중요: 중첩 라우트를 위해 Outlet 필요
}
