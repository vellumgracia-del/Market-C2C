"use client";

import SplashScreen from "@/components/SplashScreen";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return <SplashScreen>{children}</SplashScreen>;
}
