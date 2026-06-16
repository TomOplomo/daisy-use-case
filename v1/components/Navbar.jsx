import React from 'react';
import { useRouter } from 'next/router';
import lang from '../locales/fr.json';

export default function Navbar() {
    const router = useRouter();

    const isActive = (path) => router.pathname === path;

    const baseTabStyle = "text-sm font-medium cursor-pointer pb-1 transition-colors";
    const activeTabStyle = "text-white border-b-2 border-white";
    const inactiveTabStyle = "text-white/70 hover:text-white border-b-2 border-transparent";

    return (
        <nav className="bg-daisy-purple text-white px-6 md:px-12 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">

            <div className="text-2xl font-bold tracking-tighter cursor-pointer">
                {lang.brandName}
            </div>

            <ul className="hidden md:flex items-center gap-8 mt-1">
                <li className={`${baseTabStyle} ${isActive('/dashboard') ? activeTabStyle : inactiveTabStyle}`}>
                    {lang.navDashboard}
                </li>
                <li className={`${baseTabStyle} ${isActive('/calendar') ? activeTabStyle : inactiveTabStyle}`}>
                    {lang.navCalendar}
                </li>
                <li className={`${baseTabStyle} ${isActive('/clients') ? activeTabStyle : inactiveTabStyle}`}>
                    {lang.navClients}
                </li>
                <li className={`${baseTabStyle} ${isActive('/settings') ? activeTabStyle : inactiveTabStyle}`}>
                    {lang.navSettings}
                </li>
            </ul>

            <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {lang.btnProfile}
                </button>
            </div>

        </nav>
    );
}
