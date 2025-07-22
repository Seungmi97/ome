import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import FilterSidebar from '@/components/FilterSidebar';
import MainContent from '@/components/MainContent';
import MembershipSuccessModal from '@/components/modal/MembershipSuccessModal';
// import SignupSuccessModal from '@/components/modals/SignupSuccessModal'; // 회원가입 성공 모달 (추가 필요시 주석 해제)

const UserMainpage = () => {
  const [keywords, setKeywords] = useState([]);
//   const [showSignupModal, setShowSignupModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const location = useLocation();

  // 리다이렉션 source 확인 (signup or payment)
  useEffect(() => {
    const source = location.state?.source;

    if (source === 'signup') {
    //   setShowSignupModal(true);
    } else if (source === 'payment') {
      setShowPaymentModal(true);
    }

    window.history.replaceState({}, document.title); // 뒤로가기 방지
  }, []);

  const handleAddKeyword = (word) => {
    if (!keywords.includes(word.trim())) {
      setKeywords((prev) => [...prev, word.trim()]);
    }
  };

  const resetState = () => {
    setKeywords([]);
  };

  const handleRemoveKeyword = (word) => {
    setKeywords((prev) => prev.filter((k) => k !== word));
  };

  return (
    <MainLayout onReset={resetState}>
      <div className="flex gap-6">
        <FilterSidebar
          keywords={keywords}
          onRemoveKeyword={handleRemoveKeyword}
          onReset={resetState}
        />
        <div className="flex-1">
          <MainContent
            keywords={keywords}
            onAddKeyword={handleAddKeyword}
          />
        </div>
      </div>

      {/* 모달들 */}
      {/* <SignupSuccessModal open={showSignupModal} onClose={() => setShowSignupModal(false)} /> */}
      <MembershipSuccessModal open={showPaymentModal} onClose={() => setShowPaymentModal(false)} />
    </MainLayout>
  );
};

export default UserMainpage;