import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import productsData from '../data/products.json';
import { Search, Filter, MoreHorizontal, Edit, Eye, Plus, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Catalog() {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState('Todos');

    // Filter products for current brand
    const brandProducts = productsData.filter(p => p.brand === user?.name);

    // Filter by search term and category
    const filteredProducts = brandProducts.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === 'Todos' || p.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = ['Todos', ...new Set(brandProducts.map(p => p.category).filter(Boolean))];

    return (
        <div className="space-y-8 relative">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-black tracking-tight">Catálogo</h1>
                    <p className="text-zinc-500 mt-1">Gestiona tu colección y stock.</p>
                </div>
                <button
                    onClick={() => setIsAddProductOpen(true)}
                    className="group flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-zinc-800 transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-black/20 hover:-translate-y-0.5"
                >
                    <Plus className="w-4 h-4" />
                    <span className="font-medium text-sm">Nuevo Producto</span>
                </button>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-2 rounded-2xl border border-zinc-100 shadow-sm">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        className="w-full pl-11 pr-4 py-3 bg-transparent border-none focus:outline-none text-sm font-medium placeholder-zinc-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full sm:w-auto pr-2 relative">
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className={`flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-medium transition-colors w-full sm:w-auto ${isFilterOpen ? 'bg-black text-white' : 'bg-zinc-50 text-zinc-600 hover:bg-zinc-100'}`}
                    >
                        <Filter className="h-4 w-4 mr-2" />
                        Filtros
                    </button>

                    {/* Filter Dropdown */}
                    <AnimatePresence>
                        {isFilterOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-zinc-100 p-2 z-20"
                            >
                                <p className="px-3 py-2 text-xs font-bold text-zinc-400 uppercase tracking-wider">Categoría</p>
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => { setActiveCategory(cat); setIsFilterOpen(false); }}
                                        className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors ${activeCategory === cat ? 'bg-zinc-50 text-black' : 'text-zinc-500 hover:bg-zinc-50 hover:text-black'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="group flex flex-col bg-white rounded-3xl p-3 hover:shadow-xl hover:shadow-black/5 transition-all duration-500 border border-transparent hover:border-zinc-100">
                        {/* Image Container */}
                        <div className="relative aspect-[4/5] bg-zinc-100 rounded-2xl overflow-hidden mb-4">
                            <img
                                src={product.imagePaths[0] || 'https://via.placeholder.com/300'}
                                alt={product.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Status Badge */}
                            <div className="absolute top-3 left-3">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${product.active
                                    ? 'bg-white/90 text-black backdrop-blur-sm'
                                    : 'bg-zinc-900/90 text-white backdrop-blur-sm'
                                    }`}>
                                    {product.active ? 'Activo' : 'Inactivo'}
                                </span>
                            </div>

                            {/* Action Overlay */}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                                <button onClick={() => alert(`Ver detalles de: ${product.title}`)} className="p-3 bg-white rounded-full hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <Eye className="h-4 w-4 text-black" />
                                </button>
                                <button onClick={() => alert(`Editar producto: ${product.title}`)} className="p-3 bg-black text-white rounded-full hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <Edit className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="px-2 pb-2 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-semibold text-black line-clamp-1 text-base">{product.title}</h3>
                                <button className="text-zinc-400 hover:text-black transition-colors">
                                    <MoreHorizontal className="h-5 w-5" />
                                </button>
                            </div>
                            <p className="text-xs text-zinc-500 font-medium mb-3 uppercase tracking-wide">{product.category || 'General'}</p>

                            <div className="mt-auto flex items-center justify-between pt-3 border-t border-zinc-50">
                                <span className="font-bold text-lg text-black">€{product.price}</span>
                                <div className="flex items-center text-xs font-medium text-zinc-500 bg-zinc-50 px-2 py-1 rounded-lg">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#E3C393] mr-2"></span>
                                    {product.stock} unid.
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Product Modal */}
            <AnimatePresence>
                {isAddProductOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
                                <h2 className="text-xl font-bold text-black">Nuevo Producto</h2>
                                <button onClick={() => setIsAddProductOpen(false)} className="p-2 hover:bg-zinc-50 rounded-full transition-colors">
                                    <X className="w-5 h-5 text-zinc-400" />
                                </button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-black">Nombre del Producto</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-zinc-50 border-none focus:ring-2 focus:ring-black/5 text-sm" placeholder="Ej. Camiseta Oversize" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-black">Precio (€)</label>
                                        <input type="number" className="w-full px-4 py-3 rounded-xl bg-zinc-50 border-none focus:ring-2 focus:ring-black/5 text-sm" placeholder="0.00" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-black">Stock</label>
                                        <input type="number" className="w-full px-4 py-3 rounded-xl bg-zinc-50 border-none focus:ring-2 focus:ring-black/5 text-sm" placeholder="0" />
                                    </div>
                                </div>
                                <div className="pt-4 flex gap-3">
                                    <button onClick={() => setIsAddProductOpen(false)} className="flex-1 py-3 rounded-xl text-sm font-bold text-zinc-500 hover:bg-zinc-50 transition-colors">Cancelar</button>
                                    <button onClick={() => { alert('Producto creado (Simulación)'); setIsAddProductOpen(false); }} className="flex-1 py-3 rounded-xl text-sm font-bold text-white bg-black hover:bg-zinc-800 transition-colors shadow-lg shadow-black/10">Crear Producto</button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
