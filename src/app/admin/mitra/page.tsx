"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface MitraApplication {
    id: string;
    name: string;
    email: string;
    namaUmkm: string | null;
    nomorKTP: string | null;
    alamatUmkm: string | null;
    deskripsiUsaha: string | null;
    mitraStatus: string;
    isMitra: boolean;
    createdAt: string;
}

const statusColors: { [key: string]: string } = {
    PENDING: "bg-amber-100 text-amber-700",
    APPROVED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
};

const statusLabels: { [key: string]: string } = {
    PENDING: "⏳ Menunggu",
    APPROVED: "✅ Disetujui",
    REJECTED: "❌ Ditolak",
};

export default function AdminMitraPage() {
    const [applications, setApplications] = useState<MitraApplication[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [filter, setFilter] = useState("ALL");

    const fetchApplications = async () => {
        try {
            const res = await fetch("/api/admin/mitra");
            const data = await res.json();

            if (data.error) {
                setError(data.error);
            } else {
                setApplications(data.applications);
            }
        } catch {
            setError("Gagal memuat data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const handleAction = async (userId: string, action: "APPROVE" | "REJECT") => {
        setActionLoading(userId);
        try {
            const res = await fetch("/api/admin/mitra", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, action }),
            });

            if (res.ok) {
                fetchApplications();
            }
        } catch {
            alert("Gagal memproses aksi");
        } finally {
            setActionLoading(null);
        }
    };

    const filtered = filter === "ALL" ? applications : applications.filter((a) => a.mitraStatus === filter);

    const counts = {
        ALL: applications.length,
        PENDING: applications.filter((a) => a.mitraStatus === "PENDING").length,
        APPROVED: applications.filter((a) => a.mitraStatus === "APPROVED").length,
        REJECTED: applications.filter((a) => a.mitraStatus === "REJECTED").length,
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="loading-animation mx-auto mb-4" style={{ width: 40, height: 40 }} />
                <p className="text-gray-500">Memuat data pendaftaran mitra...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="text-6xl mb-4">⚠️</div>
                <p className="text-red-600 text-lg">{error}</p>
                <p className="text-gray-500 mt-2">Pastikan Anda sudah login terlebih dahulu.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 page-content">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">🛡️ Admin — Pendaftaran Mitra</h1>
                <p className="text-gray-600 mb-6">Kelola pendaftaran mitra yang masuk. Setujui atau tolak aplikasi.</p>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {(["ALL", "PENDING", "APPROVED", "REJECTED"] as const).map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === status ? "bg-green-600 text-white shadow" : "bg-white text-gray-600 border hover:bg-green-50"
                                }`}
                        >
                            {status === "ALL" ? "Semua" : statusLabels[status]} ({counts[status]})
                        </button>
                    ))}
                </div>

                {/* Applications List */}
                {filtered.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                        <div className="text-6xl mb-4">📋</div>
                        <p className="text-gray-500 text-lg">Belum ada pendaftaran mitra.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filtered.map((app) => (
                            <motion.div
                                key={app.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-xl shadow-sm p-6 border hover:shadow-md transition"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-3 mb-3">
                                            <h3 className="text-xl font-bold text-gray-800">{app.namaUmkm || "—"}</h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[app.mitraStatus]}`}>
                                                {statusLabels[app.mitraStatus]}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                            <div>
                                                <span className="text-gray-500 font-medium">Nama:</span>
                                                <span className="ml-2 text-gray-800">{app.name}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500 font-medium">Email:</span>
                                                <span className="ml-2 text-gray-800">{app.email}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500 font-medium">No. KTP:</span>
                                                <span className="ml-2 text-gray-800 font-mono">{app.nomorKTP || "—"}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500 font-medium">Tanggal Daftar:</span>
                                                <span className="ml-2 text-gray-800">
                                                    {new Date(app.createdAt).toLocaleDateString("id-ID", {
                                                        day: "numeric",
                                                        month: "long",
                                                        year: "numeric",
                                                    })}
                                                </span>
                                            </div>
                                        </div>

                                        {app.alamatUmkm && (
                                            <div className="mt-3 text-sm">
                                                <span className="text-gray-500 font-medium">Alamat:</span>
                                                <p className="text-gray-700 mt-1">{app.alamatUmkm}</p>
                                            </div>
                                        )}
                                        {app.deskripsiUsaha && (
                                            <div className="mt-2 text-sm">
                                                <span className="text-gray-500 font-medium">Deskripsi Usaha:</span>
                                                <p className="text-gray-700 mt-1">{app.deskripsiUsaha}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    {app.mitraStatus === "PENDING" && (
                                        <div className="flex gap-2 lg:flex-col lg:min-w-[120px]">
                                            <button
                                                onClick={() => handleAction(app.id, "APPROVE")}
                                                disabled={actionLoading === app.id}
                                                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition disabled:opacity-50"
                                            >
                                                ✅ Setujui
                                            </button>
                                            <button
                                                onClick={() => handleAction(app.id, "REJECT")}
                                                disabled={actionLoading === app.id}
                                                className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition disabled:opacity-50"
                                            >
                                                ❌ Tolak
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
}
