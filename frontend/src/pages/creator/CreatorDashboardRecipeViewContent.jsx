import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function CreatorDashboardRecipeViewContent() {
  const dummyRecipes = [
    { id: 1, title: 'Text', bookmarks: '1243', createdAt: '2023/09/17' },
    { id: 2, title: 'Text', bookmarks: '1235', createdAt: '2023/09/17' },
    { id: 3, title: 'Text', bookmarks: '353', createdAt: '2023/09/17' },
    { id: 4, title: 'Text', bookmarks: '1만', createdAt: '2023/09/17' },
    { id: 5, title: 'Text', bookmarks: '2만', createdAt: '2023/09/17' },
    { id: 6, title: 'Text', bookmarks: '23', createdAt: '2023/09/17' },
  ];

  const [search, setSearch] = useState('');

  const filtered = dummyRecipes.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 flex-1">
      <h1 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">레시피 목록</h1>

      {/* 검색창 */}
      <div className="flex items-center border rounded-md px-3 py-2 mb-4 bg-white dark:bg-gray-800 w-full max-w-md">
        <Search size={18} className="text-gray-500 dark:text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="ml-2 bg-transparent outline-none w-full text-sm text-gray-800 dark:text-white"
        />
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto rounded-xl border dark:border-gray-700">
        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
          <thead className="bg-gray-100 dark:bg-gray-800 text-xs uppercase text-gray-600 dark:text-gray-300">
            <tr>
              <th className="p-3"><input type="checkbox" /></th>
              <th className="p-3">Title</th>
              <th className="p-3">찜 수</th>
              <th className="p-3">생성일</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={r.id} className={`${i % 2 === 1 ? 'bg-gray-100 dark:bg-gray-800' : ''}`}>
                <td className="p-3"><input type="checkbox" /></td>
                <td className="p-3 font-medium">{r.title}</td>
                <td className="p-3">
                  <span className="text-green-600 font-semibold bg-green-100 px-2 py-1 rounded">
                    {r.bookmarks}
                  </span>
                </td>
                <td className="p-3">{r.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-6 gap-2">
        {[1, 2, 3, '...', 67, 68].map((p, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${p === 1 ? 'bg-black text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}