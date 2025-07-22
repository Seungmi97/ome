import api from './api';

// ✅ 레시피 댓글 조회
export const fetchComments = (recipeId) =>
  api.get(`/recipes/comments/${recipeId}`);

// ✅ 댓글 등록
export const createComment = (recipeId, content, parentId = null) =>
  api.post(`/recipes/comments`, {
    recipeId,
    content,
    parentId,
  });

// ✅ 댓글 삭제
export const deleteComment = (commentId) =>
  api.delete(`/recipes/comments/${commentId}`);

// ✅ 댓글 수정
export const updateComment = (commentId, newContent) =>
  api.put(`/recipes/comments/${commentId}`, newContent, {
    headers: { 'Content-Type': 'text/plain' }
  });