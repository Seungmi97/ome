import api from './api';

/**
 * 로그인 요청
 * @param {{ user_id: string, password: string }} payload
 * @returns {Promise<{ accessToken: string }>}
 */
export const login = (payload) => api.post('/auth/login', payload);

/**
 * 회원가입 요청
 * @param {{ user_id: string, password: string, email: string, role: string, username: string, applyAsCreator: boolean }} payload
 * @returns {Promise<any>}
 */
export const signup = (payload) => api.post('/auth/signup', payload);

/**
 * 사용자 ID 중복 확인
 * @param {string} userId
 * @returns {Promise<string>}
 */
export const checkUserIdDuplicate = (userId) =>
  api.get('/users/check-id', { params: { userId } });

/**
 * accessToken 갱신 (refreshToken은 쿠키에 있음)
 * @returns {Promise<{ accessToken: string }>}
 */
export const refresh = () => api.post('/auth/refresh');

/**
 * 프로필 이미지 업로드
 * @param {File} file
 * @returns {Promise<string>} 업로드된 이미지 URL
 */
export const uploadProfileImage = (file) => {
  const formData = new FormData();
  formData.append('file', file);

  return api.post('/users/upload-profile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

/**
 * 로그아웃 요청
 * @returns {Promise<any>}
 */
export const logout = () => api.post('/auth/logout');

/**st
 * 로그인한 유저 정보 조회
 * @returns {Promise<import('../types/user').User>}
 */
export const getMyProfile = () => api.get('/users/me'); 


// 회원 수정 요청
export const updateUserInfo = (payload) => {
  return api.put('/api/users/me', payload); // ✅ 실제 dto 구조로 수정
};

// 회원 탈퇴 요청
export const deleteAccount = () => {
  return api.delete('/users');
};