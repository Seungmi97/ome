import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 토큰 자동 삽입, 에러 핸들링 등 글로벌 설정도 가능
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('[✅ Auth Header Attached]', config.headers.Authorization);
  } else {
    console.warn('[❌ No accessToken — Auth header NOT attached]');
  }

  return config;
});

export default api;