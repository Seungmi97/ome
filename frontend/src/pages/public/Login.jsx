import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginAPI } from '@/services/authAPI';
import { Link } from 'react-router-dom';
import logo from '@/assets/ome-logo.svg';
import { useAuth } from '@/hooks/useAuth';
import ProgressButton from '@/components/ProgressButton';

export default function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await loginAPI({ user_id: id, password });
      const token = res.data.token;

      // AuthContext에 토큰 저장 + 사용자 정보 fetch
      const role = await login({ accessToken: token });

      // 역할별로 라우팅
      if (role === 'USER') navigate('/user/main');
      else if (role === 'CREATOR') navigate('/creator/main');
      else if (role === 'ADMIN') navigate('/admin');
      else navigate('/unauthorized');

    } catch (err) {
      console.error(err);
      setErrorMessage('아이디 또는 비밀번호를 다시 입력해주세요.');
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
            <img src={logo} alt="OME 로고" className="h-20 w-auto mr-2 cursor-pointer" />
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
            <input type="checkbox" id="remember" className="w-4 h-4 mr-2 text-green-600" />
            <label htmlFor="remember" className="text-sm text-gray-700">아이디 저장</label>
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
            <p className="text-red-500 text-sm text-center mt-2">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}