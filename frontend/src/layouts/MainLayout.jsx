import React, { useEffect, useState } from 'react';
import Header from '@/layouts/Header';


const getSystemTheme = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const getInitialTheme = () => {
  if (localStorage.theme === 'light') return 'light';
  if (localStorage.theme === 'dark') return 'dark';
  return getSystemTheme();
};

const MainLayout = ({ children, onReset }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.theme = 'dark';
    } else if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.theme = 'light';
    } else {
      localStorage.removeItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
  }, [theme]);

  // 테마 토글 함수
  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
      <Header onReset={onReset} />

      <main className="p-6">{children}</main>

      {/* 단일 토글 버튼 */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-4 right-4 px-4 py-2 border rounded bg-white dark:bg-gray-800 dark:text-white shadow"
      >
        {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
      </button>
    </div>
  );
};

export default MainLayout;