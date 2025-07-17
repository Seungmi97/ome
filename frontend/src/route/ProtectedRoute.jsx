import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export default function ProtectedRoute({ role }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user || user.role?.toUpperCase() !== role.toUpperCase()) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}