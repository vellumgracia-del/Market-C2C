import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

    const isLoggedIn = !!token;
    const isMitra = token?.isMitra === true;

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
}

export const config = {
    matcher: ["/seller/:path*", "/menjadi-mitra", "/shop/checkout", "/shop/orders"],
};
