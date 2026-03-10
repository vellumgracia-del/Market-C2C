"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const stats = [
    { label: "Total Produk", value: "24", icon: "📦", color: "bg-blue-50 text-blue-700" },
    { label: "Pesanan Baru", value: "8", icon: "🧾", color: "bg-amber-50 text-amber-700" },
    { label: "Pendapatan Bulan Ini", value: "Rp 2.450.000", icon: "💰", color: "bg-green-50 text-green-700" },
    { label: "Rating Toko", value: "4.8 ⭐", icon: "⭐", color: "bg-purple-50 text-purple-700" },
];

const recentOrders = [
    { id: "ORD-001", buyer: "Ahmad", items: 3, total: 125000, status: "Baru", date: "10 Mar 2026" },
    { id: "ORD-002", buyer: "Siti", items: 1, total: 48000, status: "Diproses", date: "10 Mar 2026" },
    { id: "ORD-003", buyer: "Budi", items: 5, total: 230000, status: "Dikirim", date: "9 Mar 2026" },
    { id: "ORD-004", buyer: "Dewi", items: 2, total: 67000, status: "Selesai", date: "9 Mar 2026" },
];

const statusColors: { [key: string]: string } = {
    Baru: "bg-blue-100 text-blue-700",
    Diproses: "bg-amber-100 text-amber-700",
    Dikirim: "bg-purple-100 text-purple-700",
    Selesai: "bg-green-100 text-green-700",
};

function formatRupiah(num: number) {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
}

export default function SellerOverview() {
    return (
        <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Overview Dashboard</h1>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`${stat.color} rounded-xl p-5 shadow-sm`}
                        >
                            <div className="text-3xl mb-2">{stat.icon}</div>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <div className="text-sm opacity-75">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <Link href="/seller/products" className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition border-l-4 border-green-600 flex items-center gap-4">
                        <span className="text-3xl">📦</span>
                        <div>
                            <h3 className="font-semibold text-gray-800">Kelola Produk</h3>
                            <p className="text-sm text-gray-500">Tambah, edit, atau hapus produk Anda</p>
                        </div>
                    </Link>
                    <Link href="/seller/orders" className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition border-l-4 border-amber-500 flex items-center gap-4">
                        <span className="text-3xl">🧾</span>
                        <div>
                            <h3 className="font-semibold text-gray-800">Pesanan Masuk</h3>
                            <p className="text-sm text-gray-500">Lihat dan proses pesanan baru</p>
                        </div>
                    </Link>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Pesanan Terbaru</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b text-left text-gray-500">
                                    <th className="pb-3 font-medium">ID Pesanan</th>
                                    <th className="pb-3 font-medium">Pembeli</th>
                                    <th className="pb-3 font-medium">Items</th>
                                    <th className="pb-3 font-medium">Total</th>
                                    <th className="pb-3 font-medium">Status</th>
                                    <th className="pb-3 font-medium">Tanggal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="border-b last:border-b-0 hover:bg-gray-50">
                                        <td className="py-3 font-medium text-green-700">{order.id}</td>
                                        <td className="py-3">{order.buyer}</td>
                                        <td className="py-3">{order.items} item</td>
                                        <td className="py-3 font-medium">{formatRupiah(order.total)}</td>
                                        <td className="py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-3 text-gray-500">{order.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
