import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginAPI } from '@/services/authAPI';
import { Link } from 'react-router-dom';
import logo from '@/assets/ome-logo.svg'; // 실제 사용할 경우에만 유지
import { useAuth } from '@/hooks/useAuth'; // 실제 사용할 경우만 유지

import ProgressButton from '@/components/ProgressButton';


export default function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // AuthContext 사용할 경우에만
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    try {
      const res = await loginAPI({ id, password });
      const { accessToken, user } = res.data;

      // AuthContext 사용 시:
      login({ user, accessToken });

      // 직접 저장하는 경우 (Context 없이):
      // localStorage.setItem('accessToken', accessToken);

      // 유저 role에 따라 리다이렉트
      const role = res.data.user?.role;
      if (role === 'ADMIN') navigate('/admin/dashboard');
      else if (role === 'CREATOR') navigate('/creator/main');
      else navigate('/user/main');

    } catch (err) {
      setErrorMessage('아이디 또는 비밀번호를 다시 입력해주세요.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }

  };

  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow">
          {/* 로고 */}
          <div className="flex items-center justify-center mb-1">
            <Link to="/">
              <img
                src={logo}
                alt="OME 로고"
                className="h-20 w-auto mr-2 cursor-pointer"
              />
            </Link>
          </div>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">ID</label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="아이디를 입력하세요."
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요."
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 mr-2 text-green-600"
              />
              <label htmlFor="remember" className="text-sm text-gray-700">
                아이디 저장
              </label>
            </div>

            <ProgressButton isLoading={isLoading} type="submit">
              로그인
            </ProgressButton>

            <Link to="/signup">
              <button
                type="button"
                className="w-full py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600"
              >
                회원가입
              </button>
            </Link>
            {errorMessage && (
              <p className="text-red-500 text-sm text-center mt-2">
                {errorMessage}
              </p>
            )}
          </form>
        </div>
      </div>
  );
}