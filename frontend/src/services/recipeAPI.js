import api from './api';

// ✅ 전체 레시피 목록 조회 (검색/필터 포함)
export const getRecipeList = (params = {}) => {
  return api.get('/recipes', { params });
};

// ✅ 개별 레시피 상세 조회
export const getRecipeDetail = (id) => {
  return api.get(`/recipes/${id}`);
};

// ✅ 레시피 등록
export const createRecipe = (formData) => {
  return api.post('/recipes', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};


// ✅ 레시피 수정
export const updateRecipe = (id, data) => {
  return api.patch(`/recipes/${id}`, data);
};

// ✅ 레시피 삭제
export const deleteRecipe = (id) => {
  return api.delete(`/recipes/${id}`);
};

// ✅ 이미지 업로드 (multipart/form-data)
export const uploadRecipeImage = (formData) => {
  return api.post('/recipes/media', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// ✅ 이미지 삭제
export const deleteRecipeImage = (id) => {
  return api.delete(`/recipes/media/${id}`);
};

// ✅ 전체 작가 목록 조회
export const getCreatorList = () => {
  return api.get('/creators');
};

// ✅ 작가별 평균 북마크 수 조회
export const getCreatorAvgBookmark = () => {
  return api.get('/recipes/id/bookmark/avg');
};