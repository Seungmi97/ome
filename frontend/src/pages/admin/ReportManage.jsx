import { useEffect, useState } from "react";

export default function ReportManage() {
  const [reports, setReports] = useState([]);

  // 신고 리스트 불러오기
  useEffect(() => {
    fetch("/admin/reports?page=0&size=10")
      .then(res => res.json())
      .then(data => {
        setReports(data.content);
      })
      .catch(err => {
        console.error("신고 목록 로드 실패", err);
      });
  }, []);

  // 신고 무시 처리
  const handleIgnore = async (id) => {
    try {
      const res = await fetch(`/admin/reports/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "REJECTED" }),
      });

      if (res.ok) {
        setReports(reports.filter(r => r.id !== id));
        alert("신고가 무시 처리되었습니다.");
      } else {
        alert("무시 처리 실패");
      }
    } catch (err) {
      console.error("무시 처리 중 오류", err);
    }
  };

  // 신고 승인 처리 (레시피 삭제 의미)
  const handleDelete = async (id) => {
    if (!window.confirm("이 레시피를 신고 승인(삭제) 처리하시겠습니까?")) return;

    try {
      const res = await fetch(`/admin/reports/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "APPROVED" }),
      });

      if (res.ok) {
        setReports(reports.filter(r => r.id !== id));
        alert("신고가 승인 처리되었습니다.");
      } else {
        alert("삭제 처리 실패");
      }
    } catch (err) {
      console.error("삭제 처리 중 오류", err);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">🚨 레시피 신고 관리</h1>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-gray-500">
            <th className="pb-2">레시피</th>
            <th className="pb-2">신고자</th>
            <th className="pb-2">사유</th>
            <th className="pb-2">신고일</th>
            <th className="pb-2">관리</th>
          </tr>
        </thead>
        <tbody>
          {reports.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-400">신고된 항목이 없습니다.</td>
            </tr>
          ) : (
            reports.map((r) => (
              <tr key={r.id} className="border-b">
                <td className="py-2">{r.target}</td>
                <td>{r.reporter}</td>
                <td>{r.reson}</td>
                <td>{new Date(r.createdAt).toLocaleDateString("ko-KR")}</td>
                <td className="space-x-2">
                  <button onClick={() => handleIgnore(r.id)} className="text-blue-500 hover:underline">무시</button>
                  <button onClick={() => handleDelete(r.id)} className="text-red-500 hover:underline">삭제</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
