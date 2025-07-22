import { useEffect, useState } from 'react';
import { getAllReports } from '@/services/adminAPI'; // adminApi.js에서 getAllReports 함수 가져오기

export default function ReportManage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    getAllReports({ page: 0, size: 20 }) // 함수 호출 
      .then(res => setReports(res.data.content))
      .catch(err => console.error('신고 목록 불러오기 실패:', err));
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">신고된 항목 목록</h1>
      <table className="w-full table-auto border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">신고자</th>
            <th className="p-2 border">대상</th>
            <th className="p-2 border">사유</th>
            <th className="p-2 border">상태</th>
            <th className="p-2 border">날짜</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(report => (
            <tr key={report.id}> {/* key 값 확인하기 -> report.id || report.report.id */}
              <td className="p-2 border text-center">{report.id}</td>
              <td className="p-2 border text-center">{report.reporter}</td>
              <td className="p-2 border text-center">{report.target}</td>
              <td className="p-2 border text-center">{report.reason}</td>
              <td className="p-2 border text-center">{report.status}</td>
              <td className="p-2 border text-center">
                {new Date(report.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
