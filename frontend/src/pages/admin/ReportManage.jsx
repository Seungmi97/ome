import { useEffect, useState } from "react";

const dummyReports = [
  { id: 1, recipeTitle: "불타는 김치찌개", reportedBy: "user1", reason: "욕설 포함", date: "2025-07-16" },
  { id: 2, recipeTitle: "짜장볶음밥", reportedBy: "user2", reason: "광고성 내용", date: "2025-07-15" },
];

export default function ReportManage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    setReports(dummyReports);
  }, []);

  const handleIgnore = (id) => {
    setReports(reports.filter(r => r.id !== id));
  };

  const handleDelete = (id) => {
    if (window.confirm("해당 레시피를 삭제하시겠습니까?")) {
      setReports(reports.filter(r => r.id !== id));
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
          {reports.map((r) => (
            <tr key={r.id} className="border-b">
              <td className="py-2">{r.recipeTitle}</td>
              <td>{r.reportedBy}</td>
              <td>{r.reason}</td>
              <td>{r.date}</td>
              <td className="space-x-2">
                <button onClick={() => handleIgnore(r.id)} className="text-blue-500 hover:underline">무시</button>
                <button onClick={() => handleDelete(r.id)} className="text-red-500 hover:underline">삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
