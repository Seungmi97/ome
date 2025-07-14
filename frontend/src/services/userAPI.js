import api from './api';

export const getUserProfile = () => api.get('/user/profile');
export const subscribeChannel = (channelId) => api.post(`/user/subscribe/${channelId}`);
export const getLikedRecipes = () => api.get('/user/likes');