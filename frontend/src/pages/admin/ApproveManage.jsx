import { useEffect, useState } from "react";

export default function CreatorRequestManage() {
  const [creators, setCreators] = useState([]);

  // 신청 목록 불러오기
  useEffect(() => {
    fetch("/admin/creators")
      .then(res => res.json())
      .then(data => {
        setCreators(data);
      })
      .catch(err => {
        console.error("작가 신청 목록 조회 실패", err);
      });
  }, []);

  // 승인 처리
  const handleApprove = async (id) => {
    try {
      const res = await fetch(`/admin/creators/${id}/approve`, {
        method: "POST",
      });

      if (res.ok) {
        alert("작가 신청이 승인되었습니다.");
        setCreators(creators.filter(c => c.id !== id));
      } else {
        alert("승인 실패");
      }
    } catch (err) {
      console.error("승인 오류", err);
    }
  };

  // 거절 처리
  const handleReject = async (id) => {
    if (!window.confirm("작가 신청을 거절하시겠습니까?")) return;

    try {
      const res = await fetch(`/admin/creators/${id}/reject`, {
        method: "POST",
      });

      if (res.ok) {
        alert("작가 신청이 거절되었습니다.");
        setCreators(creators.filter(c => c.id !== id));
      } else {
        alert("거절 실패");
      }
    } catch (err) {
      console.error("거절 오류", err);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">✍️ 작가 신청 관리</h1>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-gray-500">
            <th className="pb-2">닉네임</th>
            <th className="pb-2">이메일</th>
            <th className="pb-2">신청일</th>
            <th className="pb-2">관리</th>
          </tr>
        </thead>
        <tbody>
          {creators.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-400">신청된 작가가 없습니다.</td>
            </tr>
          ) : (
            creators.map((c) => (
              <tr key={c.id} className="border-b">
                <td className="py-2">{c.nickname}</td>
                <td>{c.email}</td>
                <td>{new Date(c.createdAt).toLocaleDateString("ko-KR")}</td>
                <td className="space-x-2">
                  <button onClick={() => handleApprove(c.id)} className="text-blue-500 hover:underline">승인</button>
                  <button onClick={() => handleReject(c.id)} className="text-red-500 hover:underline">거절</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
