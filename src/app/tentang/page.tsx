"use client";

import { motion } from "framer-motion";

export default function TentangPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 page-content">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
                <img
                    src="https://placehold.co/1200x400/C8E6C9/333?text=Tim+Petani+Lokal+Kami"
                    className="w-full h-64 object-cover"
                    alt="Petani Lokal"
                />
                <div className="p-8 md:p-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        👩‍🌾 Misi Kami: Dari Ladang Lokal ke Meja Anda
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                        &quot;SegariHari&quot; lebih dari sekadar aplikasi; ini adalah jembatan. Misi kami adalah memberdayakan petani dan produsen lokal Indonesia dengan memberi mereka akses langsung ke pasar yang lebih luas—yaitu Anda.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h3 className="text-xl font-semibold text-green-700 mb-2">Kualitas Adalah Prioritas</h3>
                            <p>Kami bekerja sama langsung dengan puluhan petani dan peternak lokal. Ini berarti kami memotong rantai pasokan yang panjang, memastikan produk yang Anda terima adalah yang paling segar.</p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <h3 className="text-xl font-semibold text-green-700 mb-2">Harga yang Adil</h3>
                            <p>Dengan menghilangkan perantara yang tidak perlu, kami dapat memberikan harga yang lebih baik untuk Anda, sekaligus memastikan petani mendapatkan bayaran yang adil dan layak.</p>
                        </motion.div>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-8 text-lg text-gray-800 bg-amber-100 p-6 rounded-lg border-l-4 border-amber-500"
                    >
                        Setiap pembelian Anda di <strong>SegariHari</strong> secara langsung mendukung ekonomi lokal dan mempromosikan praktik pertanian yang berkelanjutan. Terima kasih telah menjadi bagian dari gerakan ini.
                    </motion.p>
                </div>
            </motion.div>
        </div>
    );
}
