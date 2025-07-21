import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

export default function CreatorDashboardSummaryContent() {
  const summary = {
    totalRecipes: 3671,
    totalLikes: 156,
    recipeGrowth: -0.03,
    likeGrowth: 0.1503,
  };

  const monthlyData = [
    { month: 'Jan', thisYear: 9000, lastYear: 10000 },
    { month: 'Feb', thisYear: 7000, lastYear: 9500 },
    { month: 'Mar', thisYear: 11000, lastYear: 12000 },
    { month: 'Apr', thisYear: 25000, lastYear: 13000 },
    { month: 'May', thisYear: 22000, lastYear: 15000 },
    { month: 'Jun', thisYear: 19000, lastYear: 16000 },
    { month: 'Jul', thisYear: 27000, lastYear: 20000 },
  ];

  const platformData = [
    { name: 'Linux', count: 12000 },
    { name: 'Mac', count: 23000 },
    { name: 'iOS', count: 19000 },
    { name: 'Windows', count: 26000 },
    { name: 'Android', count: 14000 },
    { name: 'Other', count: 22000 },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* 상단 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-xl">
          <p className="text-sm font-medium text-gray-700 dark:text-white">전체 레시피 수</p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{summary.totalRecipes.toLocaleString()}</h2>
          <p className="text-xs text-gray-500">{summary.recipeGrowth > 0 ? '📈' : '📉'} {summary.recipeGrowth * 100}%</p>
        </div>
        <div className="bg-indigo-100 dark:bg-indigo-900 p-6 rounded-xl">
          <p className="text-sm font-medium text-gray-700 dark:text-white">찜 수</p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{summary.totalLikes.toLocaleString()}</h2>
          <p className="text-xs text-gray-500">{summary.likeGrowth > 0 ? '📈' : '📉'} {summary.likeGrowth * 100}%</p>
        </div>
      </div>

      {/* 라인 차트 */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">전체 레시피 통계</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="thisYear" stroke="#8884d8" name="This year" />
            <Line type="monotone" dataKey="lastYear" stroke="#aaa" name="Last year" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 바 차트 */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">레시피별 찜수 통계</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={platformData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}