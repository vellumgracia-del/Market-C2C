"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const allProducts = [
    { id: "1", name: "Brokoli Organik", unit: "500 gr / ikat", price: 14000, originalPrice: 20000, discount: "Diskon 30%", category: "Sayuran", image: "https://placehold.co/400x300/A0E9A0/333?text=Brokoli" },
    { id: "2", name: "Daging Sapi Has Dalam", unit: "250 gr / pack", price: 48000, originalPrice: 60000, discount: "Diskon 20%", category: "Daging & Unggas", image: "https://placehold.co/400x300/FAD0C4/333?text=Daging+Sapi" },
    { id: "3", name: "Telur Ayam Omega-3", unit: "10 butir / pack", price: 30000, originalPrice: null, discount: "Beli 1 Gratis 1", category: "Susu & Telur", image: "https://placehold.co/400x300/FFF8B8/333?text=Telur+Ayam" },
    { id: "4", name: "Jeruk Sunkist Navel", unit: "1 kg", price: 24000, originalPrice: 40000, discount: "Diskon 40%", category: "Buah-buahan", image: "https://placehold.co/400x300/FFDDC1/333?text=Jeruk+Sunkist" },
    { id: "5", name: "Bayam Segar", unit: "250 gr / ikat", price: 5000, originalPrice: null, discount: null, category: "Sayuran", image: "https://placehold.co/400x300/A0E9A0/333?text=Bayam+Segar" },
    { id: "6", name: "Ayam Kampung", unit: "1 ekor", price: 85000, originalPrice: 95000, discount: "Diskon 10%", category: "Daging & Unggas", image: "https://placehold.co/400x300/FAD0C4/333?text=Ayam+Kampung" },
    { id: "7", name: "Susu Segar", unit: "1 liter", price: 18000, originalPrice: null, discount: null, category: "Susu & Telur", image: "https://placehold.co/400x300/FFF8B8/333?text=Susu+Segar" },
    { id: "8", name: "Ikan Salmon", unit: "200 gr / fillet", price: 65000, originalPrice: 75000, discount: "Diskon 13%", category: "Ikan & Seafood", image: "https://placehold.co/400x300/B0E0E6/333?text=Ikan+Salmon" },
    { id: "9", name: "Wortel Import", unit: "500 gr", price: 12000, originalPrice: null, discount: null, category: "Sayuran", image: "https://placehold.co/400x300/FFA07A/333?text=Wortel" },
    { id: "10", name: "Roti Tawar", unit: "1 bungkus", price: 15000, originalPrice: null, discount: null, category: "Kebutuhan Dapur", image: "https://placehold.co/400x300/F5DEB3/333?text=Roti+Tawar" },
    { id: "11", name: "Udang Segar", unit: "500 gr", price: 55000, originalPrice: 65000, discount: "Diskon 15%", category: "Ikan & Seafood", image: "https://placehold.co/400x300/B0E0E6/333?text=Udang+Segar" },
    { id: "12", name: "Apel Fuji", unit: "1 kg", price: 35000, originalPrice: 42000, discount: "Diskon 17%", category: "Buah-buahan", image: "https://placehold.co/400x300/FFB6C1/333?text=Apel+Fuji" },
];

const cats = ["Semua", "Sayuran", "Buah-buahan", "Daging & Unggas", "Ikan & Seafood", "Susu & Telur", "Kebutuhan Dapur"];

function formatRupiah(num: number) {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
}

export default function ShopPage() {
    const [category, setCategory] = useState("Semua");
    const [search, setSearch] = useState("");
    const [cart, setCart] = useState<{ [key: string]: number }>({});

    const filtered = allProducts.filter((p) => {
        const matchCat = category === "Semua" || p.category === category;
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

    const addToCart = (id: string) => {
        setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 page-content">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">🛒 Belanja Segar</h1>
                        <p className="text-gray-600">Pilih produk segar terbaik untuk keluarga Anda</p>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center gap-3">
                        <div className="relative">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari produk..."
                                className="py-2 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 w-64"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                        </div>
                        <Link href="/shop/cart" className="relative bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                            🛒
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {cats.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${category === cat ? "bg-green-600 text-white shadow-md" : "bg-white text-gray-600 hover:bg-green-50 border"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filtered.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                        >
                            <div className="relative overflow-hidden">
                                <img src={product.image} alt={product.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                                {product.discount && (
                                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                        {product.discount}
                                    </span>
                                )}
                            </div>
                            <div className="p-4">
                                <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                                <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                                <p className="text-gray-500 text-sm mb-3">{product.unit}</p>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <span className="text-lg font-bold text-green-700">{formatRupiah(product.price)}</span>
                                        {product.originalPrice && (
                                            <span className="text-sm text-gray-400 line-through ml-2">{formatRupiah(product.originalPrice)}</span>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => addToCart(product.id)}
                                        className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-green-700 transition text-lg"
                                    >
                                        +
                                    </button>
                                </div>
                                {cart[product.id] && (
                                    <p className="text-sm text-green-600 mt-2 font-medium">✓ {cart[product.id]} dalam keranjang</p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🔍</div>
                        <p className="text-gray-500 text-lg">Produk tidak ditemukan</p>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
