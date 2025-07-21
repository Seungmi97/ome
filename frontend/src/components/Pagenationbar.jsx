import React from 'react';

export default function Pagination({ page, totalPages, onPageChange }) {
  const MAX_VISIBLE = 5;

  const getVisiblePages = () => {
    if (totalPages <= MAX_VISIBLE) {
      return [...Array(totalPages)].map((_, i) => i);
    }

    const start = Math.max(0, Math.min(page - 2, totalPages - MAX_VISIBLE));
    return [...Array(MAX_VISIBLE)].map((_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-center mt-6 gap-2 items-center">
      {/* Prev */}
      <button
        onClick={() => onPageChange(Math.max(page - 1, 0))}
        disabled={page === 0}
        className="w-9 h-9 flex items-center justify-center rounded-full border text-sm
          text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40"
      >
        «
      </button>

      {/* Pages */}
      {visiblePages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-9 h-9 flex items-center justify-center text-sm font-medium transition
            rounded-full border leading-tight
            ${
              p === page
                ? 'bg-yellow-500 text-white border-yellow-500'
                : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
        >
          {p + 1}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => onPageChange(Math.min(page + 1, totalPages - 1))}
        disabled={page === totalPages - 1}
        className="w-9 h-9 flex items-center justify-center rounded-full border text-sm
          text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40"
      >
        »
      </button>
    </div>
  );
}
