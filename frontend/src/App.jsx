import { Routes, Route } from "react-router-dom";
import PublicRoutes from "@/route/PublicRoute";
import ProtectedRoutes from "@/route/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      {/* 퍼블릭 */}
      <Route path="/*" element={<PublicRoutes />} />

      {/* 프로텍티드 */}
      <Route path="/user/*" element={<ProtectedRoutes role="USER" />} />
      <Route path="/creator/*" element={<ProtectedRoutes role="CREATOR" />} />
      <Route path="/admin/*" element={<ProtectedRoutes role="ADMIN" />} />
    </Routes>
  );
}