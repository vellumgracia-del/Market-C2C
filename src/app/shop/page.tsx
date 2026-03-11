"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { useCart } from "@/hooks/useCart";
import { allProducts, formatRupiah } from "@/data/products";

const cats = ["Semua", "Sayuran", "Buah-buahan", "Daging & Unggas", "Ikan & Seafood", "Susu & Telur", "Kebutuhan Dapur"];

export default function ShopPage() {
    return (
        <Suspense fallback={<div className="container mx-auto px-4 py-16 text-center">Memuat produk...</div>}>
            <ShopContent />
        </Suspense>
    );
}

function ShopContent() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get("category") || "Semua";

    const [category, setCategory] = useState(initialCategory);
    const [search, setSearch] = useState("");
    const { cart, addToCart } = useCart();

    // Reset category to the URL param if it changes
    useEffect(() => {
        const cat = searchParams.get("category");
        if (cat) {
            setCategory(cat);
        }
    }, [searchParams]);

    const filtered = allProducts.filter((p) => {
        const matchCat = category === "Semua" || p.category === category;
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

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
                            <div className="relative w-full h-48 overflow-hidden">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />
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
