import api from './api';

// ✅ 현재 멤버십 정보 조회
export const getMembershipInfo = () => {
  return api.get('/memberships/me');
};

// ✅ 프리미엄 업그레이드
export const upgradeMembership = () => {
  return api.post('/memberships/upgrade');
};

// ✅ 프리미엄 해지 신청
export const cancelMembership = () => {
  return api.post('/memberships/cancel');
};