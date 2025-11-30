import React from 'react';
import { Heart, MessageCircle, Share2, DollarSign, ArrowUpRight } from 'lucide-react';

export default function Looks() {
    // Mock looks data
    const looks = [
        {
            id: 1,
            creator: 'Sofia M.',
            avatar: 'https://i.pravatar.cc/150?u=sofia',
            image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
            likes: 1240,
            comments: 45,
            sales: 12,
            revenue: 450,
            isPaid: true,
        },
        {
            id: 2,
            creator: 'Alex R.',
            avatar: 'https://i.pravatar.cc/150?u=alex',
            image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
            likes: 856,
            comments: 23,
            sales: 5,
            revenue: 180,
            isPaid: false,
        },
        {
            id: 3,
            creator: 'Maria L.',
            avatar: 'https://i.pravatar.cc/150?u=maria',
            image: 'https://images.unsplash.com/photo-1529139574466-a302d2d3f524?w=800&q=80',
            likes: 2100,
            comments: 120,
            sales: 34,
            revenue: 1250,
            isPaid: true,
        },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-black tracking-tight">Looks de la Comunidad</h1>
                    <p className="text-zinc-500 mt-1">Descubre cómo los creadores combinan tus productos.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {looks.map((look) => (
                    <div key={look.id} className="group bg-white rounded-3xl p-3 hover:shadow-xl hover:shadow-black/5 transition-all duration-500 border border-transparent hover:border-zinc-100">
                        <div className="relative aspect-[4/5] bg-zinc-100 rounded-2xl overflow-hidden mb-4">
                            <img
                                src={look.image}
                                alt={`Look by ${look.creator}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute top-4 right-4">
                                {look.isPaid && (
                                    <span className="px-3 py-1 bg-[#E3C393] text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg shadow-black/10 backdrop-blur-md">
                                        Patrocinado
                                    </span>
                                )}
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="flex items-center justify-between text-white">
                                    <div className="flex items-center gap-4">
                                        <span className="flex items-center gap-1.5 text-sm font-medium">
                                            <Heart className="w-4 h-4" fill="currentColor" /> {look.likes}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-sm font-medium">
                                            <MessageCircle className="w-4 h-4" /> {look.comments}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-2 pb-2">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    <img src={look.avatar} alt={look.creator} className="w-8 h-8 rounded-full mr-3 border border-zinc-100" />
                                    <span className="font-semibold text-sm text-black">{look.creator}</span>
                                </div>
                                <button className="text-xs font-bold text-black hover:text-[#E3C393] transition-colors flex items-center gap-1">
                                    VER DETALLES <ArrowUpRight className="w-3 h-3" />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-zinc-50 p-3 rounded-2xl text-center group-hover:bg-zinc-100 transition-colors">
                                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Ventas</p>
                                    <p className="font-bold text-black text-lg">{look.sales}</p>
                                </div>
                                <div className="bg-zinc-50 p-3 rounded-2xl text-center group-hover:bg-zinc-100 transition-colors">
                                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Ingresos</p>
                                    <p className="font-bold text-[#E3C393] text-lg">€{look.revenue}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
