import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Bell, Search } from 'lucide-react';

export default function TopBar() {
    const { user } = useAuth();

    return (
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-zinc-50 flex items-center justify-between px-8 fixed top-0 right-0 left-64 z-10">
            {/* Search */}
            <div className="flex items-center w-96">
                <div className="relative w-full group">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-black transition-colors">
                        <Search className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-4 py-2.5 bg-zinc-50 border-none rounded-xl text-sm font-medium placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:bg-white transition-all"
                        placeholder="Buscar..."
                    />
                </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-6">
                {/* Notifications */}
                <button className="relative p-2 text-zinc-400 hover:text-black hover:bg-zinc-50 rounded-full transition-all duration-300">
                    <Bell className="h-5 w-5" strokeWidth={2} />
                    <span className="absolute top-2 right-2 block h-1.5 w-1.5 rounded-full bg-[#E3C393] ring-2 ring-white" />
                </button>

                {/* User info */}
                <div className="flex items-center space-x-3 pl-6 border-l border-zinc-100">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-black">{user?.name}</p>
                        <p className="text-xs text-zinc-500 capitalize">{user?.role || 'Admin'}</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-zinc-100 overflow-hidden ring-2 ring-white shadow-sm cursor-pointer hover:ring-zinc-200 transition-all">
                        {user?.logo ? (
                            <img src={user.logo} alt={user.name} className="h-full w-full object-cover" />
                        ) : (
                            <div className="h-full w-full flex items-center justify-center bg-black text-white font-bold text-base">
                                {user?.name?.charAt(0)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
