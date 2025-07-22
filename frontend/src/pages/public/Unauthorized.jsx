import React from 'react';

export default function Unauthorized() {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-red-600">
      <h1 className="text-3xl font-bold">⚠️ 접근 권한 없음</h1>
      <p className="mt-4">이 페이지에 접근할 수 있는 권한이 없습니다.</p>
    </div>
  );
}
