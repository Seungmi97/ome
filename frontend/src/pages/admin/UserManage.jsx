// src/pages/admin/UserManage.jsx
import React, { useState } from 'react';

const dummyUsers = [
  { id: 1, name: '박규환', email: 'kyu@example.com', role: 'USER', status: 'ACTIVE', joinedAt: '2024-12-01' },
  { id: 2, name: '박경훈', email: 'kyung@example.com', role: 'CREATOR', status: 'LEAVED', joinedAt: '2024-11-20' },
  { id: 3, name: '이서준', email: 'seo@example.com', role: 'USER', status: 'ACTIVE', joinedAt: '2025-01-15' },
];

export default function UserManage() {
  const [search, setSearch] = useState('');

  const filteredUsers = dummyUsers.filter(
    (user) =>
      user.name.includes(search) ||
      user.email.includes(search)
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">유저 관리</h2>

      {/* 검색 */}
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="이름 또는 이메일 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-4 py-2 w-1/3"
        />
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          onClick={() => alert('신고하기')}
        >
          신고하기
        </button>
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
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
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
      </div>
    </div>
  );
}