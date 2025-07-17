import { useEffect, useState, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './AuthContext';
import { refresh as refreshAPI, getMyProfile } from '@/services/authAPI';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem('accessToken'));
  const [loading, setLoading] = useState(true); // ✅ 추가됨

  const isAuthenticated = !!accessToken && !!user;

  const logout = useCallback(() => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
  }, []);

  const fetchUserProfile = useCallback(async () => {
    try {
      const res = await getMyProfile();
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
    } catch (err) {
      console.error('사용자 정보 조회 실패:', err);
      logout();
    }
  }, [logout]);

  const login = useCallback(
    async ({ accessToken }) => {
      localStorage.setItem('accessToken', accessToken);
      setAccessToken(accessToken);
      await fetchUserProfile();
    },
    [fetchUserProfile]
  );

  // ✅ 최초 마운트 시 accessToken 있으면 프로필 조회
  useEffect(() => {
    const restore = async () => {
      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        const decoded = jwtDecode(accessToken);
        const exp = decoded.exp * 1000;
        const now = Date.now();
        const buffer = 30 * 1000;

        if (exp < now) {
          logout();
        } else {
          await fetchUserProfile(); // ✅ 유저 상태 복구
          const timeout = setTimeout(async () => {
            try {
              const res = await refreshAPI();
              const newAccessToken = res.data.accessToken;
              localStorage.setItem('accessToken', newAccessToken);
              setAccessToken(newAccessToken);
              console.log('🔄 accessToken 자동 갱신됨');
              await fetchUserProfile();
            } catch (err) {
              console.error('refresh 실패', err);
              logout();
              alert('세션이 만료되어 로그아웃되었습니다.');
            }
          }, exp - now - buffer);

          return () => clearTimeout(timeout);
        }
      } catch (err) {
        console.error('JWT decode 실패:', err);
        logout();
      } finally {
        setLoading(false); // ✅ 무조건 완료됨
      }
    };

    restore();
  }, [accessToken, fetchUserProfile, logout]);

  return (
    <AuthContext.Provider value={{ user, accessToken, isAuthenticated, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};