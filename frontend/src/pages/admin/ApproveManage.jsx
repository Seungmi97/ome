import React, { useEffect, useState } from 'react';
import {
  getCreatorApplications,
  approveCreator,
  rejectCreator,
} from '@/services/adminAPI';

export default function ApproveManage() {
  const [approvals, setApprovals] = useState([]);
  const [page] = useState(0);
  const [size] = useState(10);

  const fetchApprovals = async () => {
    try {
      const res = await getCreatorApplications({ keyword: '', page, size });
      setApprovals(res.data.content); // ✅ 페이징 객체에서 content 꺼냄
    } catch (err) {
      console.error('작가 신청 목록 조회 실패:', err);
    }
  };

  const handleApprove = async (userId) => {
    try {
      await approveCreator(userId);
      setApprovals((prev) =>
        prev.map((item) =>
          item.userId === userId ? { ...item, approved: true } : item
        )
      );
    } catch (err) {
      console.error('작가 승인 실패:', err);
    }
  };

  const handleReject = async (userId) => {
    try {
      await rejectCreator(userId);
      setApprovals((prev) => prev.filter((item) => item.userId !== userId));
    } catch (err) {
      console.error('작가 거절 실패:', err);
    }
  };

  useEffect(() => {
    fetchApprovals();
  }, [fetchApprovals, page]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">작가 승인 관리</h2>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="w-full table-fixed">
          <colgroup>
            <col style={{ width: '33.33%' }} />
            <col style={{ width: '33.33%' }} />
            <col style={{ width: '33.33%' }} />
          </colgroup>
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">이름</th>
              <th className="p-3 text-left">이메일</th>
              <th className="p-3 text-center">작업</th>
            </tr>
          </thead>
          <tbody>
            {approvals.map((item) => (
              <tr key={item.userId} className="border-t">
                <td className="p-3 text-left break-words">{item.username}</td>
                <td className="p-3 text-left break-words">{item.email}</td>
                <td className="p-3 text-center">
                  {!item.approved ? (
                    <div className="flex justify-center gap-2">
                      <button
                        className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600"
                        onClick={() => handleApprove(item.userId)}
                      >
                        승인
                      </button>
                      <button
                        className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                        onClick={() => handleReject(item.userId)}
                      >
                        거절
                      </button>
                    </div>
                  ) : (
                    <div className="font-semibold text-green-600">
                      승인됨
                    </div>
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
