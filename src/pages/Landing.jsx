import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    ArrowRight,
    Smartphone,
    Star,
    Zap,
    Layers,
    Users,
    Sparkles,
    TrendingUp,
    BarChart3,
    Heart,
    ShoppingBag,
    ShieldCheck,
    Eye,
    Target,
    Palette,
    Play,
    CheckCircle2
} from 'lucide-react';

import ropa1 from '../assets/clothes/ropa1.jpg';
import ropa2 from '../assets/clothes/ropa2.jpg';
import ropa3 from '../assets/clothes/ropa3.jpg';
import ropa4 from '../assets/clothes/ropa4.jpg';
import feed2 from '../assets/clothes/Feed2.png';
import look1 from '../assets/clothes/look1.png';
import look2 from '../assets/clothes/look2.png';
import look3 from '../assets/clothes/look3.png';

const navLinks = [
    { label: 'Qué es', href: '#que-es' },
    { label: 'Consumidores', href: '#consumidores' },
    { label: 'Marcas', href: '#marcas' },
    { label: 'Visión', href: '#vision' },
];

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.15
        }
    }
};

const Landing = () => {
    const { scrollY } = useScroll();
    const heroRef = useRef(null);

    // Parallax effects
    const y1 = useTransform(scrollY, [0, 500], [0, 100]);
    const y2 = useTransform(scrollY, [0, 500], [0, -50]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <div className="min-h-screen bg-background text-primary font-sans selection:bg-accent selection:text-white antialiased overflow-x-hidden">
            {/* NAVBAR */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-0 w-full z-50 border-b border-black/5 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 will-change-transform"
            >
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <div className="flex justify-between items-center h-20 md:h-24">
                        {/* Logo */}
                        <Link to="/" className="flex items-center group relative z-10">
                            <img
                                src="/assets/logos/Ponsiv.png"
                                alt="Ponsiv"
                                className="h-32 md:h-40 w-auto transition-transform duration-500 group-hover:scale-105"
                            />
                        </Link>

                        {/* Links desktop */}
                        <div className="hidden md:flex items-center gap-12 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            {navLinks.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="text-sm md:text-base lg:text-lg font-medium text-secondary hover:text-primary transition-colors relative group tracking-wide"
                                >
                                    {item.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300 ease-out" />
                                </a>
                            ))}
                        </div>

                        {/* CTA marcas */}
                        <div className="flex items-center gap-4 relative z-10">
                            <Link
                                to="/login"
                                className="group relative px-6 py-3 rounded-full bg-accent text-white text-xs md:text-sm font-medium hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <span className="relative flex items-center gap-2">
                                    Portal de Marcas
                                    <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* HERO */}
            <section ref={heroRef} className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 overflow-hidden min-h-[90vh] flex items-center">
                {/* Background Elements */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0.03),transparent_50%)]" />
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#E3C393]/10 to-transparent blur-[120px] opacity-60 transform-gpu" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-zinc-100 to-transparent blur-[100px] transform-gpu" />
                </div>

                <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 w-full">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
                        {/* Text Content */}
                        <div className="lg:col-span-6 text-center lg:text-left mb-20 lg:mb-0">
                            <motion.div
                                initial="initial"
                                animate="animate"
                                variants={staggerContainer}
                            >
                                <motion.div
                                    variants={fadeInUp}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-zinc-100 shadow-sm mb-10 mx-auto lg:mx-0"
                                >
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                                    </span>
                                    <span className="text-[11px] uppercase tracking-[0.2em] text-secondary font-semibold">
                                        Moda como contenido vivo
                                    </span>
                                </motion.div>

                                <motion.h1
                                variants={fadeInUp}
                                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-8 leading-[1.05] text-primary"
                                >
                                <span className="block whitespace-nowrap">
                                    Descubre, organiza,
                                </span>
                                <span className="relative inline-block block">
                                    <span className="relative z-10">
                                    combina & comparte.
                                    </span>
                                    <motion.span
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ delay: 0.8, duration: 1, ease: "circOut" }}
                                    className="absolute -bottom-1 left-0 h-4 bg-[#E3C393]/30 -z-10"
                                    />
                                </span>
                                </motion.h1>

                                <motion.p
                                    variants={fadeInUp}
                                    className="text-lg sm:text-xl text-secondary mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light"
                                >
                                    Un feed donde cada tarjeta es una prenda a pantalla completa.
                                    Marca lo que te gusta, organiza tu armario virtual y crea outfits listos para comprar,
                                    todo en una sola app pensada para cómo vivimos la moda hoy.
                                </motion.p>

                                <motion.div
                                    variants={fadeInUp}
                                    className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start"
                                >
                                    <Link
                                        to="/coming-soon"
                                        className="group px-8 py-4 rounded-full bg-primary text-white font-medium text-base hover:bg-zinc-800 transition-all duration-300 shadow-xl shadow-black/5 flex items-center justify-center gap-3"
                                    >
                                        <Smartphone size={20} className="group-hover:-rotate-12 transition-transform duration-300" />
                                        <span>Descargar app</span>
                                    </Link>

                                    <Link
                                        to="/login"
                                        className="group px-8 py-4 rounded-full bg-white border border-zinc-200 text-base font-medium text-primary hover:border-zinc-300 hover:bg-zinc-50 transition-all duration-300 flex items-center justify-center gap-3"
                                    >
                                        <span>Soy una marca</span>
                                        <ArrowRight className="w-4 h-4 text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* Hero Visual */}
                        <div className="lg:col-span-6 relative">
                            <motion.div
                                style={{ y: y1 }}
                                className="relative z-10 flex justify-center lg:justify-end will-change-transform"
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent blur-[80px] rounded-full transform translate-y-10" />
                                    <motion.img
                                        initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                                        src="/assets/images/app-mockup.png"
                                        alt="Interfaz de la app Ponsiv"
                                        className="relative w-[520px] sm:w-[620px] lg:w-[720px] h-auto drop-shadow-2xl will-change-transform"
                                    />

                                    {/* Floating Elements */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.6, duration: 0.8 }}
                                        className="absolute top-1/4 -right-2 lg:-right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 max-w-[200px]"
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
                                                <Sparkles size={14} className="text-primary" />
                                            </div>
                                            <span className="text-xs font-semibold">Match de estilo</span>
                                        </div>
                                        <p className="text-[10px] text-secondary leading-tight">
                                            El feed aprende de tus likes, guardados y compras para refinar cada look.
                                        </p>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.8, duration: 0.8 }}
                                        className="absolute bottom-1/4 -left-1 lg:-left-1 bg-primary text-white p-4 rounded-2xl shadow-xl max-w-[180px]"
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <TrendingUp size={14} className="text-[#E3C393]" />
                                            <span className="text-xs font-bold">+124%</span>
                                        </div>
                                        <p className="text-[10px] text-zinc-400 leading-tight">
                                            Más interacción que un e-commerce de moda tradicional.
                                        </p>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SCROLLING TEXT BANNER */}
            <div className="w-full bg-primary py-6 overflow-hidden whitespace-nowrap">
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="inline-block"
                >
                    {[...Array(8)].map((_, i) => (
                        <span key={i} className="text-white/90 text-xl md:text-2xl font-medium mx-8 tracking-wider">
                            DESCUBRE • ORGANIZA • COMBINA • COMPARTE •
                        </span>
                    ))}
                </motion.div>
            </div>

            {/* VALUE PROPOSITION */}
            <section id="que-es" className="py-32 lg:py-40 bg-white">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <div className="max-w-3xl mx-auto text-center mb-24">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-accent-muted font-semibold tracking-widest text-2xl md:text-3xl lg:text-4xl uppercase mb-4 block"
                        >
                            Qué es Ponsiv
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-tight"
                        >
                            Moda en un feed infinito.
                            <br />
                            <span className="text-secondary/50">Todo lo que ves, se puede comprar.</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-secondary leading-relaxed"
                        >
                            Ponsiv es un feed de moda a pantalla completa, con fotos y vídeos subidos por las marcas,
                            donde cada gesto cuenta. Desliza como en una red social, pero con la inmediatez de un
                            e-commerce: si te inspira, puedes comprarlo al instante.
                        </motion.p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                        {[
                            {
                                icon: Eye,
                                title: "Moda como contenido",
                                desc: "No es un catálogo de cuadrículas. Cada prenda ocupa toda la pantalla, se ve en contexto y se siente como contenido vivo dentro de tu día a día."
                            },
                            {
                                icon: Zap,
                                title: "Un feed por persona",
                                desc: "El algoritmo aprende de tu tiempo de visualización, likes, guardados, “lo tengo” y compras para mostrarte solo lo que encaja con tu estilo."
                            },
                            {
                                icon: ShoppingBag,
                                title: "Compra sin fricción",
                                desc: "Todo lo que aparece es comprable. Descubre, guarda para luego o compra en segundos sin salir de la experiencia inmersiva."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2, duration: 0.8 }}
                                className="group p-8 rounded-[2rem] bg-secondary-background hover:bg-primary transition-colors duration-500"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors duration-500">
                                    <item.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-500" />
                                </div>
                                <h3 className="text-xl font-bold mb-4 group-hover:text-white transition-colors duration-500">{item.title}</h3>
                                <p className="text-secondary group-hover:text-zinc-400 transition-colors duration-500 leading-relaxed">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ECOSYSTEM INTRO */}
            <section className="pt-32 pb-16 bg-[#F5F5F7]">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                            Más que una tienda,
                            <br />
                            <span className="text-accent-muted">tu ecosistema de moda diario.</span>
                        </h2>
                        <p className="text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
                            Ponsiv no es solo para comprar. Es para vivir la moda completa:
                            desde el descubrimiento hasta la creación de tu estilo personal.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 1: DISCOVER (FEED) */}
            <section id="consumidores" className="py-24 bg-[#F5F5F7] overflow-hidden">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <div className="lg:w-1/2 order-2 lg:order-1">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="relative flex justify-center">
                                <img
                                src={feed2}
                                alt="Feed de moda"
                                className="w-full max-w-md"
                                />
                            </motion.div>
                        </div>
                        <div className="lg:w-1/2 order-1 lg:order-2">
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-8 shadow-sm">
                                    <Smartphone className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-3xl md:text-5xl font-bold mb-6">Descubre.</h3>
                                <p className="text-lg text-secondary leading-relaxed mb-8">
                                    Un feed infinito vertical diseñado para la inspiración visual.
                                    Olvídate de las cuadrículas aburridas. Aquí cada prenda brilla a pantalla completa.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        "Videos y fotos en alta calidad",
                                        "Compra en un solo toque",
                                        "Guarda lo que te inspira"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-secondary font-medium">
                                            <CheckCircle2 className="w-5 h-5 text-accent" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: ORGANIZE (WARDROBE) */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <div className="lg:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="w-16 h-16 rounded-2xl bg-[#F5F5F7] flex items-center justify-center mb-8">
                                    <Layers className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-3xl md:text-5xl font-bold mb-6">Organiza.</h3>
                                <p className="text-lg text-secondary leading-relaxed mb-8">
                                    Tu armario físico, ahora digital. Sube fotos de tu ropa o marca prendas del feed como "Lo tengo".
                                    Ten todo tu inventario de estilo en el bolsillo.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        "Digitaliza tu ropa real",
                                        "Categorización automática con IA",
                                        "Filtra por color, tipo o temporada"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-secondary font-medium">
                                            <CheckCircle2 className="w-5 h-5 text-accent" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                        <div className="lg:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="grid grid-cols-2 gap-4 p-6 bg-[#F5F5F7] rounded-[2.5rem]"
                            >
                                {[
                                    ropa1,
                                    ropa2,
                                    ropa3,
                                    ropa4
                                ].map((src, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ y: -5 }}
                                        className="rounded-2xl overflow-hidden aspect-square shadow-md bg-white"
                                    >
                                        <img src={src} alt="Prenda" className="w-full h-full object-cover" />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: EXPLORE (COMMUNITY) */}
            <section className="py-24 bg-[#F5F5F7] overflow-hidden">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <div className="lg:w-1/2">
                            <div className="relative h-[400px] w-full">
                                {[
                                { top: '0%',  left: '10%', z: 30, img: look1 },
                                { top: '20%', left: '50%', z: 20, img: look2 },
                                { top: '50%', left: '20%', z: 40, img: look3 }
                                ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2, duration: 0.5 }}
                                    className="absolute w-48 h-64 rounded-2xl overflow-hidden shadow-xl border-4 border-white"
                                    style={{ top: item.top, left: item.left, zIndex: item.z }}
                                >
                                    <img src={item.img} alt="Usuario" className="w-full h-full object-cover" />
                                </motion.div>
                                ))}
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="w-16 h-16 rounded-2xl bg-[#F5F5F7] flex items-center justify-center mb-8">
                                    <Users className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-3xl md:text-5xl font-bold mb-6">Explora y Comparte.</h3>
                                <p className="text-lg text-secondary leading-relaxed mb-8">
                                    La moda es social. Inspírate con los looks de la comunidad,
                                    comparte tus creaciones y recibe feedback real.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        "Sigue a creadores de estilo",
                                        "Clona outfits de otros usuarios",
                                        "Participa en retos de moda"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-secondary font-medium">
                                            <CheckCircle2 className="w-5 h-5 text-accent" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BRAND PORTAL SECTION - DARK MODE */}
            <section id="marcas" className="py-32 bg-[#050505] text-white relative overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#E3C393]/10 rounded-full blur-[100px]" />
                </div>

                <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
                    <div className="text-center max-w-4xl mx-auto mb-20">
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                            Ponsiv para marcas
                        </h2>
                        <p className="text-xl text-zinc-400 leading-relaxed">
                            Conecta tu catálogo, activa bonos por looks y entiende, con datos reales,
                            qué productos funcionan, con qué tipo de creatividades y ante qué públicos.
                            Un portal para decidir mejor antes, durante y después de cada colección.
                        </p>
                    </div>

                    {/* Dashboard Preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0A0A0A] shadow-2xl shadow-black/50"
                    >
                        <div className="absolute top-0 left-0 w-full h-12 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                        </div>

                        <div className="pt-16 pb-8 px-8 grid lg:grid-cols-4 gap-8">
                            {/* Sidebar Mock */}
                            <div className="hidden lg:block col-span-1 space-y-4">
                                <div className="h-8 w-32 bg-white/10 rounded mb-8" />
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className="h-10 w-full bg-white/5 rounded-lg" />
                                ))}
                            </div>

                            {/* Main Content Mock */}
                            <div className="col-span-3 lg:col-span-3 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        { label: "Ventas por look", val: "€12,450", inc: "+12%" },
                                        { label: "Añadidos al armario", val: "1,204", inc: "+8%" },
                                        { label: "Tiempo de visualización", val: "24.8h", inc: "+5%" }
                                    ].map((stat, i) => (
                                        <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5">
                                            <p className="text-sm text-zinc-400 mb-2">{stat.label}</p>
                                            <div className="flex items-end justify-between">
                                                <p className="text-2xl font-bold">{stat.val}</p>
                                                <span className="text-emerald-400 text-xs font-medium bg-emerald-400/10 px-2 py-1 rounded-full">{stat.inc}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Chart Area */}
                                <div className="h-64 rounded-2xl bg-white/5 border border-white/5 p-6 flex items-end gap-4">
                                    {[40, 70, 45, 90, 60, 80, 50, 75, 60, 95, 85, 70].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 0 }}
                                            whileInView={{ height: `${h}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: i * 0.05 }}
                                            className="flex-1 bg-gradient-to-t from-[#E3C393] to-white/80 rounded-t-sm opacity-80"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Brand value bullets */}
                    <div className="mt-16 grid md:grid-cols-3 gap-8">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                                    <ShoppingBag className="w-4 h-4" />
                                </div>
                                <h3 className="font-semibold text-lg">Catálogo conectado</h3>
                            </div>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                Sincroniza productos, imágenes, precios, stock y rebajas directamente en Ponsiv.
                                Actualiza descripciones, colecciones y disponibilidad sin tocar código.
                            </p>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                                    <BarChart3 className="w-4 h-4" />
                                </div>
                                <h3 className="font-semibold text-lg">Analítica accionable</h3>
                            </div>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                Ve qué se ve, qué se guarda, qué entra en armarios y qué termina en compra.
                                Detecta estilos y tendencias emergentes por segmento y usa el algoritmo para testear
                                el potencial de un producto antes de lanzarlo masivamente.
                            </p>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                                    <Users className="w-4 h-4" />
                                </div>
                                <h3 className="font-semibold text-lg">Bonos y experimentos</h3>
                            </div>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                Define “bonos por look” para pagar a creadores cuando se venda una prenda en sus outfits.
                                Lanza productos promocionados, prueba distintas creatividades (foto con modelo o sin él,
                                vídeo corto, detalle de tejido) y decide qué ve cada tipo de usuario.
                            </p>
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-black font-bold text-lg hover:scale-105 transition-transform duration-300"
                        >
                            Acceder al portal de marcas
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* VISION SECTION */}
            <section id="vision" className="py-32 bg-white">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <span className="text-accent-muted font-semibold tracking-widest text-2xl md:text-3xl lg:text-4xl uppercase mb-4 block">
                            Visión
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                            Moda personalizada, impulsada por datos
                            <span className="block text-secondary/60">y vivida como experiencia social.</span>
                        </h2>
                        <p className="text-lg text-secondary leading-relaxed">
                            Creemos en una moda que entiende a cada persona, que ayuda a las marcas a tomar mejores decisiones
                            y que convierte el proceso de descubrir qué ponerse en algo compartido, divertido y humano.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-2xl bg-secondary-background">
                            <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center mb-4">
                                <Target className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="font-semibold text-lg mb-3">Tecnología que se adapta a ti</h3>
                            <p className="text-secondary text-sm leading-relaxed">
                                Cada interacción alimenta un modelo que aprende de tus gustos reales.
                                No es solo “recomendación”, es un sistema que evoluciona contigo y con tu armario.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-secondary-background">
                            <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center mb-4">
                                <BarChart3 className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="font-semibold text-lg mb-3">Datos que impulsan decisiones</h3>
                            <p className="text-secondary text-sm leading-relaxed">
                                Para las marcas, Ponsiv es un laboratorio vivo donde experimentar con productos, precios y
                                creatividades en tiempo real, reduciendo riesgo y descubriendo nuevas oportunidades.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-secondary-background">
                            <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center mb-4">
                                <Users className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="font-semibold text-lg mb-3">La moda como conversación</h3>
                            <p className="text-secondary text-sm leading-relaxed">
                                Outfits que se comparten, looks que nacen de la comunidad.
                                La moda deja de ser una compra solitaria para convertirse en una experiencia social conectada.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-white pt-24 pb-12 border-t border-zinc-100">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <div className="grid md:grid-cols-4 gap-12 mb-20">
                        <div className="col-span-2">
                            <img
                                src="/assets/logos/Ponsiv.png"
                                alt="Ponsiv"
                                className="h-14 md:h-20 mb-6 w-auto"
                            />
                            <p className="text-secondary max-w-sm leading-relaxed">
                                Ponsiv conecta inspiración, armario y compra en un solo lugar.
                                Una forma nueva de vivir la moda para personas, marcas y comunidades enteras.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6">Plataforma</h4>
                            <ul className="space-y-4 text-secondary">
                                <li><a href="#que-es" className="hover:text-primary transition-colors">Qué es Ponsiv</a></li>
                                <li><a href="#consumidores" className="hover:text-primary transition-colors">Para consumidores</a></li>
                                <li><a href="#marcas" className="hover:text-primary transition-colors">Para marcas</a></li>
                                <li><a href="#vision" className="hover:text-primary transition-colors">Visión</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6">Legal</h4>
                            <ul className="space-y-4 text-secondary">
                                <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacidad</Link></li>
                                <li><Link to="/terms" className="hover:text-primary transition-colors">Términos</Link></li>
                                <li><Link to="/contact" className="hover:text-primary transition-colors">Contacto</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-zinc-100 text-sm text-secondary">
                        <p>© {new Date().getFullYear()} Ponsiv Inc. Todos los derechos reservados.</p>
                        <div className="flex gap-6 mt-4 md:mt-0">
                            <a href="#" className="hover:text-primary transition-colors">Instagram</a>
                            <a href="#" className="hover:text-primary transition-colors">TikTok</a>
                            <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
