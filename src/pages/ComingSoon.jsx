import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, CheckCircle, Sparkles, Smartphone } from 'lucide-react';

const ComingSoon = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const validateEmail = (email) => {
        // Validación básica de email
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const sanitizeEmail = (email) => {
        // Sanitizar el email para prevenir inyecciones
        return email.trim().toLowerCase().replace(/[<>]/g, '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const sanitizedEmail = sanitizeEmail(email);

        // Validaciones
        if (!sanitizedEmail) {
            setError('Por favor, introduce tu email');
            return;
        }

        if (!validateEmail(sanitizedEmail)) {
            setError('Por favor, introduce un email válido');
            return;
        }

        setIsSubmitting(true);

        try {
            // Guardar en localStorage (en producción usarías una API)
            const existingEmails = JSON.parse(localStorage.getItem('waitlistEmails') || '[]');

            // Verificar si el email ya existe
            if (existingEmails.includes(sanitizedEmail)) {
                setError('Este email ya está registrado en la lista de espera');
                setIsSubmitting(false);
                return;
            }

            // Agregar el nuevo email
            existingEmails.push(sanitizedEmail);
            localStorage.setItem('waitlistEmails', JSON.stringify(existingEmails));

            // Simular delay de red
            await new Promise(resolve => setTimeout(resolve, 1000));

            setIsSuccess(true);
            setEmail('');
        } catch (err) {
            setError('Hubo un error. Por favor, inténtalo de nuevo.');
        } finally {
            setIsSubmitting(false);
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
                <Link
                    to="/"
                    className="group flex items-center gap-2 text-secondary hover:text-primary transition-all duration-300 font-medium text-sm md:text-base"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
                    <span>Volver al inicio</span>
                </Link>
            </motion.div>

            <div className="w-full max-w-2xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center"
                >
                    {/* Logo */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="mb-8 flex justify-center"
                    >
                        <img src="/assets/logos/Ponsiv.png" alt="Ponsiv" className="h-16 md:h-20 w-auto" />
                    </motion.div>

                    {/* Icono de móvil */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="mb-8 flex justify-center"
                    >
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br from-accent to-black flex items-center justify-center shadow-2xl shadow-accent/30">
                            <Smartphone className="w-10 h-10 md:w-12 md:h-12 text-white" strokeWidth={2} />
                        </div>
                    </motion.div>

                    {/* Título */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-semibold text-primary mb-6 tracking-tight leading-tight"
                    >
                        Muy Pronto
                    </motion.h1>

                    {/* Descripción */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="text-base md:text-lg lg:text-xl text-secondary mb-12 max-w-xl mx-auto leading-relaxed"
                    >
                        La app de Ponsiv estará disponible muy pronto. Déjanos tu email y te avisaremos en cuanto esté lista para descargar.
                    </motion.p>

                    {/* Formulario o Success */}
                    {!isSuccess ? (
                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            onSubmit={handleSubmit}
                            className="max-w-md mx-auto"
                        >
                            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                                <div className="flex-1 relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-secondary group-focus-within:text-primary transition-colors">
                                        <Mail size={20} strokeWidth={2} />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-12 pr-4 py-4 bg-white border-2 border-zinc-200 rounded-2xl text-primary placeholder-secondary focus:border-accent/30 focus:ring-0 transition-all outline-none font-medium shadow-sm"
                                        placeholder="tu@email.com"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="group px-8 py-4 rounded-2xl bg-accent text-white font-semibold text-base hover:bg-black hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 shadow-xl shadow-accent/20 whitespace-nowrap"
                                >
                                    {isSubmitting ? (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                                    ) : (
                                        'Avisarme'
                                    )}
                                </button>
                            </div>

                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-destructive text-sm font-medium"
                                >
                                    {error}
                                </motion.p>
                            )}

                            <p className="text-xs text-secondary mt-4">
                                Al suscribirte, aceptas recibir notificaciones sobre el lanzamiento de Ponsiv.
                            </p>
                        </motion.form>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="max-w-md mx-auto bg-success-bg border-2 border-success/20 rounded-3xl p-8"
                        >
                            <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" strokeWidth={2} />
                            <h3 className="text-2xl font-semibold text-primary mb-2">¡Perfecto!</h3>
                            <p className="text-secondary">
                                Te hemos añadido a la lista de espera. Te avisaremos en cuanto la app esté disponible.
                            </p>
                        </motion.div>
                    )}

                    {/* Features preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
                    >
                        {[
                            { icon: Sparkles, text: 'Feed personalizado' },
                            { icon: Smartphone, text: 'iOS & Android' },
                            { icon: Mail, text: 'Notificaciones' },
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/50 border border-zinc-100">
                                <div className="w-12 h-12 rounded-2xl bg-secondary-background flex items-center justify-center">
                                    <item.icon className="w-6 h-6 text-accent" strokeWidth={2} />
                                </div>
                                <p className="text-sm font-semibold text-primary">{item.text}</p>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                <p className="text-center text-secondary text-xs md:text-sm mt-12 font-medium">
                    © {new Date().getFullYear()} Ponsiv Inc. Todos los derechos reservados.
                </p>
            </div>
        </div>
    );
};

export default ComingSoon;
