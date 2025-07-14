import api from './api';

/**
 * 내 프로필 정보 가져오기
 * @returns {Promise<import('@/types/user').User>}
 */
export const getUserProfile = () => api.get('/user/me');

/**
 * 채널 구독 요청
 * @param {string} channelId - 구독할 채널 ID
 * @returns {Promise<any>}
 */
export const subscribeChannel = (channelId) =>
  api.post(`/user/subscribe/${channelId}`);

/**
 * 찜한 레시피 목록 조회
 * @returns {Promise<Array<{ id: string, title: string, price: string }>>}
 */
export const getLikedRecipes = () => api.get('/user/likes');