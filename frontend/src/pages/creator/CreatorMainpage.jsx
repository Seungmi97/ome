import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import FilterSidebar from '@/components/FilterSidebar';
import MainContent from '@/components/MainContent';
// import SignupSuccessModal from '@/components/modals/SignupSuccessModal';
import MembershipSuccessModal from '@/components/modal/MembershipSuccessModal';

const CreatorMainpage = () => {
  const [keywords, setKeywords] = useState([]);
  // const [showSignupModal, setShowSignupModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const source = location.state?.source;

    if (source === 'signup') {
      // setShowSignupModal(true);
    } else if (source === 'payment') {
      setShowPaymentModal(true);
    }

    // 히스토리 상태 초기화
    window.history.replaceState({}, document.title);
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

      {/* <SignupSuccessModal open={showSignupModal} onClose={() => setShowSignupModal(false)} /> */}
      <MembershipSuccessModal open={showPaymentModal} onClose={() => setShowPaymentModal(false)} />
    </MainLayout>
  );
};

export default CreatorMainpage;