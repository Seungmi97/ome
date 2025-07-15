import { useEffect, useState, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './AuthContext';
import { refresh as refreshAPI, getMyProfile } from '@/services/authAPI';
import '@/types/User'; // 🔥 JSDoc 타입 인식용 (자동완성 가능하게 함)

export const AuthProvider = ({ children }) => {
  /** @type {[User|null, Function]} */
  const [user, setUser] = useState(null);

  const [accessToken, setAccessToken] = useState(() => {
    return localStorage.getItem('accessToken') || null;
  });

  const isAuthenticated = !!accessToken;

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
      setAccessToken(accessToken);
      localStorage.setItem('accessToken', accessToken);
      await fetchUserProfile();
    },
    [fetchUserProfile]
  );

  useEffect(() => {
    if (!accessToken) return;

    try {
      const decoded = jwtDecode(accessToken);
      const exp = decoded.exp * 1000;
      const now = Date.now();
      const buffer = 30 * 1000;

      if (exp < now) {
        logout();
      } else {
        const timeout = setTimeout(async () => {
          try {
            const res = await refreshAPI();
            const newAccessToken = res.data.accessToken;
            setAccessToken(newAccessToken);
            localStorage.setItem('accessToken', newAccessToken);
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
    }
  }, [accessToken, fetchUserProfile, logout]);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};