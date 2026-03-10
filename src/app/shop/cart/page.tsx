"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CartPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-3xl font-bold text-gray-800 mb-6">🛒 Keranjang Belanja</h1>
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="text-6xl mb-4">🛒</div>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">Keranjang Anda Kosong</h2>
                    <p className="text-gray-500 mb-6">Mulai belanja dan tambahkan produk ke keranjang Anda!</p>
                    <Link href="/shop" className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition inline-block">
                        Mulai Belanja
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
