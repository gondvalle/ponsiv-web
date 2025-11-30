import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Save, Camera } from 'lucide-react';

export default function Profile() {
    const { user } = useAuth();

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-black tracking-tight">Perfil de Marca</h1>
                <p className="text-zinc-500 mt-1">Gestiona la información pública de tu marca.</p>
            </div>

            <div className="bg-white shadow-sm rounded-3xl border border-zinc-100 overflow-hidden">
                <div className="p-8 space-y-8">
                    {/* Logo Section */}
                    <div className="flex items-center space-x-8">
                        <div className="relative group cursor-pointer">
                            <div className="h-28 w-28 rounded-full bg-zinc-50 border-4 border-white shadow-lg overflow-hidden">
                                {user?.logo ? (
                                    <img src={user.logo} alt={user.name} className="h-full w-full object-cover" />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center bg-black text-white text-3xl font-bold">
                                        {user?.name?.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Camera className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-black mb-1">Logo de la Marca</h3>
                            <p className="text-sm text-zinc-500 mb-4">Se mostrará en tu perfil y en los productos.</p>
                            <button className="bg-white border border-zinc-200 text-black px-5 py-2.5 rounded-full text-sm font-medium hover:bg-zinc-50 transition-colors">
                                Cambiar Logo
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-black mb-2">Nombre de la Marca</label>
                            <input
                                type="text"
                                defaultValue={user?.name}
                                className="block w-full border-zinc-200 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all bg-zinc-50/50"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-black mb-2">Email de Contacto</label>
                            <input
                                type="email"
                                defaultValue={user?.email}
                                disabled
                                className="block w-full border-zinc-200 rounded-xl shadow-sm py-3 px-4 bg-zinc-100 text-zinc-500 cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-black mb-2">Descripción / Storytelling</label>
                            <textarea
                                rows={4}
                                className="block w-full border-zinc-200 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all bg-zinc-50/50 resize-none"
                                placeholder="Cuenta la historia de tu marca..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-black mb-2">Sitio Web</label>
                            <div className="flex rounded-xl shadow-sm overflow-hidden border border-zinc-200 focus-within:ring-2 focus-within:ring-black/5 focus-within:border-black transition-all">
                                <span className="inline-flex items-center px-4 bg-zinc-50 text-zinc-500 text-sm font-medium border-r border-zinc-200">
                                    https://
                                </span>
                                <input
                                    type="text"
                                    className="flex-1 min-w-0 block w-full px-4 py-3 border-none focus:ring-0 text-sm bg-white"
                                    placeholder="www.tumarca.com"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-8 py-6 bg-zinc-50 border-t border-zinc-100 flex justify-end">
                    <button className="flex items-center bg-black text-white px-8 py-3 rounded-full hover:bg-zinc-800 transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-black/20 hover:-translate-y-0.5 font-medium">
                        <Save className="w-4 h-4 mr-2" />
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </div>
    );
}
