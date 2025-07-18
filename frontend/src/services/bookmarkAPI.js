import api from './api';

// ✅ 찜 추가
export const addBookmark = (recipeId) => {
  return api.post(`/bookmarks/${recipeId}`); // ✅ 백엔드 경로 일치
};

// ✅ 찜 취소
export const removeBookmark = (recipeId) => {
  return api.delete(`/bookmarks/${recipeId}`);
};

// ✅ 내가 찜한 레시피 목록 조회
export const getMyBookmarks = () => {
  return api.get('/bookmarks');
};

// ✅ 특정 레시피 찜 여부 확인 (exists)
export const isBookmarked = (recipeId) => {
  return api.get(`/bookmarks/${recipeId}/exists`);
};