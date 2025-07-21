import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserManage() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [creators, setCreators] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchUsers();
    fetchCreators();
  }, [search, page]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/admin/users', {
        params: { keyword: search, page, size },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      setUsers(res.data.content || []);
      setTotalPages(res.data.totalPages || 0);
    } catch (err) {
      console.error('유저 불러오기 실패', err);
      setUsers([]);
      setTotalPages(0);
    }
  };

  const fetchCreators = async () => {
    try {
      const res = await axios.get('/api/admin/creators/all', {
        params: { keyword: search, page, size },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      setCreators(res.data.content || []);
    } catch (err) {
      console.error('작가 불러오기 실패', err);
      setCreators([]);
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
      fetchUsers();
      fetchCreators();
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
            setPage(0);
          }}
          className="border rounded px-4 py-2 w-1/3"
        />
      </div>

      {/* 일반 유저 테이블 */}
      <div className="bg-white shadow rounded mb-10">
        <h3 className="text-xl font-semibold p-4 border-b">👤 일반 유저</h3>
        <UserTable users={users} handleDelete={handleDelete} />
      </div>

      {/* 작가 유저 테이블 */}
      <div className="bg-white shadow rounded">
        <h3 className="text-xl font-semibold p-4 border-b">🎨 작가 유저</h3>
        <UserTable users={creators} handleDelete={handleDelete} />
      </div>

      {/* 페이지네이션 (공통) */}
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
  );
}
