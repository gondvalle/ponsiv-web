import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Download, Mail, Calendar, MapPin, AlertCircle, Loader2, CheckCircle2, Shield, Database } from 'lucide-react';

const AdminWaitlist = () => {
    const [token, setToken] = useState('');
    const [emails, setEmails] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [authenticated, setAuthenticated] = useState(false);

    const handleLoadWaitlist = async () => {
        if (!token.trim()) {
            setError('Por favor, introduce el token de administrador');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/admin/waitlist', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 401) {
                setError('Token incorrecto. Verifica tus credenciales.');
                setAuthenticated(false);
                setEmails([]);
                setTotal(0);
                return;
            }

            if (response.status === 500) {
                setError('Error del servidor. Inténtalo de nuevo más tarde.');
                return;
            }

            if (!response.ok) {
                setError(`Error ${response.status}: No se pudo cargar la lista.`);
                return;
            }

            const data = await response.json();

            if (data.success) {
                setEmails(data.emails || []);
                setTotal(data.total || 0);
                setAuthenticated(true);
                setError('');
            } else {
                setError('Respuesta inesperada del servidor.');
            }
        } catch (err) {
            if (err.name === 'TypeError' && err.message.includes('fetch')) {
                setError('Error de conexión. Verifica tu red e inténtalo de nuevo.');
            } else {
                setError('Error inesperado: ' + err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleExportCSV = () => {
        if (emails.length === 0) {
            setError('No hay datos para exportar.');
            return;
        }

        const headers = ['email', 'timestamp', 'ip'];
        const rows = emails.map(item => [
            item.email,
            item.timestamp,
            item.ip || ''
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', 'ponsiv-waitlist.csv');
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        try {
            return new Date(timestamp).toLocaleString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        } catch {
            return timestamp;
        }
    };

    return (
        <div className="min-h-screen bg-[#02010A] text-white font-sans antialiased relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#E3C393]/10 to-transparent blur-[120px] opacity-60" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-zinc-900/50 to-transparent blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(circle_at_center,rgba(227,195,147,0.03),transparent_70%)]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-3 mb-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#E3C393]/20 blur-xl rounded-full" />
                            <Shield className="w-12 h-12 text-[#E3C393] relative" />
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-bold tracking-tight">
                            Admin <span className="text-[#E3C393]">Waitlist</span>
                        </h1>
                    </div>
                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                        Panel de administración exclusivo de Ponsiv
                    </p>
                </motion.div>

                {/* Authentication Card */}
                <AnimatePresence mode="wait">
                    {!authenticated && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5 }}
                            className="max-w-md mx-auto"
                        >
                            <div className="relative group">
                                {/* Glow effect */}
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E3C393] to-zinc-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-500" />

                                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-xl bg-[#E3C393]/10 flex items-center justify-center">
                                            <Lock className="w-5 h-5 text-[#E3C393]" />
                                        </div>
                                        <h2 className="text-xl font-semibold">Autenticación requerida</h2>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                                                Token de administrador
                                            </label>
                                            <input
                                                type="password"
                                                value={token}
                                                onChange={(e) => setToken(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && handleLoadWaitlist()}
                                                placeholder="Introduce tu token secreto"
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#E3C393]/50 focus:border-[#E3C393]/50 transition-all"
                                            />
                                        </div>

                                        <button
                                            onClick={handleLoadWaitlist}
                                            disabled={loading}
                                            className={`w-full py-3 px-6 rounded-xl font-semibold text-black transition-all duration-300 flex items-center justify-center gap-2 ${loading
                                                    ? 'bg-zinc-600 cursor-not-allowed'
                                                    : 'bg-[#E3C393] hover:bg-[#d4b482] hover:shadow-lg hover:shadow-[#E3C393]/20 hover:scale-[1.02]'
                                                }`}
                                        >
                                            {loading ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Autenticando...
                                                </>
                                            ) : (
                                                <>
                                                    <Shield className="w-5 h-5" />
                                                    Acceder al panel
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Error Message */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="max-w-2xl mx-auto mb-6"
                        >
                            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-center gap-3 backdrop-blur-sm">
                                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                                <span className="text-red-200 text-sm">{error}</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Success State */}
                <AnimatePresence>
                    {authenticated && emails.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="relative group"
                                >
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E3C393] to-transparent rounded-2xl blur opacity-20 group-hover:opacity-30 transition" />
                                    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Database className="w-5 h-5 text-[#E3C393]" />
                                            <span className="text-sm text-zinc-400 font-medium">Total registros</span>
                                        </div>
                                        <div className="text-4xl font-bold text-[#E3C393]">{total}</div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="relative group"
                                >
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-white/20 to-transparent rounded-2xl blur opacity-10 group-hover:opacity-20 transition" />
                                    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Mail className="w-5 h-5 text-white" />
                                            <span className="text-sm text-zinc-400 font-medium">Mostrando</span>
                                        </div>
                                        <div className="text-4xl font-bold">{emails.length}</div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="relative group"
                                >
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-transparent rounded-2xl blur opacity-20 group-hover:opacity-30 transition" />
                                    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                                        <button
                                            onClick={handleExportCSV}
                                            className="w-full h-full flex flex-col items-center justify-center gap-2 group-hover:scale-105 transition-transform"
                                        >
                                            <Download className="w-6 h-6 text-emerald-400" />
                                            <span className="text-sm font-semibold text-emerald-400">Exportar CSV</span>
                                        </button>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Table */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="relative group"
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E3C393]/10 to-zinc-600/10 rounded-3xl blur opacity-30" />
                                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="bg-white/5 border-b border-white/10">
                                                    <th className="px-6 py-4 text-left">
                                                        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                                            <Mail className="w-4 h-4" />
                                                            Email
                                                        </div>
                                                    </th>
                                                    <th className="px-6 py-4 text-left">
                                                        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                                            <Calendar className="w-4 h-4" />
                                                            Fecha
                                                        </div>
                                                    </th>
                                                    <th className="px-6 py-4 text-left">
                                                        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                                            <MapPin className="w-4 h-4" />
                                                            IP
                                                        </div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {emails.map((item, index) => (
                                                    <motion.tr
                                                        key={index}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.5 + index * 0.05 }}
                                                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                                                    >
                                                        <td className="px-6 py-4 text-sm font-medium">{item.email}</td>
                                                        <td className="px-6 py-4 text-sm text-zinc-300">{formatDate(item.timestamp)}</td>
                                                        <td className="px-6 py-4 text-sm text-zinc-400 font-mono">{item.ip || 'N/A'}</td>
                                                    </motion.tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Empty State */}
                <AnimatePresence>
                    {authenticated && emails.length === 0 && !loading && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="max-w-md mx-auto"
                        >
                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-transparent rounded-3xl blur opacity-30" />
                                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center">
                                    <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">Autenticado correctamente</h3>
                                    <p className="text-zinc-400">No hay registros en la waitlist todavía.</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AdminWaitlist;
