import React, { useState } from 'react';
import { Search, Trash2 } from 'lucide-react';

export default function CreatorDashboardUserViewContent() {
  const dummyUsers = [
    { id: 1, name: 'Marvin McKinney', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Ronald Richards', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'Cameron Williamson', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, name: 'Arlene McCoy', avatar: 'https://i.pravatar.cc/150?img=4' },
    { id: 5, name: 'Jerome Bell', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: 6, name: 'Dianne Russell', avatar: 'https://i.pravatar.cc/150?img=6' },
  ];

  const [search, setSearch] = useState('');
  const [users, setUsers] = useState(dummyUsers);

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 flex-1">
      <h1 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
        구독자 리스트
      </h1>

      {/* 검색바 */}
      <div className="flex items-center border rounded-md px-3 py-2 mb-4 bg-white dark:bg-gray-800 w-full max-w-md">
        <Search size={18} className="text-gray-500 dark:text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="ml-2 bg-transparent outline-none w-full text-sm text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      {/* 유저 리스트 */}
      <ul className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm space-y-4">
        {filtered.map((user) => (
          <li key={user.id} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-medium text-gray-800 dark:text-white">
                {user.name}
              </span>
            </div>
            <button
              onClick={() => handleDelete(user.id)}
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white p-2 rounded-full hover:bg-red-600 hover:text-white transition"
            >
              <Trash2 size={16} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}