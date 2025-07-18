import React from 'react';
import { Search, Loader2 } from 'lucide-react';

export default function ProgressSearchBar({ search, setSearch, loading }) {
  return (
    <div className="flex items-center gap-3 w-full max-w-md">
      {/* 검색창 */}
      <div className="flex items-center border rounded-md px-3 py-2 bg-white dark:bg-gray-800 w-full relative">
        <Search size={18} className="text-gray-500 dark:text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="ml-2 bg-transparent outline-none w-full text-sm text-gray-800 dark:text-white pr-6"
        />
        {loading && (
          <Loader2 className="absolute right-2 animate-spin w-4 h-4 text-gray-500 dark:text-gray-400" />
        )}
      </div>
    </div>
  );
}