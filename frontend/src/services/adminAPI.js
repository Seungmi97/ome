import api from './api';

export const getAllUsers = () => api.get('/admin/users');
export const deleteUser = (userId) => api.delete(`/admin/user/${userId}`);
export const approveRecipe = (recipeId) => api.post(`/admin/recipe/${recipeId}/approve`);