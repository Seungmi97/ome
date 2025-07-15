import api from './api';

/**
 * 로그인 요청
 * @param {{ id: string, password: string }} payload
 * @returns {Promise<{ accessToken: string }>}
 */
export const login = (payload) => api.post('/auth/login', payload);

/**
 * 회원가입 요청
 * @param {{ id: string, password: string, email: string }} payload
 * @returns {Promise<any>}
 */
export const signup = (payload) => api.post('/auth/signup', payload);

/**
 * accessToken 갱신 (refreshToken은 쿠키에 있음)
 * @returns {Promise<{ accessToken: string }>}
 */
export const refresh = () => api.post('/auth/refresh');

/**
 * 로그아웃 요청
 * @returns {Promise<any>}
 */
export const logout = () => api.post('/auth/logout');

/**st
 * 로그인한 유저 정보 조회
 * @returns {Promise<import('@/types/User').User>}
 */
export const getMyProfile = () => api.get('/users/me'); 