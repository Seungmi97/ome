import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup, login } from '@/services/authAPI';
import { useAuth } from '@/hooks/useAuth';
import logo from '@/assets/ome.png';
import ProgressButton from '@/components/ProgressButton';

export default function Signup() {
  const navigate = useNavigate();
  const { login: doLogin } = useAuth();

  const [form, setForm] = useState({
    id: '',
    password: '',
    passwordConfirm: '',
    email: '',
    username: '',
    role: 'user',
  });
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(''); // 비밀번호 불일치 에러 메시지
  const [signupError, setSignupError] = useState(''); // 회원가입 실패 에러 메시지

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setPasswordError('');
    setSignupError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.passwordConfirm) {
      setPasswordError('비밀번호를 다시 확인해주세요.');
      setSignupError('');
      return;
    }

    setLoading(true);
    try {
      await signup({
        id: form.id,
        password: form.password,
        email: form.email,
        username: form.username,
        role: form.role,
      });

      const res = await login({ id: form.id, password: form.password });
      await doLogin({ accessToken: res.data.accessToken });
      navigate('/user/home');
    } catch (err) {
      if (err.response && err.response.data) {
        setSignupError(err.response.data.message || '회원가입에 실패하였습니다.');
      } else {
        setSignupError('회원가입에 실패하였습니다. 다시 시도해주세요.');
      }
      console.error(err);
      setPasswordError('');
      setSignupError('회원가입에 실패하였습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Link to="/">
            <img src={logo} alt="OME 로고" className="h-20 w-auto mr-2 cursor-pointer" />
          </Link>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input label="ID" name="id" value={form.id} onChange={handleChange} />
          <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} />
          <Input label="Password Confirm" name="passwordConfirm" type="password" value={form.passwordConfirm} onChange={handleChange} />
          
          <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
          <Input label="Username" name="username" value={form.username} onChange={handleChange} />
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="user">일반 유저</option>
              <option value="creator">크리에이터</option>
            </select>
          </div>
          <ProgressButton type="submit" isLoading={loading}>가입하기</ProgressButton>
          {passwordError && <p className="text-sm text-red-500 text-center mt-2">{passwordError}</p>}
          {signupError && <p className="text-sm text-red-500 text-center mt-2">{signupError}</p>}
        </form>
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
      <input
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        {...props}
      />
    </div>
  );
}