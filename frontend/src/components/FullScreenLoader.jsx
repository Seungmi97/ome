import React from 'react';

const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-white border-t-amber-500 rounded-full animate-spin" />
    </div>
  );
};

export default FullScreenLoader;