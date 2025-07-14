import api from './api';

export const login = (payload) => api.post('/auth/login', payload);
export const signup = (payload) => api.post('/auth/signup', payload);
export const refresh = () => api.post('/auth/refresh');
export const logout = () => api.post('/auth/logout');
export const getMyProfile = () => api.get('/users/me'); 