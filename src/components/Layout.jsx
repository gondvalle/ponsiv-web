import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-[#FAFAFA]"> {/* Cleaner off-white background */}
            <Sidebar />
            <TopBar />
            <main className="pl-64 pt-20 min-h-screen transition-all duration-300 ease-in-out">
                <div className="p-8 max-w-[1600px] mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
