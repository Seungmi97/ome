import { useEffect, useState } from 'react';
import { verifyPayment } from '@/services/paymentAPI';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import LoadingModal from '@/components/modal/LoadingModal';

export default function PaymentPage() {
  const { user } = useAuth();
  const role = user?.role?.toUpperCase();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const impId = import.meta.env.VITE_IMP_ID;
      if (window.IMP) {
        window.IMP.init(impId);
        console.log('✅ IMP Initialized:', window.IMP._id);
      } else {
        console.warn('❌ IMP 객체 없음');
      }
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handlePayment = () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    const { IMP } = window;

    IMP.request_pay({
      pg: 'kcp',
      pay_method: 'card',
      merchant_uid: 'mid_' + Date.now(),
 //   customer_uid: "user_123456",  // 고객 식별자 (선택 사항) 정기결제 시 필수
      name: '프리미엄 멤버십 카드 등록',
      amount: 9900,
      buyer_email: user.email || 'test@test.com',
      buyer_name: user.nickname || '사용자',
      buyer_tel: '01012345678',
      buyer_addr: '서울특별시',
      buyer_postcode: '12345'
    }, async (rsp) => {
      console.log('[✅ 결제 응답]', rsp);
      if (rsp.success) {
        setIsLoading(true);

        try {
          await verifyPayment({
            imp_uid: rsp.imp_uid,
            merchant_uid: rsp.merchant_uid,
          });

          // ✅ 5초 대기
          await new Promise((res) => setTimeout(res, 5000));

          // ✅ 역할 기반 리다이렉트 + 결제 모달 트리거
          if (role === 'CREATOR') {
            navigate('/creator/main', { state: { source: 'payment' } });
          } else {
            navigate('/user/main', { state: { source: 'payment' } });
          }

        } catch (err) {
          console.error('[❌ 결제 검증 실패]', err);
          navigate('/payments/error');
        } finally {
          setIsLoading(false);
        }
      } else {
        alert('❌ 결제 실패: ' + rsp.error_msg);
      }
    });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gray-900 text-white">
        <h1 className="text-3xl font-bold mb-2">OME</h1>
        <p className="text-sm text-gray-400 mb-10">요리 레시피 공유 플랫폼</p>

        <div className="bg-gray-800 p-6 rounded-md w-full max-w-md shadow-lg space-y-6">
          <div>
            <p className="text-base font-semibold text-center mb-2">프리미엄 멤버십</p>
            <p className="text-sm text-gray-400 text-center">레시피를 즐겨찾고 크리에이터를 구독해보세요</p>
          </div>

          <div className="bg-gray-700 px-4 py-3 rounded flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">O</div>
              <span className="text-sm font-medium">프리미엄 사용자</span>
            </div>
            <div className="text-yellow-400 text-xs font-semibold">선택됨</div>
          </div>

          <button
            onClick={handlePayment}
            className="w-full bg-gradient-to-r from-purple-400 to-blue-500 text-white py-2 rounded-md font-semibold hover:opacity-90 transition"
          >
            결제하기 ₩9,900
          </button>

          <p className="text-xs text-center text-gray-500 mt-4">
            테스트 모드: 실제 결제 없이 프론트엔드 기능을 테스트할 수 있습니다.
          </p>
        </div>

        <footer className="mt-12 text-xs text-gray-600">&copy; 2024 OME. All rights reserved.</footer>
      </div>

      <LoadingModal open={isLoading} message="결제 승인 확인 중입니다..." />
    </>
  );
}