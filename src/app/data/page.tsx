"use client";

import { motion } from "framer-motion";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    XAxis,
    YAxis,
    CartesianGrid,
    Area,
    AreaChart,
    ResponsiveContainer,
} from "recharts";

const subscriptionData = [
    { name: "Susu Segar", value: 30 },
    { name: "Telur Ayam", value: 25 },
    { name: "Roti Tawar", value: 20 },
    { name: "Air Mineral", value: 15 },
    { name: "Sayur Bayam", value: 10 },
];

const growthData = [
    { month: "Bulan 1", users: 1000 },
    { month: "Bulan 3", users: 5000 },
    { month: "Bulan 6", users: 25000 },
    { month: "Bulan 9", users: 70000 },
    { month: "Bulan 12", users: 150000 },
];

const COLORS = [
    "rgba(5, 150, 105, 0.8)",
    "rgba(245, 158, 11, 0.8)",
    "rgba(120, 113, 108, 0.8)",
    "rgba(59, 130, 246, 0.8)",
    "rgba(22, 163, 74, 0.8)",
];

const kpiStats = [
    { value: "30 Menit", label: "Target Pengiriman Rata-rata", desc: "Dengan micro-warehouse yang tersebar, kami menargetkan kecepatan pengiriman yang tak tertandingi." },
    { value: "99.8%", label: "Tingkat Ketersediaan Stok", desc: "Manajemen inventaris berbasis AI memastikan barang yang Anda butuhkan selalu tersedia." },
    { value: "25%", label: "Penghematan Waktu Belanja", desc: "Pengguna menghemat rata-rata 2 jam per minggu berkat fitur Smart List dan Langganan." },
];

export default function DataPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 page-content">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Dasbor Konsep & Data</h1>
                <p className="text-lg text-gray-600 mb-8 max-w-3xl">
                    Platform &quot;SegariHari&quot; dirancang berdasarkan data untuk melayani Anda lebih baik.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white p-6 rounded-2xl shadow-xl"
                >
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Produk Langganan Terpopuler</h3>
                    <p className="text-gray-600 text-center mb-4">
                        Data menunjukkan fokus pelanggan pada kebutuhan pokok.
                    </p>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={subscriptionData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                                label={({ name, value }) => `${name}: ${value}%`}
                            >
                                {subscriptionData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => `${value}%`} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-white p-6 rounded-2xl shadow-xl"
                >
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Proyeksi Pertumbuhan Pengguna</h3>
                    <p className="text-gray-600 text-center mb-4">
                        Adopsi pengguna yang cepat dalam 12 bulan pertama.
                    </p>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={growthData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip formatter={(value) => new Intl.NumberFormat("id-ID").format(Number(value))} />
                            <Area type="monotone" dataKey="users" stroke="rgba(22, 163, 74, 1)" fill="rgba(22, 163, 74, 0.1)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {kpiStats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                        className="bg-white p-6 rounded-2xl shadow-xl text-center"
                    >
                        <div className="text-5xl font-bold text-green-700">{stat.value}</div>
                        <div className="text-lg font-semibold text-gray-700 mt-2">{stat.label}</div>
                        <p className="text-gray-600 mt-2 text-sm">{stat.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
