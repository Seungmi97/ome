import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserManage() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0); // 백엔드는 0부터 시작
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  // 🔁 유저 목록 불러오기
  useEffect(() => {
    fetchUsers();
  }, [search, page]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/admin/users', {
        params: {
          keyword: search,
          page,
          size,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      console.log('res.data:', res.data); // ✅ 확인용 로그

      // ✅ 응답 구조 방어 처리
      setUsers(Array.isArray(res.data.content) ? res.data.content : []);
      setTotalPages(res.data.totalPages || 0);
    } catch (err) {
      console.error('유저 불러오기 실패', err);
      setUsers([]);
      setTotalPages(0);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('정말로 강제 탈퇴시키겠습니까?')) return;
    try {
      await axios.delete(`/api/admin/users/${userId}/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      alert('회원 강제 탈퇴 완료');
      fetchUsers(); // 다시 로딩
    } catch (err) {
      alert('강제 탈퇴 실패');
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">유저 관리</h2>

      {/* 검색 */}
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="이름 또는 이메일 검색"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0); // 검색하면 첫 페이지로
          }}
          className="border rounded px-4 py-2 w-1/3"
        />
      </div>

      {/* 테이블 */}
      <div className="bg-white shadow rounded">
        <table className="w-full table-auto border">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">ID</th>
              <th>이름</th>
              <th>이메일</th>
              <th>권한</th>
              <th>상태</th>
              <th>가입일</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="p-3">{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        user.status === 'ACTIVE'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>{user.joinedAt}</td>
                  <td>
                    <button
                      className="text-red-600 hover:underline mr-2"
                      onClick={() => handleDelete(user.userId)}
                    >
                      탈퇴
                    </button>
                    <button className="text-blue-600 hover:underline">상세</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  검색 결과가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* 페이지네이션 */}
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            이전
          </button>
          <span className="px-3 py-1">
            {totalPages > 0 ? `${page + 1} / ${totalPages}` : '0 / 0'}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
            disabled={page >= totalPages - 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
