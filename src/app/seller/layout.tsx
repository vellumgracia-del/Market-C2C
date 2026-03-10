"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";

const sidebarLinks = [
    { href: "/seller", label: "📊 Overview", exact: true },
    { href: "/seller/products", label: "📦 Produk Saya", exact: false },
    { href: "/seller/orders", label: "🧾 Pesanan Masuk", exact: false },
];

export default function SellerLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const { data: session } = useSession();

    return (
        <div className="flex min-h-[calc(100vh-180px)]">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg border-r hidden md:block">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-green-700">Dashboard Penjual</h2>
                    <p className="text-sm text-gray-500 mt-1">{session?.user?.name}</p>
                </div>
                <nav className="p-4 space-y-1">
                    {sidebarLinks.map((link) => {
                        const isActive = link.exact ? pathname === link.href : pathname.startsWith(link.href);
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`block py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${isActive ? "bg-green-50 text-green-700 border-l-4 border-green-600" : "text-gray-600 hover:bg-gray-50"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 border-t mt-auto">
                    <Link href="/shop" className="block py-2.5 px-4 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
                        🛒 Ke Toko
                    </Link>
                    <Link href="/" className="block py-2.5 px-4 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
                        🏠 Ke Beranda
                    </Link>
                </div>
            </aside>

            {/* Mobile nav */}
            <div className="md:hidden w-full">
                <div className="bg-white shadow-sm border-b p-3 flex space-x-2 overflow-x-auto">
                    {sidebarLinks.map((link) => {
                        const isActive = link.exact ? pathname === link.href : pathname.startsWith(link.href);
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${isActive ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 md:p-8 bg-gray-50">{children}</div>
        </div>
    );
}
