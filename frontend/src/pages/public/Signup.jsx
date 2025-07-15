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
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.passwordConfirm) {
      return alert('비밀번호가 일치하지 않습니다.');
    }

    setLoading(true);
    try {
      await signup({
        id: form.id,
        password: form.password,
        email: form.email,
        username: form.username,
      });

      const res = await login({ id: form.id, password: form.password });
      await doLogin({ accessToken: res.data.accessToken });
      navigate('/user/home');
    } catch (err) {
      alert('회원가입 실패: ' + err?.response?.data?.message || err.message);
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
          
          {/* Email + 인증코드 전송 */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <div className="flex gap-2">
              <Input name="email" type="email" value={form.email} className="flex-grow px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500" onChange={handleChange} />
              <button type="button" className="px-4 py-2 bg-black text-white rounded" onClick={() => alert('인증코드가 전송되었습니다.')}>
                인증코드
              </button>
            </div>
          </div>
          <Input label="username" name="username" value={form.username} onChange={handleChange} />
          <ProgressButton type="submit" isLoading={loading}>가입하기</ProgressButton>
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



