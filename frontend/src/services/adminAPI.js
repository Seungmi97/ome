import api from './api';

//변동 있을 수 있음
// ✅ 작가 신청 목록 조회
export const getCreatorApplications = () => {
  return api.get('/admin/creators');
};

// ✅ 작가 승인
export const approveCreator = (id) => {
  return api.post(`/admin/creators/${id}/approve`);
};

// ✅ 작가 거절
export const rejectCreator = (id) => {
  return api.post(`/admin/creators/${id}/reject`);
};

// ✅ 전체 회원 목록 조회
export const getAllUsers = () => {
  return api.get('/admin/users');
};

// ✅ 회원 강제 탈퇴 (비활성화 처리)
export const deactivateUser = (userId) => {
  return api.patch(`/admin/users/${userId}/deactivate`);
};