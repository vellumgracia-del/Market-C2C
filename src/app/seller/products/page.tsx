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

interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    status: string;
}

const sampleProducts: Product[] = [
    { id: "PRD-001", name: "Brokoli Organik", category: "Sayuran", price: 14000, stock: 150, status: "Aktif" },
    { id: "PRD-002", name: "Bayam Segar", category: "Sayuran", price: 5000, stock: 200, status: "Aktif" },
    { id: "PRD-003", name: "Wortel Import", category: "Sayuran", price: 12000, stock: 80, status: "Aktif" },
    { id: "PRD-004", name: "Daging Sapi Has Dalam", category: "Daging & Unggas", price: 48000, stock: 30, status: "Aktif" },
    { id: "PRD-005", name: "Ayam Kampung", category: "Daging & Unggas", price: 85000, stock: 15, status: "Aktif" },
    { id: "PRD-006", name: "Telur Ayam Omega-3", category: "Susu & Telur", price: 30000, stock: 100, status: "Aktif" },
    { id: "PRD-007", name: "Susu Segar", category: "Susu & Telur", price: 18000, stock: 50, status: "Aktif" },
    { id: "PRD-008", name: "Ikan Salmon", category: "Ikan & Seafood", price: 65000, stock: 20, status: "Nonaktif" },
    { id: "PRD-009", name: "Udang Segar", category: "Ikan & Seafood", price: 55000, stock: 40, status: "Aktif" },
    { id: "PRD-010", name: "Jeruk Sunkist", category: "Buah-buahan", price: 24000, stock: 60, status: "Aktif" },
    { id: "PRD-011", name: "Apel Fuji", category: "Buah-buahan", price: 35000, stock: 45, status: "Aktif" },
    { id: "PRD-012", name: "Roti Tawar", category: "Kebutuhan Dapur", price: 15000, stock: 70, status: "Nonaktif" },
];

const columnHelper = createColumnHelper<Product>();

function formatRupiah(num: number) {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
}

export default function SellerProductsPage() {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState("");

    const columns = useMemo(
        () => [
            columnHelper.accessor("id", {
                header: "ID",
                cell: (info) => <span className="font-mono text-sm text-gray-500">{info.getValue()}</span>,
            }),
            columnHelper.accessor("name", {
                header: "Nama Produk",
                cell: (info) => <span className="font-medium text-gray-800">{info.getValue()}</span>,
            }),
            columnHelper.accessor("category", {
                header: "Kategori",
                cell: (info) => <span className="text-sm bg-gray-100 px-2 py-1 rounded">{info.getValue()}</span>,
            }),
            columnHelper.accessor("price", {
                header: "Harga",
                cell: (info) => <span className="font-semibold text-green-700">{formatRupiah(info.getValue())}</span>,
            }),
            columnHelper.accessor("stock", {
                header: "Stok",
                cell: (info) => {
                    const stock = info.getValue();
                    return (
                        <span className={`font-medium ${stock < 20 ? "text-red-600" : stock < 50 ? "text-amber-600" : "text-green-600"}`}>
                            {stock}
                        </span>
                    );
                },
            }),
            columnHelper.accessor("status", {
                header: "Status",
                cell: (info) => (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${info.getValue() === "Aktif" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {info.getValue()}
                    </span>
                ),
            }),
            columnHelper.display({
                id: "actions",
                header: "Aksi",
                cell: () => (
                    <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                        <button className="text-red-600 hover:text-red-800 text-sm font-medium">Hapus</button>
                    </div>
                ),
            }),
        ],
        []
    );

    const table = useReactTable({
        data: sampleProducts,
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
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">📦 Produk Saya</h1>
                    <button className="mt-3 md:mt-0 bg-green-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-green-700 transition">
                        + Tambah Produk
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                    {/* Search & Filter */}
                    <div className="flex flex-col md:flex-row gap-3 mb-4">
                        <input
                            value={globalFilter ?? ""}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Cari produk..."
                            className="py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 flex-grow"
                        />
                        <div className="text-sm text-gray-500 flex items-center">
                            {table.getFilteredRowModel().rows.length} produk ditemukan
                        </div>
                    </div>

                    {/* Table */}
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

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                        <div className="text-sm text-gray-500">
                            Halaman {table.getState().pagination.pageIndex + 1} dari {table.getPageCount()}
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
