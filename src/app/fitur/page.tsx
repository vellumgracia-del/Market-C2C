"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const features = [
    {
        id: "tab-list",
        icon: "💡",
        title: "Smart List Pribadi",
        description:
            "Lupakan daftar belanja manual. Fitur Smart List kami menggunakan AI untuk mempelajari pola belanja Anda. Kami akan secara otomatis mengingatkan Anda ketika stok susu, telur, atau sabun cuci Anda kemungkinan sudah menipis.",
        points: [
            "Prediksi kebutuhan berdasarkan riwayat pembelian.",
            "Saran produk pelengkap secara cerdas.",
            "Satu klik untuk menambahkan semua item yang diprediksi ke keranjang.",
        ],
        image: "https://placehold.co/600x300/E0F2E9/333?text=Visualisasi+Smart+List",
    },
    {
        id: "tab-langganan",
        icon: "🔄",
        title: "Langganan Cerdas",
        description:
            'Atur dan lupakan. Untuk kebutuhan pokok yang selalu Anda beli, aktifkan Langganan Cerdas. Tentukan frekuensi (mingguan, 2 mingguan, bulanan) dan kami akan mengirimkannya secara otomatis.',
        points: [
            "Diskon spesial untuk pelanggan langganan.",
            "Fleksibel: lewati pengiriman atau ubah item kapan saja.",
            "Prioritas stok untuk barang langganan Anda.",
        ],
        image: "https://placehold.co/600x300/E0E7FF/333?text=Visualisasi+Langganan",
    },
    {
        id: "tab-resep",
        icon: "🍳",
        title: "Resep Instan & Cerdas ✨",
        description:
            "Bingung mau masak apa hari ini? Jelajahi ribuan resep dari koki lokal, atau buat resep baru dengan bahan yang Anda miliki!",
        points: [
            "Filter resep berdasarkan bahan yang Anda miliki.",
            "Penyesuaian porsi otomatis (misal: untuk 2 atau 4 orang).",
            'Dari "cari resep" ke "checkout" dalam kurang dari 1 menit.',
        ],
        image: "https://placehold.co/600x300/FEF3C7/333?text=Visualisasi+Resep",
        hasAI: true,
    },
];

interface ResepResult {
    namaResep: string;
    deskripsiSingkat: string;
    bahanDibutuhkan: string[];
    langkahMemasak: string[];
}

export default function FiturPage() {
    const [activeTab, setActiveTab] = useState("tab-list");
    const [resepBahan, setResepBahan] = useState("");
    const [resepResult, setResepResult] = useState<ResepResult | null>(null);
    const [resepLoading, setResepLoading] = useState(false);

    const handleResepSubmit = async () => {
        if (!resepBahan.trim()) {
            alert("Masukkan daftar bahan yang Anda miliki!");
            return;
        }

        setResepLoading(true);
        setResepResult(null);

        try {
            const res = await fetch("/api/gemini/resep", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bahan: resepBahan }),
            });
            const data = await res.json();

            if (data.error) {
                alert(data.error);
            } else {
                setResepResult(data);
            }
        } catch {
            alert("Gagal terhubung ke layanan Resep Cerdas.");
        } finally {
            setResepLoading(false);
        }
    };

    const activeFeature = features.find((f) => f.id === activeTab)!;

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 page-content">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Fitur Unggulan yang Spektakuler</h1>
                <p className="text-lg text-gray-600 mb-8 max-w-3xl">
                    &quot;SegariHari&quot; bukan hanya e-commerce biasa. Kami merancang fitur cerdas untuk membuat hidup Anda lebih mudah.
                </p>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                    <nav className="flex flex-col space-y-3">
                        {features.map((feature) => (
                            <button
                                key={feature.id}
                                onClick={() => setActiveTab(feature.id)}
                                className={`text-left w-full py-3 px-5 rounded-lg font-semibold shadow transition-all duration-300 ${activeTab === feature.id
                                        ? "bg-green-600 text-white shadow-lg"
                                        : "bg-white text-gray-700 hover:bg-green-50"
                                    }`}
                            >
                                {feature.icon} {feature.title}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="md:w-2/3">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white p-8 rounded-2xl shadow-xl"
                        >
                            <h3 className="text-2xl font-bold text-green-700 mb-3">
                                {activeFeature.icon} {activeFeature.title}
                            </h3>
                            <p className="text-gray-600 mb-4">{activeFeature.description}</p>

                            {activeFeature.hasAI && (
                                <>
                                    <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                                        <h4 className="font-bold text-amber-700 mb-2">Buat Resep Baru Berbasis Bahan Anda</h4>
                                        <input
                                            type="text"
                                            value={resepBahan}
                                            onChange={(e) => setResepBahan(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && handleResepSubmit()}
                                            placeholder="Masukkan bahan yang Anda miliki (mis: ayam, bawang, kecap manis)"
                                            className="w-full py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-amber-500 mb-3"
                                        />
                                        <button
                                            onClick={handleResepSubmit}
                                            disabled={resepLoading}
                                            className="w-full bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-300 flex items-center justify-center disabled:opacity-50"
                                        >
                                            {resepLoading && <span className="loading-animation mr-2" />}
                                            Cari Resep Cerdas!
                                        </button>
                                    </div>

                                    {resepResult && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg"
                                        >
                                            <h4 className="font-bold text-green-700 mb-2">Resep Baru dari Bahan Anda:</h4>
                                            <h3 className="text-xl font-bold mb-1">{resepResult.namaResep}</h3>
                                            <p className="italic text-gray-600 mb-4">{resepResult.deskripsiSingkat}</p>

                                            <h4 className="font-semibold text-lg text-green-600">Bahan-bahan:</h4>
                                            <ul className="list-disc list-inside ml-4 mb-4 space-y-1">
                                                {resepResult.bahanDibutuhkan.map((b, i) => (
                                                    <li key={i}>{b}</li>
                                                ))}
                                            </ul>

                                            <h4 className="font-semibold text-lg text-green-600">Langkah Memasak:</h4>
                                            <ol className="list-decimal list-inside ml-4 space-y-1">
                                                {resepResult.langkahMemasak.map((l, i) => (
                                                    <li key={i}>{l}</li>
                                                ))}
                                            </ol>
                                        </motion.div>
                                    )}
                                </>
                            )}

                            <ul className="list-disc list-inside space-y-2 text-gray-700 mt-6">
                                {activeFeature.points.map((point, i) => (
                                    <li key={i}>{point}</li>
                                ))}
                            </ul>

                            <img
                                src={activeFeature.image}
                                alt={activeFeature.title}
                                className="w-full h-auto rounded-lg mt-6 object-cover"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
