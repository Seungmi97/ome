import { Routes, Route } from "react-router-dom";
import PublicRoutes from "@/route/PublicRoute";
import ProtectedRoutes from "@/route/ProtectedRoute";
import AdminDashboard from "@/pages/admin/AdminDashboard";


export default function App() {
  return (
    <Routes>
      {/* 퍼블릭 */}
      <Route path="/*" element={<PublicRoutes />} />
      <Route path="/test-admin" element={<AdminDashboard />} /> {/* 테스트용 관리자 대시보드 -> test-admin */}

      {/* 프로텍티드 */}
      <Route path="/user/*" element={<ProtectedRoutes role="USER" />} />
      <Route path="/creator/*" element={<ProtectedRoutes role="CREATOR" />} />
      <Route path="/admin/*" element={<ProtectedRoutes role="ADMIN" />} />
    </Routes>
  );
}