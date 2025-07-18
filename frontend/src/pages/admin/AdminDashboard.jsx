import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [creators, setCreators] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    creatorCount: 0,
    paidUserCount: 0,
    freeUserCount: 0,
  });

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    fetchUsers();
    fetchCreators();
    fetchStats();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: 0,
          size: 5,
        },
      });
      console.log('📦 유저 목록:', res.data);
      setUsers(res.data.content || []);
    } catch (err) {
      console.error('❌ 유저 불러오기 실패', err);
    }
  };

  const fetchCreators = async () => {
    try {
      const res = await axios.get('/api/admin/creators', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: 0,
          size: 5,
        },
      });
      console.log('📦 크리에이터 목록:', res.data);
      setCreators(res.data.content || []);
    } catch (err) {
      console.error('❌ 크리에이터 불러오기 실패', err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get('/api/admin/statistics', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('📊 통계 데이터:', res.data);
      setStats(res.data);
    } catch (err) {
      console.error('❌ 통계 데이터 불러오기 실패', err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">📊 관리자 대시보드</h2>

      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* 크리에이터 현황 */}
        <div className="bg-white rounded shadow p-4">
          <h3 className="font-semibold text-lg mb-2">크리에이터 현황</h3>
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-1">이름</th>
                <th className="text-left py-1">이메일</th>
              </tr>
            </thead>
            <tbody>
              {creators.map((c) => (
                <tr key={c.userId} className="border-t">
                  <td className="py-1">{c.username}</td>
                  <td className="py-1">{c.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 유저 현황 */}
        <div className="bg-white rounded shadow p-4">
          <h3 className="font-semibold text-lg mb-2">유저 현황</h3>
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-1">이름</th>
                <th className="text-left py-1">이메일</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.userId} className="border-t">
                  <td className="py-1">{u.username}</td>
                  <td className="py-1">{u.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 통계 시각화 */}
      <div className="space-y-4">
        <StatBar label="크리에이터 수" percent={stats.creatorCount || 0} color="bg-orange-400" />
        <StatBar label="유료 플랜 사용자 수" percent={stats.paidUserCount || 0} color="bg-green-500" />
        <StatBar label="무료 플랜 사용자 수" percent={stats.freeUserCount || 0} color="bg-blue-400" />
      </div>
    </div>
  );
}

function StatBar({ label, percent, color }) {
  return (
    <div className="flex items-center">
      <div className="w-3 h-3 rounded mr-2" style={{ backgroundColor: color }}></div>
      <span className="w-48">{label}</span>
      <div className="flex-1 h-2 bg-gray-200 mx-2 rounded overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${percent}%` }}></div>
      </div>
      <span className="w-10 text-right font-semibold">{percent}%</span>
    </div>
  );
}
