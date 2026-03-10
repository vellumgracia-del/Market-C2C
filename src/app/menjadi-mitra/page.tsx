"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const mitraSchema = z.object({
    namaUmkm: z.string().min(3, "Nama UMKM minimal 3 karakter"),
    nomorKTP: z.string().length(16, "Nomor KTP harus 16 digit").regex(/^\d+$/, "Nomor KTP harus berupa angka"),
    alamatUmkm: z.string().min(10, "Alamat minimal 10 karakter"),
    deskripsiUsaha: z.string().min(20, "Deskripsi usaha minimal 20 karakter"),
});

type MitraForm = z.infer<typeof mitraSchema>;

export default function MenjadiMitraPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<MitraForm>({
        resolver: zodResolver(mitraSchema),
    });

    if (session?.user?.mitraStatus === "PENDING") {
        return (
            <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[70vh]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-2xl shadow-xl p-8 max-w-lg text-center"
                >
                    <div className="text-6xl mb-4">⏳</div>
                    <h1 className="text-3xl font-bold text-amber-600 mb-4">Pendaftaran Sedang Diproses</h1>
                    <p className="text-gray-600 mb-6">
                        Pendaftaran Mitra Anda sedang dalam proses verifikasi oleh tim kami. Kami akan menghubungi Anda segera setelah verifikasi selesai.
                    </p>
                    <button onClick={() => router.push("/")} className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                        Kembali ke Beranda
                    </button>
                </motion.div>
            </div>
        );
    }

    if (submitStatus === "success") {
        return (
            <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[70vh]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-2xl shadow-xl p-8 max-w-lg text-center"
                >
                    <div className="text-6xl mb-4">🎉</div>
                    <h1 className="text-3xl font-bold text-green-700 mb-4">Pendaftaran Berhasil!</h1>
                    <p className="text-gray-600 mb-6">
                        Data Anda telah kami terima. Tim verifikasi kami akan memprosesnya dalam 1-3 hari kerja.
                    </p>
                    <button onClick={() => router.push("/")} className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                        Kembali ke Beranda
                    </button>
                </motion.div>
            </div>
        );
    }

    const onSubmit = async (data: MitraForm) => {
        setSubmitStatus("loading");
        setServerError("");

        try {
            const res = await fetch("/api/mitra/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!res.ok) {
                setServerError(result.error);
                setSubmitStatus("error");
            } else {
                setSubmitStatus("success");
            }
        } catch {
            setServerError("Terjadi kesalahan. Coba lagi nanti.");
            setSubmitStatus("error");
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-2xl p-8 text-white mb-8">
                    <h1 className="text-3xl font-bold mb-3">🤝 Menjadi Mitra SegariHari</h1>
                    <p className="text-green-100 text-lg">
                        Bergabunglah sebagai mitra penjual dan jangkau ribuan pelanggan baru! Isi formulir di bawah untuk memulai.
                    </p>
                    <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                        <div className="bg-white/20 rounded-lg p-3">
                            <div className="text-2xl font-bold">0%</div>
                            <div className="text-sm text-green-100">Biaya Pendaftaran</div>
                        </div>
                        <div className="bg-white/20 rounded-lg p-3">
                            <div className="text-2xl font-bold">1-3</div>
                            <div className="text-sm text-green-100">Hari Verifikasi</div>
                        </div>
                        <div className="bg-white/20 rounded-lg p-3">
                            <div className="text-2xl font-bold">10K+</div>
                            <div className="text-sm text-green-100">Pelanggan Aktif</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Formulir Pendaftaran Mitra</h2>

                    {serverError && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                            {serverError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nama UMKM / Toko</label>
                            <input
                                {...register("namaUmkm")}
                                className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Contoh: Toko Sayur Maju Jaya"
                            />
                            {errors.namaUmkm && <p className="text-red-500 text-sm mt-1">{errors.namaUmkm.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nomor KTP</label>
                            <input
                                {...register("nomorKTP")}
                                maxLength={16}
                                className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="16 digit nomor KTP"
                            />
                            {errors.nomorKTP && <p className="text-red-500 text-sm mt-1">{errors.nomorKTP.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Alamat UMKM</label>
                            <textarea
                                {...register("alamatUmkm")}
                                rows={3}
                                className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Alamat lengkap tempat usaha"
                            />
                            {errors.alamatUmkm && <p className="text-red-500 text-sm mt-1">{errors.alamatUmkm.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Usaha</label>
                            <textarea
                                {...register("deskripsiUsaha")}
                                rows={4}
                                className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Jelaskan usaha Anda (jenis produk, pengalaman berjualan, dll)"
                            />
                            {errors.deskripsiUsaha && <p className="text-red-500 text-sm mt-1">{errors.deskripsiUsaha.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={submitStatus === "loading"}
                            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition duration-300 disabled:opacity-50 flex items-center justify-center"
                        >
                            {submitStatus === "loading" && <span className="loading-animation mr-2" />}
                            Kirim Pendaftaran
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
