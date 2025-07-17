import api from './api';
import axios from 'axios';

// 1) ApproveManage 작가 신청 목록 조회
export const getCreatorApplications = ({ keyword, page, size }) => {
  return api.get('/admin/creators', {
    params: { keyword, page, size },
  });
};

export const approveCreator = (userId) => {
  return api.post(`/admin/creators/${userId}/approve`);
};

export const rejectCreator = (userId) => {
  return api.post(`/admin/creators/${userId}/reject`);
};

//  전체 유저 목록 조회
export const getAllUsers = ({ keyword = '', page = 0, size = 10 } = {}) => {
  const token = localStorage.getItem('accessToken');
  return axios.get('/api/admin/users', {
    params: { keyword, page, size },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


//회원 강제 탈퇴 (비활성화 처리)
  export const deleteUser = (userId) => {
    return api.delete(`/admin/users/${userId}/delete`);
};

// 신고 전체 목록 조회
export const getAllReports = ({ targetType = '', keyword = '', page = 0, size = 10 } = {}) => {
  return api.get('/admin/reports', {
    params: { targetType, keyword, page, size },
  });
};

// 신고 상세 조회
export const getReportDetail = (reportId) => {
  return api.get(`/admin/reports/${reportId}`);
};