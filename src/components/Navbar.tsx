"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
    const { data: session } = useSession();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <Link href="/" className="text-3xl font-bold text-green-700">
                        SegariHari
                    </Link>

                    <nav className="hidden md:flex space-x-1">
                        <Link href="/" className="nav-link py-2 px-3 text-gray-600 hover:text-green-700 rounded-lg hover:bg-green-50 transition-all">
                            Beranda
                        </Link>
                        <Link href="/fitur" className="nav-link py-2 px-3 text-gray-600 hover:text-green-700 rounded-lg hover:bg-green-50 transition-all">
                            Fitur Unggulan
                        </Link>
                        <Link href="/data" className="nav-link py-2 px-3 text-gray-600 hover:text-green-700 rounded-lg hover:bg-green-50 transition-all">
                            Dasbor Data
                        </Link>
                        <Link href="/tentang" className="nav-link py-2 px-3 text-gray-600 hover:text-green-700 rounded-lg hover:bg-green-50 transition-all">
                            Tentang Kami
                        </Link>
                        <Link href="/shop" className="nav-link py-2 px-3 text-gray-600 hover:text-green-700 rounded-lg hover:bg-green-50 transition-all">
                            🛒 Shop
                        </Link>
                    </nav>

                    <div className="hidden md:flex items-center space-x-3">
                        {session ? (
                            <div className="relative">
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full hover:bg-green-100 transition"
                                >
                                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                        {session.user.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{session.user.name}</span>
                                    {session.user.isMitra && (
                                        <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">Mitra</span>
                                    )}
                                </button>

                                {userMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border py-2 z-50">
                                        <div className="px-4 py-2 border-b">
                                            <p className="text-sm font-semibold text-gray-800">{session.user.name}</p>
                                            <p className="text-xs text-gray-500">{session.user.email}</p>
                                            <p className="text-xs mt-1">
                                                <span className={`px-2 py-0.5 rounded-full ${session.user.isMitra ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                    {session.user.isMitra ? '✅ Mitra Aktif' : '👤 Pembeli'}
                                                </span>
                                            </p>
                                        </div>
                                        <Link href="/shop" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setUserMenuOpen(false)}>
                                            🛒 Belanja
                                        </Link>
                                        {session.user.isMitra ? (
                                            <Link href="/seller" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setUserMenuOpen(false)}>
                                                📊 Dashboard Penjual
                                            </Link>
                                        ) : (
                                            <Link href="/menjadi-mitra" className="block px-4 py-2 text-sm text-amber-600 hover:bg-amber-50" onClick={() => setUserMenuOpen(false)}>
                                                🤝 Menjadi Mitra
                                            </Link>
                                        )}
                                        <hr className="my-1" />
                                        <button
                                            onClick={() => signOut({ callbackUrl: "/" })}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                        >
                                            🚪 Keluar
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex space-x-2">
                                <Link href="/login" className="px-4 py-2 text-green-700 font-medium hover:bg-green-50 rounded-lg transition">
                                    Masuk
                                </Link>
                                <Link href="/register" className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition duration-300 shadow-sm">
                                    Daftar
                                </Link>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-gray-700"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                        </svg>
                    </button>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="md:hidden bg-white shadow-lg border-t">
                    <nav className="flex flex-col p-4 space-y-2">
                        <Link href="/" className="py-2 px-3 text-gray-600 hover:text-green-700 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Beranda</Link>
                        <Link href="/fitur" className="py-2 px-3 text-gray-600 hover:text-green-700 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Fitur Unggulan</Link>
                        <Link href="/data" className="py-2 px-3 text-gray-600 hover:text-green-700 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Dasbor Data</Link>
                        <Link href="/tentang" className="py-2 px-3 text-gray-600 hover:text-green-700 rounded-lg" onClick={() => setMobileMenuOpen(false)}>Tentang Kami</Link>
                        <Link href="/shop" className="py-2 px-3 text-gray-600 hover:text-green-700 rounded-lg" onClick={() => setMobileMenuOpen(false)}>🛒 Shop</Link>
                        <hr />
                        {session ? (
                            <>
                                <div className="px-3 py-2">
                                    <p className="font-semibold text-gray-800">{session.user.name}</p>
                                    <p className="text-xs text-gray-500">{session.user.isMitra ? '✅ Mitra' : '👤 Pembeli'}</p>
                                </div>
                                {session.user.isMitra ? (
                                    <Link href="/seller" className="py-2 px-3 text-gray-600 hover:text-green-700 rounded-lg" onClick={() => setMobileMenuOpen(false)}>📊 Dashboard Penjual</Link>
                                ) : (
                                    <Link href="/menjadi-mitra" className="py-2 px-3 text-amber-600 hover:bg-amber-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>🤝 Menjadi Mitra</Link>
                                )}
                                <button onClick={() => signOut({ callbackUrl: "/" })} className="py-2 px-3 text-red-600 text-left rounded-lg">🚪 Keluar</button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="py-2 px-3 text-green-700 font-medium rounded-lg" onClick={() => setMobileMenuOpen(false)}>Masuk</Link>
                                <Link href="/register" className="bg-green-600 text-white px-5 py-2 rounded-full text-center hover:bg-green-700 transition" onClick={() => setMobileMenuOpen(false)}>Daftar</Link>
                            </>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
}
