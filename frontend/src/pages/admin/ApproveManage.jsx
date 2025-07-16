import React, { useState } from 'react';

const dummyApprovals = [
  { id: 1, name: '김작가', email: 'author1@example.com', status: 'PENDING' },
  { id: 2, name: '이작가', email: 'author2@example.com', status: 'PENDING' },
  { id: 3, name: '박작가', email: 'author3@example.com', status: 'APPROVED' },
];

export default function ApproveManage() {
  const [approvals, setApprovals] = useState(dummyApprovals);

  const handleApprove = (id) => {
    setApprovals((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'APPROVED' } : item
      )
    );
  };

  const handleReject = (id) => {
    setApprovals((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">승인 관리</h2>

      <div className="bg-white shadow rounded">
        <table className="w-full table-auto border">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">이름</th>
              <th>이메일</th>
              <th>상태</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            {approvals.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3">{item.name}</td>
                <td>{item.email}</td>
                <td>{item.status}</td>
                <td>
                  {item.status === 'PENDING' ? (
                    <>
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                        onClick={() => handleApprove(item.id)}
                      >
                        승인
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => handleReject(item.id)}
                      >
                        거절
                      </button>
                    </>
                  ) : (
                    <span className="text-green-600">승인됨</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
