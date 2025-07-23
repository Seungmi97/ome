import api from './api';

// ✅ 신고 생성
export const createReport = (data) => {
  return api.post('/reports', data);
};

// ✅ 신고 단일 조회
export const getReport = (id) => {
  return api.get(`/reports/${id}`);
};

// ✅ 신고 전체 목록 조회 (검색/페이징)
export const getAllReports = ({ targetType, keyword, page = 0, size = 10 } = {}) => {
  const params = {
    ...(targetType && { targetType }),
    ...(keyword && { keyword }),
    page,
    size,
  };
  return api.get('/reports', { params });
};