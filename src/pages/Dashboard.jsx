import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    TrendingUp,
    Users,
    ShoppingBag,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    Download,
    ChevronDown,
    Calendar
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const StatCard = ({ title, value, change, icon: Icon, trend }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-3xl shadow-sm border border-zinc-100 hover:shadow-xl hover:shadow-black/5 hover:border-zinc-200 transition-all duration-300"
    >
        <div className="flex justify-between items-start mb-5">
            <div className="p-3.5 bg-[#E3C393]/10 rounded-2xl group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6 text-[#E3C393]" strokeWidth={2} />
            </div>
            <span className={`flex items-center text-xs font-semibold ${trend === 'up'
                ? 'text-emerald-600 bg-emerald-50'
                : 'text-red-600 bg-red-50'
                } px-3 py-1.5 rounded-xl`}>
                {trend === 'up' ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                {change}
            </span>
        </div>
        <h3 className="text-zinc-500 text-sm font-semibold mb-2">{title}</h3>
        <p className="text-3xl font-bold text-black tracking-tight">{value}</p>
    </motion.div>
);

const Dashboard = () => {
    const { user } = useAuth();
    const [timeRange, setTimeRange] = useState('Últimos 7 días');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Mock data for the chart
    const data = [
        { name: 'Lun', sales: 4000 },
        { name: 'Mar', sales: 3000 },
        { name: 'Mié', sales: 2000 },
        { name: 'Jue', sales: 2780 },
        { name: 'Vie', sales: 1890 },
        { name: 'Sáb', sales: 2390 },
        { name: 'Dom', sales: 3490 },
    ];

    const timeRanges = ['Últimos 7 días', 'Últimos 30 días', 'Este año'];

    return (
        <div className="space-y-8 antialiased relative">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row md:justify-between md:items-end gap-4"
            >
                <div>
                    <h1 className="text-3xl md:text-4xl font-semibold text-black tracking-tight">Dashboard</h1>
                    <p className="text-zinc-500 mt-2 text-base">Bienvenido de nuevo, <span className="font-semibold text-black">{user?.username}</span></p>
                </div>
                <div className="flex gap-3 z-20">
                    {/* Custom Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 bg-white border border-zinc-200 text-sm font-semibold text-black py-3 px-5 rounded-2xl shadow-sm hover:border-zinc-300 hover:bg-zinc-50 transition-all min-w-[180px] justify-between"
                        >
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-zinc-400" />
                                <span>{timeRange}</span>
                            </div>
                            <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute top-full right-0 mt-2 w-full bg-white rounded-2xl shadow-xl border border-zinc-100 p-1.5 overflow-hidden"
                                >
                                    {timeRanges.map((range) => (
                                        <button
                                            key={range}
                                            onClick={() => { setTimeRange(range); setIsDropdownOpen(false); }}
                                            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${timeRange === range
                                                    ? 'bg-zinc-50 text-black'
                                                    : 'text-zinc-500 hover:bg-zinc-50 hover:text-black'
                                                }`}
                                        >
                                            {range}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <button className="group bg-black text-white text-sm font-semibold py-3 px-5 rounded-2xl shadow-lg shadow-black/20 hover:bg-zinc-800 hover:scale-105 transition-all duration-300 flex items-center gap-2">
                        <Download size={16} className="group-hover:translate-y-0.5 transition-transform" strokeWidth={2} />
                        <span>Descargar Reporte</span>
                    </button>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Ingresos Totales"
                    value="$45,231.89"
                    change="+20.1%"
                    icon={DollarSign}
                    trend="up"
                />
                <StatCard
                    title="Usuarios Activos"
                    value="2,338"
                    change="+15.2%"
                    icon={Users}
                    trend="up"
                />
                <StatCard
                    title="Nuevos Pedidos"
                    value="1,203"
                    change="-4.5%"
                    icon={ShoppingBag}
                    trend="down"
                />
                <StatCard
                    title="Crecimiento"
                    value="+12.5%"
                    change="+8.2%"
                    icon={TrendingUp}
                    trend="up"
                />
            </div>

            {/* Charts and Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue Chart */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="lg:col-span-2 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-zinc-100 hover:shadow-xl transition-all duration-300"
                >
                    <h3 className="text-lg md:text-xl font-semibold text-black mb-8 tracking-tight">Análisis de Ingresos</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#111111" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#111111" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#666', fontSize: 12, fontWeight: 600 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#666', fontSize: 12, fontWeight: 600 }}
                                    tickFormatter={(value) => `$${value}`}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        borderRadius: '16px',
                                        border: 'none',
                                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                                        padding: '12px 16px'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="sales"
                                    stroke="#111111"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorSales)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-zinc-100 hover:shadow-xl transition-all duration-300"
                >
                    <h3 className="text-lg md:text-xl font-semibold text-black mb-8 tracking-tight">Actividad Reciente</h3>
                    <div className="space-y-6">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div key={item} className="flex items-center gap-4 group">
                                <div className="w-11 h-11 rounded-2xl bg-zinc-50 flex items-center justify-center text-black font-bold text-sm group-hover:scale-110 transition-transform duration-300 border border-zinc-100">
                                    JD
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-black">Nuevo pedido #{1234 + item}</p>
                                    <p className="text-xs text-zinc-500 font-medium">Hace {item * 2} minutos</p>
                                </div>
                                <span className="text-sm font-bold text-emerald-600">+${120 + item * 10}.00</span>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-8 py-3.5 text-sm font-semibold text-black bg-zinc-50 rounded-2xl hover:bg-zinc-100 hover:scale-[1.02] transition-all duration-300">
                        Ver Toda la Actividad
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
