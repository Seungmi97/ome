import React, { useEffect, useState } from 'react';
import { getAllUsers } from '@/services/adminAPI';

const AdminDashboard = () => {
  const [creators, setCreators] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers(); // 모든 유저 데이터 가져오기
        const allUsers = res.data;

        setCreators(allUsers.filter(user => user.role === 'CREATOR'));
        setUsers(allUsers.filter(user => user.role === 'USER'));
      } catch (error) {
        console.error('유저 불러오기 실패:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">📊 관리자 대시보드</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* 크리에이터 현황 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">크리에이터 현황</h2>
          <table className="w-full text-left text-sm text-gray-600">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="pb-2">이름</th>
                <th className="pb-2">이메일</th>
              </tr>
            </thead>
            <tbody>
              {creators.map((creator) => (
                <tr key={creator.id} className="border-b">
                  <td className="py-2">{creator.name}</td>
                  <td>{creator.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 유저 현황 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">유저 현황</h2>
          <table className="w-full text-left text-sm text-gray-600">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="pb-2">이름</th>
                <th className="pb-2">이메일</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="py-2">{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 통계 바 */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">이용자 통계</h2>
        <div className="space-y-4">
          <div>
            <p className="mb-1 text-sm text-gray-600">🟧 크리에이터 수 - {creators.length}</p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-orange-400 h-3 rounded-full"
                style={{ width: `${(creators.length / (creators.length + users.length || 1)) * 100}%` }}
              />
            </div>
          </div>
          <div>
            <p className="mb-1 text-sm text-gray-600">🟩 유저 수 - {users.length}</p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-400 h-3 rounded-full"
                style={{ width: `${(users.length / (creators.length + users.length || 1)) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
