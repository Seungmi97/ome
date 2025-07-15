import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@/route/ProtectedRoute';
import UserMainpage from '@/pages/user/UserMainpage';
import CreatorMainpage from '@/pages/creator/CreatorMainpage';
import AdminDashboard from '@/pages/admin/AdminDashboard';

export default function ProtectedRoutes({ role }) {
  return (
    <ProtectedRoute>
      <Routes>
        {role === 'USER' && (
          <Route path="/user/main" element={<UserMainpage />} />
        )}
        {role === 'CREATOR' && (
          <Route path="/creator/main" element={<CreatorMainpage />} />
        )}
        {role === 'ADMIN' && (
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        )}
      </Routes>
    </ProtectedRoute>
  );
}