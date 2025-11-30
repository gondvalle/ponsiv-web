import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Lock, User, ArrowRight, AlertCircle, ArrowLeft, Mail, Building2 } from 'lucide-react';

const Register = () => {
    const [brandName, setBrandName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        setIsLoading(true);

        try {
            await register(brandName, email, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Error al registrarse. Inténtalo de nuevo.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-zinc-50/50 to-white p-4 relative overflow-hidden antialiased">
            {/* Fondos decorativos */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-48 -right-48 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-accent-muted/20 to-accent/10 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute -bottom-40 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-accent-muted/15 to-transparent blur-3xl" />
            </div>

            {/* Botón volver */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute top-6 md:top-8 left-4 md:left-8 z-10"
            >
                <button
                    onClick={() => navigate('/')}
                    className="group flex items-center gap-2 text-secondary hover:text-primary transition-all duration-300 font-medium text-sm md:text-base"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
                    <span>Volver al inicio</span>
                </button>
            </motion.div>

            <div className="w-full max-w-md relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-surface rounded-3xl shadow-2xl shadow-black/10 overflow-hidden border border-zinc-100"
                >
                    <div className="p-8 sm:p-10">
                        {/* Logo y título */}
                        <div className="flex flex-col items-center mb-8">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="mb-6"
                            >
                                <img src="/assets/logos/Ponsiv.png" alt="Ponsiv" className="h-10 w-auto" />
                            </motion.div>

                            <div className="text-center">
                                <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-2 tracking-tight">Únete a Ponsiv</h2>
                                <p className="text-secondary text-sm md:text-base">Crea tu cuenta de marca y empieza a crecer</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-destructive/10 text-destructive px-4 py-3.5 rounded-2xl flex items-center gap-3 text-sm font-medium border border-destructive/20"
                                >
                                    <AlertCircle size={18} className="flex-shrink-0" />
                                    <span>{error}</span>
                                </motion.div>
                            )}

                            <div className="space-y-4">
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-secondary group-focus-within:text-primary transition-colors">
                                        <Building2 size={20} />
                                    </div>
                                    <input
                                        type="text"
                                        value={brandName}
                                        onChange={(e) => setBrandName(e.target.value)}
                                        className="block w-full pl-12 pr-4 py-4 bg-secondary-background border-2 border-transparent rounded-2xl text-primary placeholder-secondary focus:border-accent/20 focus:bg-white transition-all outline-none font-medium"
                                        placeholder="Nombre de la Marca"
                                        required
                                    />
                                </div>

                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-secondary group-focus-within:text-primary transition-colors">
                                        <Mail size={20} />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-12 pr-4 py-4 bg-secondary-background border-2 border-transparent rounded-2xl text-primary placeholder-secondary focus:border-accent/20 focus:bg-white transition-all outline-none font-medium"
                                        placeholder="Email de contacto"
                                        required
                                    />
                                </div>

                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-secondary group-focus-within:text-primary transition-colors">
                                        <Lock size={20} />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-12 pr-4 py-4 bg-secondary-background border-2 border-transparent rounded-2xl text-primary placeholder-secondary focus:border-accent/20 focus:bg-white transition-all outline-none font-medium"
                                        placeholder="Contraseña"
                                        required
                                    />
                                </div>

                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-secondary group-focus-within:text-primary transition-colors">
                                        <Lock size={20} />
                                    </div>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="block w-full pl-12 pr-4 py-4 bg-secondary-background border-2 border-transparent rounded-2xl text-primary placeholder-secondary focus:border-accent/20 focus:bg-white transition-all outline-none font-medium"
                                        placeholder="Confirmar Contraseña"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group w-full flex justify-center items-center gap-2.5 py-4 px-4 rounded-2xl shadow-xl shadow-accent/20 text-white bg-accent hover:bg-black hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 font-semibold text-base"
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span>Crear Cuenta</span>
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="px-8 py-6 bg-gradient-to-b from-secondary-background to-zinc-50 border-t border-zinc-100 text-center">
                        <p className="text-sm text-secondary">
                            ¿Ya tienes cuenta? <Link to="/login" className="font-semibold text-accent hover:text-black transition-colors">Inicia sesión</Link>
                        </p>
                    </div>
                </motion.div>

                <p className="text-center text-secondary text-xs md:text-sm mt-8 font-medium">
                    © {new Date().getFullYear()} Ponsiv Inc. Todos los derechos reservados.
                </p>
            </div>
        </div>
    );
};

export default Register;
