"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen({ children }: { children: React.ReactNode }) {
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowSplash(false), 2800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <AnimatePresence>
                {showSplash && (
                    <motion.div
                        key="splash"
                        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 overflow-hidden"
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        {/* Floating particles */}
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute rounded-full bg-white/10"
                                style={{
                                    width: 8 + Math.random() * 20,
                                    height: 8 + Math.random() * 20,
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                }}
                                animate={{
                                    y: [-20, -60 - Math.random() * 40],
                                    opacity: [0, 0.6, 0],
                                    scale: [0.5, 1, 0.3],
                                }}
                                transition={{
                                    duration: 2 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 2,
                                    ease: "easeOut",
                                }}
                            />
                        ))}

                        {/* Leaf icon animation */}
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                            className="mb-6"
                        >
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl">
                                <motion.span
                                    className="text-5xl"
                                    animate={{ rotateY: [0, 360] }}
                                    transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                                >
                                    🌿
                                </motion.span>
                            </div>
                        </motion.div>

                        {/* Logo text */}
                        <motion.h1
                            className="text-5xl md:text-6xl font-bold text-white tracking-tight"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            Segari
                            <motion.span
                                className="text-amber-300"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                            >
                                Hari
                            </motion.span>
                        </motion.h1>

                        {/* Tagline */}
                        <motion.p
                            className="text-green-100 text-lg mt-3 tracking-wide"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 1.2 }}
                        >
                            Kesegaran Harian untuk Keluarga
                        </motion.p>

                        {/* Loading bar */}
                        <motion.div
                            className="mt-8 w-48 h-1 bg-white/20 rounded-full overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.4 }}
                        >
                            <motion.div
                                className="h-full bg-amber-300 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1.2, delay: 1.5, ease: "easeInOut" }}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showSplash ? 0 : 1 }}
                transition={{ duration: 0.3 }}
            >
                {children}
            </motion.div>
        </>
    );
}
