import { Link } from 'react-router-dom';
import logo from '@/assets/ome.png';


export default function Signup() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow">
        {/* 로고 */}
        <div className="flex items-center justify-center gap-2 mb-1">
          <Link to="/">
            <img
              src={logo}
              alt="OME 로고"
              className="h-20 w-auto mr-2 cursor-pointer"
            />
          </Link>
        </div>

        <form className="space-y-4">
          {/* ID */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">ID</label>
            <input
              type="text"
              placeholder="아이디를 입력하세요."
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요."
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password Confirm */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password Confirm</label>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요."
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Email + 인증코드 전송 */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="이메일을 입력하세요."
                className="flex-grow px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="button"
                className="px-4 py-2 bg-black text-white rounded"
              >
                인증코드
              </button>
            </div>
          </div>

          {/* Nickname */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Nickname</label>
            <input
              type="text"
              placeholder="닉네임을 입력하세요."
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* 가입하기 버튼 */}
          <button
            type="submit"
            className="w-full py-2 text-white bg-green-600 rounded hover:bg-green-700"
          >
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
}