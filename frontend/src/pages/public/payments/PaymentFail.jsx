import { useNavigate } from 'react-router-dom';

export default function PaymentFail() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-red-400 mb-4">❌ 결제에 실패했습니다</h1>
        <p className="text-sm text-gray-300 mb-6">
          PG사 설정 오류 또는 사용자가 결제를 취소했을 수 있어요.
        </p>
        <button
          onClick={() => navigate('/payments')}
          className="w-full py-2 bg-gradient-to-r from-yellow-500 to-red-500 text-white rounded-md font-semibold hover:opacity-90 transition"
        >
          다시 결제 시도하기
        </button>
      </div>
    </div>
  );
}