import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const { pathname } = req.nextUrl;
    const isLoggedIn = !!req.auth;
    const isMitra = req.auth?.user?.isMitra;

    // Protect seller dashboard
    if (pathname.startsWith("/seller")) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
        if (!isMitra) {
            return NextResponse.redirect(new URL("/menjadi-mitra", req.url));
        }
    }

    // Protect menjadi-mitra page
    if (pathname === "/menjadi-mitra") {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
        if (isMitra) {
            return NextResponse.redirect(new URL("/seller", req.url));
        }
    }

    // Protect checkout and orders
    if (pathname.startsWith("/shop/checkout") || pathname.startsWith("/shop/orders")) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/seller/:path*", "/menjadi-mitra", "/shop/checkout", "/shop/orders"],
};
