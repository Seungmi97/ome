import { useEffect, useState } from 'react';
import { getAllReports } from '@/services/adminAPI';  // 신고 목록 조회 API -> adminAPI.js

export default function ReportManage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    getAllReports().then(res => {
      console.log(res.data.content); // 1. 여기서 객체 구조 확인해 
      setReports(res.data.content);
    });
} , []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">신고된 레시피 목록</h1>

      <table className="w-full table-auto border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">신고자</th>
            <th className="p-2 border">타입</th>
            <th className="p-2 border">대상</th>
            <th className="p-2 border">사유</th>
            <th className="p-2 border">상태</th>
            <th className="p-2 border">신고일</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}> {/* 1번에서 객체 구조 확인한 다음 report.id 나 report.report.id 로 사용할 것 */ }
              <td className="p-2 border text-center">{report.id}</td>
              <td className="p-2 border text-center">{report.reporter}</td>
              <td className="p-2 border text-center">{report.targetType}</td>
              <td className="p-2 border text-center">{report.target}</td>
              <td className="p-2 border text-center">{report.reason}</td>
              <td className="p-2 border text-center">
                <span className={`px-2 py-1 rounded text-white text-sm ${report.status === 'PENDING' ? 'bg-yellow-500' : 'bg-green-500'}`}>
                  {report.status}
                </span>
              </td>
              <td className="p-2 border text-center">{new Date(report.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
