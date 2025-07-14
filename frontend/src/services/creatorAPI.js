import api from './api';

export const uploadRecipe = (data) => api.post('/creator/recipe', data);
export const getMyRecipes = () => api.get('/creator/recipes');
export const getRevenue = () => api.get('/creator/revenue');