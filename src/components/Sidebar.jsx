import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Gift, Camera, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
    const { logout } = useAuth();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: ShoppingBag, label: 'Catálogo', path: '/catalog' },
        { icon: Gift, label: 'Bonos', path: '/bonuses' },
        { icon: Camera, label: 'Looks', path: '/looks' },
        { icon: User, label: 'Perfil', path: '/profile' },
    ];

    return (
        <div className="h-screen w-64 bg-white border-r border-zinc-100 flex flex-col fixed left-0 top-0 z-20">
            {/* Logo */}
            <div className="h-20 flex items-center px-8 border-b border-zinc-50">
                <div className="flex items-center gap-3">
                    <img src="/assets/logos/Ponsiv.png" alt="Ponsiv" className="h-6 w-auto opacity-90" />
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-8 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `relative flex items-center px-4 py-3 rounded-xl transition-all duration-300 group ${isActive
                                ? 'bg-black text-white shadow-lg shadow-black/10'
                                : 'text-zinc-500 hover:bg-zinc-50 hover:text-black'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon
                                    className={`w-5 h-5 mr-3 transition-all duration-300 ${isActive
                                        ? 'text-[#E3C393]'
                                        : 'text-zinc-400 group-hover:text-black'
                                        }`}
                                    strokeWidth={1.5}
                                />
                                <span className="font-medium text-sm tracking-wide">{item.label}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Logout button */}
            <div className="p-4 border-t border-zinc-50">
                <button
                    onClick={logout}
                    className="group flex items-center w-full px-4 py-3 text-zinc-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-300"
                >
                    <LogOut className="w-5 h-5 mr-3 group-hover:scale-105 transition-transform duration-300" strokeWidth={1.5} />
                    <span className="font-medium text-sm tracking-wide">Cerrar Sesión</span>
                </button>
            </div>
        </div>
    );
}
