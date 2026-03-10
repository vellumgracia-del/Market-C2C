"use client";

import { motion } from "framer-motion";

export default function BuyerOrdersPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-3xl font-bold text-gray-800 mb-6">📦 Riwayat Pesanan</h1>
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="text-6xl mb-4">📦</div>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">Belum Ada Pesanan</h2>
                    <p className="text-gray-500">Pesanan Anda akan muncul di sini setelah checkout.</p>
                </div>
            </motion.div>
        </div>
    );
}
