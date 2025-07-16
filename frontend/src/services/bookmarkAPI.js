import api from './api';

// ✅ 찜 추가
export const addBookmark = (recipeId) => {
  return api.post(`/recipes/${recipeId}/bookmark`);
};

// ✅ 찜 취소
export const removeBookmark = (recipeId) => {
  return api.delete(`/recipes/${recipeId}/bookmark`);
};

// ✅ 내가 찜한 레시피 목록 조회
export const getMyBookmarks = () => {
  return api.get('/recipes/bookmark');
};

// ✅ 특정 레시피의 찜 수 조회
export const getBookmarkCount = (recipeId) => {
  return api.get(`/recipes/${recipeId}/bookmark`);
};