import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import productsData from '../data/products.json';
import { DollarSign, Info, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Bonuses() {
    const { user } = useAuth();
    const brandProducts = productsData.filter(p => p.brand === user?.name);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [bonusAmount, setBonusAmount] = useState('');

    const handleConfigure = (product) => {
        setSelectedProduct(product);
        setBonusAmount('5.00'); // Default or fetch existing
    };

    return (
        <div className="space-y-8 relative">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-black tracking-tight">Bonificaciones</h1>
                    <p className="text-zinc-500 mt-1">Incentiva a los creadores con comisiones por ventas.</p>
                </div>
            </div>

            {/* Info Banner */}
            <div className="bg-[#E3C393]/10 border border-[#E3C393]/20 rounded-2xl p-6 flex items-start gap-4">
                <div className="p-2 bg-[#E3C393]/20 rounded-full">
                    <Info className="w-5 h-5 text-[#8C7355]" />
                </div>
                <div>
                    <h4 className="text-base font-semibold text-[#5C4B35]">¿Cómo funcionan los bonos?</h4>
                    <p className="text-sm text-[#8C7355] mt-1 leading-relaxed max-w-2xl">
                        Define una cantidad fija que pagarás al creador por cada venta generada a través de sus looks.
                        Los pagos se procesan mensualmente de forma automática.
                    </p>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-zinc-50/50 border-b border-zinc-100">
                        <tr>
                            <th className="px-8 py-5 text-left text-xs font-bold text-zinc-400 uppercase tracking-widest">Producto</th>
                            <th className="px-8 py-5 text-left text-xs font-bold text-zinc-400 uppercase tracking-widest">Precio</th>
                            <th className="px-8 py-5 text-left text-xs font-bold text-zinc-400 uppercase tracking-widest">Estado Bono</th>
                            <th className="px-8 py-5 text-left text-xs font-bold text-zinc-400 uppercase tracking-widest">Comisión</th>
                            <th className="px-8 py-5 text-right text-xs font-bold text-zinc-400 uppercase tracking-widest">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50">
                        {brandProducts.map((product) => (
                            <tr key={product.id} className="group hover:bg-zinc-50/50 transition-colors">
                                <td className="px-8 py-5 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-12 w-12 flex-shrink-0 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-100">
                                            <img
                                                className="h-full w-full object-cover"
                                                src={product.imagePaths[0] || 'https://via.placeholder.com/40'}
                                                alt=""
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-semibold text-black group-hover:text-black transition-colors">{product.title}</div>
                                            <div className="text-xs text-zinc-400 font-medium uppercase tracking-wide">{product.category}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-5 whitespace-nowrap">
                                    <span className="text-sm font-medium text-zinc-600">€{product.price}</span>
                                </td>
                                <td className="px-8 py-5 whitespace-nowrap">
                                    <span className="px-3 py-1 inline-flex text-[10px] font-bold uppercase tracking-wider rounded-full bg-zinc-100 text-zinc-500 border border-zinc-200">
                                        Inactivo
                                    </span>
                                </td>
                                <td className="px-8 py-5 whitespace-nowrap text-sm text-zinc-400">
                                    -
                                </td>
                                <td className="px-8 py-5 whitespace-nowrap text-right">
                                    <button
                                        onClick={() => handleConfigure(product)}
                                        className="text-sm font-semibold text-black hover:text-[#E3C393] transition-colors inline-flex items-center gap-1"
                                    >
                                        Configurar
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Configure Bonus Modal */}
            <AnimatePresence>
                {selectedProduct && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
                                <h2 className="text-xl font-bold text-black">Configurar Bono</h2>
                                <button onClick={() => setSelectedProduct(null)} className="p-2 hover:bg-zinc-50 rounded-full transition-colors">
                                    <X className="w-5 h-5 text-zinc-400" />
                                </button>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="flex items-center gap-4 p-4 bg-zinc-50 rounded-2xl">
                                    <img src={selectedProduct.imagePaths[0]} className="w-12 h-12 rounded-lg object-cover" alt="" />
                                    <div>
                                        <p className="font-bold text-black text-sm">{selectedProduct.title}</p>
                                        <p className="text-xs text-zinc-500">Precio: €{selectedProduct.price}</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-black">Comisión por Venta (€)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                        <input
                                            type="number"
                                            value={bonusAmount}
                                            onChange={(e) => setBonusAmount(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 border-none focus:ring-2 focus:ring-black/5 text-lg font-bold text-black"
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <p className="text-xs text-zinc-400">Esta cantidad se descontará de tu margen por cada venta.</p>
                                </div>

                                <div className="pt-2 flex gap-3">
                                    <button onClick={() => setSelectedProduct(null)} className="flex-1 py-3 rounded-xl text-sm font-bold text-zinc-500 hover:bg-zinc-50 transition-colors">Cancelar</button>
                                    <button onClick={() => { alert(`Bono configurado para ${selectedProduct.title}`); setSelectedProduct(null); }} className="flex-1 py-3 rounded-xl text-sm font-bold text-white bg-black hover:bg-zinc-800 transition-colors shadow-lg shadow-black/10">Guardar</button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
