"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const promoProducts = [
  {
    id: 1,
    name: "Brokoli Organik",
    unit: "500 gr / ikat",
    price: 14000,
    originalPrice: 20000,
    discount: "Diskon 30%",
    image: "/images/brokoli.png",
  },
  {
    id: 2,
    name: "Daging Sapi Has Dalam",
    unit: "250 gr / pack",
    price: 48000,
    originalPrice: 60000,
    discount: "Diskon 20%",
    image: "/images/daging-sapi.png",
  },
  {
    id: 3,
    name: "Telur Ayam Omega-3",
    unit: "10 butir / pack",
    price: 30000,
    originalPrice: null,
    discount: "Beli 1 Gratis 1",
    image: "/images/telur-ayam.png",
  },
  {
    id: 4,
    name: "Jeruk Sunkist Navel",
    unit: "1 kg",
    price: 24000,
    originalPrice: 40000,
    discount: "Diskon 40%",
    image: "/images/jeruk-sunkist.png",
  },
];

const categories = [
  { emoji: "🥦", name: "Sayuran", gradient: "from-green-100 to-green-200", text: "text-green-900" },
  { emoji: "🍎", name: "Buah-buahan", gradient: "from-red-100 to-red-200", text: "text-red-900" },
  { emoji: "🥩", name: "Daging & Unggas", gradient: "from-orange-100 to-orange-200", text: "text-orange-900" },
  { emoji: "🐟", name: "Ikan & Seafood", gradient: "from-cyan-100 to-cyan-200", text: "text-cyan-900" },
  { emoji: "🥛", name: "Susu & Telur", gradient: "from-yellow-100 to-yellow-200", text: "text-yellow-900" },
  { emoji: "🍞", name: "Kebutuhan Dapur", gradient: "from-gray-100 to-gray-200", text: "text-gray-900" },
];

function formatRupiah(num: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
}

export default function HomePage() {
  const [pakarQuery, setPakarQuery] = useState("");
  const [pakarResponse, setPakarResponse] = useState<{ text: string; sources: { uri: string; title: string }[] } | null>(null);
  const [pakarLoading, setPakarLoading] = useState(false);

  const handlePakarSubmit = async () => {
    if (!pakarQuery.trim()) {
      alert("Masukkan pertanyaan Anda terlebih dahulu!");
      return;
    }

    setPakarLoading(true);
    setPakarResponse(null);

    try {
      const res = await fetch("/api/gemini/pakar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: pakarQuery }),
      });
      const data = await res.json();

      if (data.error) {
        setPakarResponse({ text: data.error, sources: [] });
      } else {
        setPakarResponse(data);
      }
    } catch {
      setPakarResponse({ text: "Maaf, gagal terhubung ke layanan Pakar. Coba lagi nanti.", sources: [] });
    } finally {
      setPakarLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 page-content">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center overflow-hidden relative"
      >
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-green-100 rounded-full opacity-50" />
        <div className="absolute -bottom-20 -right-10 w-64 h-64 bg-amber-100 rounded-full opacity-50" />

        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
            Kesegaran Harian, Langsung ke Rumah Anda
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Platform e-commerce &quot;SegariHari&quot; dirancang untuk merevolusi cara Anda berbelanja kebutuhan sehari-hari. Cepat, cerdas, dan selalu segar.
          </p>
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari sayur, buah, atau daging segar..."
                className="w-full py-4 px-6 pr-32 rounded-full bg-gray-100 border-2 border-transparent focus:outline-none focus:border-green-300 focus:bg-white transition"
              />
              <Link
                href="/shop"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 text-white px-6 py-2.5 rounded-full hover:bg-green-700 transition duration-300 shadow-sm"
              >
                Cari
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tanya Pakar Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-12 bg-white p-8 rounded-2xl shadow-xl"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="text-4xl mr-3">✨</span> Tanya Pakar SegariHari
        </h2>
        <p className="text-gray-600 mb-4 max-w-3xl">
          Dapatkan jawaban instan dan terkini dari Gemini mengenai nutrisi, tren harga, atau saran memasak.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            value={pakarQuery}
            onChange={(e) => setPakarQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handlePakarSubmit()}
            placeholder="Contoh: Berapa harga rata-rata telur ayam hari ini?"
            className="flex-grow py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handlePakarSubmit}
            disabled={pakarLoading}
            className="bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition duration-300 flex items-center justify-center disabled:opacity-50"
          >
            {pakarLoading && <span className="loading-animation mr-2" />}
            Tanyakan Sekarang
          </button>
        </div>

        {pakarResponse && (
          <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h4 className="font-bold text-gray-800 mb-2">Jawaban Pakar:</h4>
            <p className="text-gray-700 whitespace-pre-wrap">{pakarResponse.text}</p>
            {pakarResponse.sources?.length > 0 && (
              <div className="mt-3 text-sm text-gray-500">
                <p className="font-semibold mt-2">Sumber:</p>
                <ul className="list-disc list-inside space-y-1">
                  {pakarResponse.sources.slice(0, 3).map((source, i) => (
                    <li key={i}>
                      <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 underline">
                        {source.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </motion.section>

      {/* Promo Kilat */}
      <section className="mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Promo Kilat Hari Ini ⚡</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {promoProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative w-full h-48">
                <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
              </div>
              <div className="p-4">
                <span className="inline-block bg-red-200 text-red-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">
                  {product.discount}
                </span>
                <h3 className="text-xl font-semibold my-2">{product.name}</h3>
                <p className="text-gray-600 mb-3">{product.unit}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-green-700">{formatRupiah(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through">{formatRupiah(product.originalPrice)}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Jelajahi Kategori */}
      <section className="mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Jelajahi Kategori</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`bg-gradient-to-br ${cat.gradient} p-6 rounded-lg text-center shadow-sm hover:shadow-lg transition duration-300 cursor-pointer`}
            >
              <div className="text-4xl mb-2">{cat.emoji}</div>
              <span className={`font-semibold ${cat.text}`}>{cat.name}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
