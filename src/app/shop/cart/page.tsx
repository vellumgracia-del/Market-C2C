"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import { allProducts, formatRupiah } from "@/data/products";

export default function CartPage() {
    const { cart, updateQuantity, removeFromCart, clearCart, isClient } = useCart();

    if (!isClient) {
        return <div className="container mx-auto px-4 py-16 text-center">Memuat...</div>;
    }

    const cartItems = Object.entries(cart).map(([id, quantity]) => {
        const product = allProducts.find(p => p.id === id);
        return { product, quantity };
    }).filter(item => item.product !== undefined) as { product: typeof allProducts[0], quantity: number }[];

    const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 page-content">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-3xl font-bold text-gray-800 mb-6">🛒 Keranjang Belanja</h1>

                {cartItems.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                        <div className="text-6xl mb-4">🛒</div>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Keranjang Anda Kosong</h2>
                        <p className="text-gray-500 mb-6">Mulai belanja dan tambahkan produk ke keranjang Anda!</p>
                        <Link href="/shop" className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition inline-block">
                            Mulai Belanja
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-2/3">
                            <div className="bg-white rounded-2xl shadow-xl p-6">
                                <div className="flow-root">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {cartItems.map((item) => (
                                            <li key={item.product.id} className="flex py-6">
                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 relative">
                                                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                                                </div>
                                                <div className="ml-4 flex flex-1 flex-col justify-center">
                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                        <h3>{item.product.name}</h3>
                                                        <p className="ml-4">{formatRupiah(item.product.price * item.quantity)}</p>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-500">{item.product.unit}</p>
                                                    <div className="flex flex-1 items-end justify-between text-sm mt-2">
                                                        <div className="flex items-center gap-3">
                                                            <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="bg-gray-100 hover:bg-gray-200 text-gray-800 w-8 h-8 rounded-full flex items-center justify-center font-bold">−</button>
                                                            <span className="font-semibold text-gray-700">{item.quantity}</span>
                                                            <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="bg-gray-100 hover:bg-gray-200 text-gray-800 w-8 h-8 rounded-full flex items-center justify-center font-bold">+</button>
                                                        </div>
                                                        <button type="button" onClick={() => removeFromCart(item.product.id)} className="font-medium text-red-500 hover:text-red-700 text-sm">Hapus</button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/3">
                            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
                                <h2 className="text-lg font-medium text-gray-900 mb-4">Ringkasan Belanja</h2>
                                <div className="flex justify-between text-base font-medium text-gray-900 mb-4 px-2">
                                    <p>Total Harga</p>
                                    <p>{formatRupiah(total)}</p>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500 mb-6 px-2">Biaya admin dan ongkos kirim akan dihitung saat checkout.</p>
                                <div className="space-y-3">
                                    <Link href="/shop/checkout" className="flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700 transition">
                                        Checkout Sekarang
                                    </Link>
                                    <button onClick={clearCart} className="flex w-full items-center justify-center rounded-lg bg-red-50 px-6 py-3 text-base font-medium text-red-600 shadow-sm hover:bg-red-100 transition">
                                        Kosongkan Keranjang
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
