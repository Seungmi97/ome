import api from './api';

// ✅ 포토월 결제 검증 및 구독 처리
export const verifyPayment = (payload) => {
  return api.post('/payments/verify', payload);
};