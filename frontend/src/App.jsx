import { Routes, Route, Navigate } from "react-router-dom";
import PublicRoutes from "@/route/PublicRoute";
import ProtectedRoute from "@/route/ProtectedRoute";

import RecipeUploadForm from "@/pages/creator/RecipeUploadForm";

import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import ApproveManage from "@/pages/admin/ApproveManage";
import UserManage from "@/pages/admin/UserManage";
import ReportManage from "@/pages/admin/ReportManage";
import RecipeManage from "@/pages/admin/RecipeManage";
import Unauthorized from '@/pages/public/Unauthorized';
import UserMainpage from "@/pages/user/UserMainpage";
import CreatorMainpage from "@/pages/creator/CreatorMainpage";

export default function App() {
  return (
    <Routes>
      {/* 퍼블릭 라우트 */}
      <Route path="/*" element={<PublicRoutes />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* 유저 보호 라우트 */}
      <Route element={<ProtectedRoute role="USER" />}>
        <Route path="/user/main" element={<UserMainpage />} />
      </Route>

      {/* 크리에이터 보호 라우트 */}
      <Route element={<ProtectedRoute role="CREATOR" />}>
        <Route path="/creator/main" element={<CreatorMainpage />} />
        <Route path="/creator/recipes/upload" element={<RecipeUploadForm />} />
      </Route>

      {/* 관리자 보호 라우트 + 레이아웃 */}
      <Route element={<ProtectedRoute role="ADMIN" />}>
        <Route path="/admin" element={<AdminDashboardLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="approve-manage" element={<ApproveManage />} />
          <Route path="report" element={<ReportManage />} />
          <Route path="comment-manage" element={<CommentManage />} />
          <Route path="user-manage" element={<UserManage />} />
          <Route path="qna" element={<QnAManage />} />
          <Route path="recipes" element={<RecipeManage />} />
          {/* 관리자 메뉴별로 추가 */}
        </Route>
      </Route>
    </Routes>
  );
}
