import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './AuthContext';
import { getMyProfile } from '@/services/authAPI';

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem('accessToken'));
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const isAuthenticated = !!accessToken && !!user;

  /**
   * 로그아웃: 클라이언트 상태 + 로컬스토리지 정리, 로그인 페이지로 이동
   */
  const clearAuth = useCallback(() => {
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  }, [navigate]);

  /**
   * 서버에서 사용자 정보 조회 및 저장
   */
  const fetchUserProfile = useCallback(async () => {
    try {
      const res = await getMyProfile();
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
    } catch (err) {
      console.error('❌ 사용자 정보 조회 실패:', err);
      clearAuth();
    }
  }, [clearAuth]);

  /**
   * 로그인 처리: 토큰 저장 + 프로필 조회 → role 반환
   */
  const login = useCallback(
    async ({ accessToken }) => {
      localStorage.setItem('accessToken', accessToken);
      setAccessToken(accessToken);
      await fetchUserProfile();

      const savedUser = JSON.parse(localStorage.getItem('user'));
      return savedUser?.role;
    },
    [fetchUserProfile]
  );

  /**
   * 첫 진입 시: accessToken 유효성 검사 + 프로필 복구
   */
  useEffect(() => {
    const restoreSession = async () => {
      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        const decoded = jwtDecode(accessToken);
        const exp = decoded.exp * 1000;
        const now = Date.now();

        if (exp < now) {
          clearAuth();
        } else {
          await fetchUserProfile();
        }
      } catch (err) {
        console.error('❌ JWT decode 실패:', err);
        clearAuth();
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, [accessToken, fetchUserProfile, clearAuth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated,
        login,
        logout: clearAuth,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};