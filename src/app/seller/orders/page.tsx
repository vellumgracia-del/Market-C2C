"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
    createColumnHelper,
    SortingState,
} from "@tanstack/react-table";

interface Order {
    id: string;
    buyer: string;
    items: string;
    total: number;
    status: string;
    date: string;
}

const sampleOrders: Order[] = [
    { id: "ORD-001", buyer: "Ahmad Hidayat", items: "Brokoli (2), Wortel (1)", total: 40000, status: "Baru", date: "2026-03-10" },
    { id: "ORD-002", buyer: "Siti Nurhaliza", items: "Daging Sapi (1)", total: 48000, status: "Diproses", date: "2026-03-10" },
    { id: "ORD-003", buyer: "Budi Santoso", items: "Telur (2), Susu (1), Roti (2)", total: 93000, status: "Dikirim", date: "2026-03-09" },
    { id: "ORD-004", buyer: "Dewi Sartika", items: "Salmon (1), Udang (1)", total: 120000, status: "Selesai", date: "2026-03-09" },
    { id: "ORD-005", buyer: "Rahmat Pratama", items: "Bayam (3), Brokoli (1)", total: 29000, status: "Baru", date: "2026-03-09" },
    { id: "ORD-006", buyer: "Lina Marlina", items: "Jeruk (2), Apel (1)", total: 83000, status: "Diproses", date: "2026-03-08" },
    { id: "ORD-007", buyer: "Agus Setiawan", items: "Ayam Kampung (1)", total: 85000, status: "Dikirim", date: "2026-03-08" },
    { id: "ORD-008", buyer: "Maya Indah", items: "Susu (3), Telur (1)", total: 84000, status: "Selesai", date: "2026-03-07" },
];

const columnHelper = createColumnHelper<Order>();

const statusColors: { [key: string]: string } = {
    Baru: "bg-blue-100 text-blue-700",
    Diproses: "bg-amber-100 text-amber-700",
    Dikirim: "bg-purple-100 text-purple-700",
    Selesai: "bg-green-100 text-green-700",
};

function formatRupiah(num: number) {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
}

export default function SellerOrdersPage() {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("Semua");

    const filteredOrders = useMemo(() => {
        if (statusFilter === "Semua") return sampleOrders;
        return sampleOrders.filter((o) => o.status === statusFilter);
    }, [statusFilter]);

    const columns = useMemo(
        () => [
            columnHelper.accessor("id", {
                header: "ID Pesanan",
                cell: (info) => <span className="font-mono text-sm font-medium text-green-700">{info.getValue()}</span>,
            }),
            columnHelper.accessor("buyer", {
                header: "Pembeli",
                cell: (info) => <span className="font-medium">{info.getValue()}</span>,
            }),
            columnHelper.accessor("items", {
                header: "Produk",
                cell: (info) => <span className="text-sm text-gray-600">{info.getValue()}</span>,
            }),
            columnHelper.accessor("total", {
                header: "Total",
                cell: (info) => <span className="font-semibold">{formatRupiah(info.getValue())}</span>,
            }),
            columnHelper.accessor("status", {
                header: "Status",
                cell: (info) => (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[info.getValue()]}`}>
                        {info.getValue()}
                    </span>
                ),
            }),
            columnHelper.accessor("date", {
                header: "Tanggal",
                cell: (info) => <span className="text-gray-500">{info.getValue()}</span>,
            }),
            columnHelper.display({
                id: "actions",
                header: "Aksi",
                cell: (info) => {
                    const status = info.row.original.status;
                    return (
                        <div className="flex gap-2">
                            {status === "Baru" && (
                                <button className="text-green-600 hover:text-green-800 text-sm font-medium">Proses</button>
                            )}
                            {status === "Diproses" && (
                                <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">Kirim</button>
                            )}
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Detail</button>
                        </div>
                    );
                },
            }),
        ],
        []
    );

    const table = useReactTable({
        data: filteredOrders,
        columns,
        state: { sorting, globalFilter },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: 10 } },
    });

    return (
        <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-3xl font-bold text-gray-800 mb-6">🧾 Pesanan Masuk</h1>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {["Semua", "Baru", "Diproses", "Dikirim"].map((status) => {
                        const count = status === "Semua" ? sampleOrders.length : sampleOrders.filter((o) => o.status === status).length;
                        return (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`p-3 rounded-lg text-center transition ${statusFilter === status ? "bg-green-600 text-white shadow-md" : "bg-white text-gray-600 hover:bg-green-50 shadow-sm"
                                    }`}
                            >
                                <div className="text-2xl font-bold">{count}</div>
                                <div className="text-sm">{status}</div>
                            </button>
                        );
                    })}
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex gap-3 mb-4">
                        <input
                            value={globalFilter ?? ""}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Cari pesanan..."
                            className="py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 flex-grow"
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id} className="border-b">
                                        {headerGroup.headers.map((header) => (
                                            <th
                                                key={header.id}
                                                className="pb-3 text-left font-medium text-gray-500 cursor-pointer select-none hover:text-gray-700"
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                <div className="flex items-center gap-1">
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                    {{ asc: " ↑", desc: " ↓" }[header.column.getIsSorted() as string] ?? ""}
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody>
                                {table.getRowModel().rows.map((row) => (
                                    <tr key={row.id} className="border-b last:border-b-0 hover:bg-gray-50 transition">
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className="py-3 pr-4">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                        <div className="text-sm text-gray-500">
                            {table.getFilteredRowModel().rows.length} pesanan
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                                className="px-3 py-1 rounded border text-sm disabled:opacity-30 hover:bg-gray-50"
                            >
                                ← Sebelumnya
                            </button>
                            <button
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                                className="px-3 py-1 rounded border text-sm disabled:opacity-30 hover:bg-gray-50"
                            >
                                Selanjutnya →
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
