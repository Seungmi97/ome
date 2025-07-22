import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [creators, setCreators] = useState([]);
  const [users, setUsers] = useState([]); // 전체(관리자 포함) 유저 목록
  const token = localStorage.getItem('accessToken');

  // -----------------------------
  // 데이터 로딩
  // -----------------------------
  useEffect(() => {
    fetchUsers();
    fetchCreators();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: 0, size: 100 }, // 대시보드라면 충분히 큰 값으로 한 페이지 가져오기
      });
      console.log('📦 유저 목록:', res.data);
      setUsers(res.data.content || []);
    } catch (err) {
      console.error('❌ 유저 불러오기 실패', err);
      setUsers([]);
    }
  };

  const fetchCreators = async () => {
    try {
      const res = await axios.get('/api/creators', {
        headers: { Authorization: `Bearer ${token}` }, // 공개 API이면 없어도 동작 가능
      });
      console.log('📦 작가 목록:', res.data);
      setCreators(res.data || []);
    } catch (err) {
      console.error('❌ 작가 불러오기 실패', err);
      setCreators([]);
    }
  };

  // -----------------------------
  // 통계 계산 (프론트)
  // -----------------------------
  const stats = useMemo(() => {
    // users 배열은 ADMIN/USER/CREATOR 등 모든 계정 포함 (AdminUserController 응답)
    const total = users.length;

    const userCount = users.filter((u) => u.role === 'USER').length;
    const creatorCountFromUsers = users.filter((u) => u.role === 'CREATOR').length;
    const adminCount = users.filter((u) => u.role === 'ADMIN').length;

    // 승인된 크리에이터(관리자 응답 기반)
    const approvedCreators = users.filter(
      (u) => u.role === 'CREATOR' && u.creatorStatus === 'APPROVED'
    ).length;

    // 퍼센트 계산 헬퍼
    const pct = (n, d) => (d === 0 ? 0 : Math.round((n / d) * 100));

    return {
      total,
      userCount,
      creatorCount: creatorCountFromUsers, // 관리자 응답 기준
      adminCount,
      approvedCreatorCount: approvedCreators,
      pctUser: pct(userCount, total),
      pctCreator: pct(creatorCountFromUsers, total),
      pctAdmin: pct(adminCount, total),
      pctApprovedCreator: pct(approvedCreators, creatorCountFromUsers || 1),
    };
  }, [users]);

  // -----------------------------
  // 렌더
  // -----------------------------
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">📊 관리자 대시보드</h2>

      {/* 좌우: 작가 vs 일반유저 */}
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
              {creators.length > 0 ? (
                creators.map((c) => (
                  <tr key={c.userId} className="border-t">
                    <td className="py-1">{c.username}</td>
                    <td className="py-1">{c.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="py-2 text-center text-gray-400">
                    등록된 크리에이터가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 일반 유저 현황 */}
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
              {users.length > 0 ? (
                users
                  .filter((u) => u.role === 'USER') // 일반 유저만 표시
                  .map((u) => (
                    <tr key={u.userId} className="border-t">
                      <td className="py-1">{u.username}</td>
                      <td className="py-1">{u.email}</td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="2" className="py-2 text-center text-gray-400">
                    등록된 유저가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 통계 */}
      <div className="space-y-4">
        <StatBar label={`전체 계정 (${stats.total}명)`} percent={100} color="bg-gray-400" />
        <StatBar
          label={`크리에이터 (${stats.creatorCount}명)`}
          percent={stats.pctCreator}
          color="bg-orange-400"
        />
        <StatBar
          label={`일반 유저 (${stats.userCount}명)`}
          percent={stats.pctUser}
          color="bg-blue-400"
        />
        <StatBar
          label={`관리자 (${stats.adminCount}명)`}
          percent={stats.pctAdmin}
          color="bg-purple-400"
        />
      </div>
    </div>
  );
}

function StatBar({ label, percent, color }) {
  return (
    <div className="flex items-center">
      <div className={`w-3 h-3 rounded mr-2 ${color}`}></div>
      <span className="w-64">{label}</span>
      <div className="flex-1 h-2 bg-gray-200 mx-2 rounded overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${percent}%` }}></div>
      </div>
      <span className="w-14 text-right font-semibold">{percent}%</span>
    </div>
  );
}
