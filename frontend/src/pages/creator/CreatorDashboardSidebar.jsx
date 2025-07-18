import React from 'react';
import { Users, FileText, BarChart2, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SidebarProfileCard from './SidebarProfileCard';
import logo from '@/assets/ome-logo.svg'; // ✅ 로고 import

export default function CreatorDashboardSidebar() {
    const navigate = useNavigate();

    return (
        <aside className="w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-6 space-y-6">
            {/* ✅ 상단 로고 */}
            <div className="flex justify-center mb-4 cursor-pointer" onClick={() => navigate('/creator/main')}>
                <img src={logo} alt="OME 로고" className="h-20 w-auto dark:invert" />
            </div>

            <SidebarProfileCard />

            <nav className="space-y-4 pt-4">
                <SidebarItem icon={<Home size={18} />} label="Home" onClick={() => navigate('/creator/main')} />
                <SidebarItem icon={<Users size={18} />} label="구독자 관리" onClick={() => navigate('/creator/users')} />
                <SidebarItem icon={<FileText size={18} />} label="레시피 관리" onClick={() => navigate('/creator/recipes')} />
                <SidebarItem icon={<BarChart2 size={18} />} label="통계 시스템" onClick={() => navigate('/creator/stats')} />        
            </nav>
        </aside>
    );
}

function SidebarItem({ icon, label, onClick }) {
    return (
        <div
            className="flex items-center gap-3 cursor-pointer text-sm text-gray-800 dark:text-white hover:text-yellow-500 dark:hover:text-yellow-400 transition"
            onClick={onClick}
        >
            {icon}
            <span>{label}</span>
        </div>
    );
}