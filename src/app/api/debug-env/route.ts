import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({
        message: "Diagnostic Information",
        environment: {
            hasDatabaseUrl: !!process.env.DATABASE_URL,
            databaseUrlLength: process.env.DATABASE_URL?.length || 0,
            hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
            hasAuthSecret: !!process.env.AUTH_SECRET,
            authUrl: process.env.AUTH_URL || "NOT SET",
            nextAuthUrl: process.env.NEXTAUTH_URL || "NOT SET",
            nodeEnv: process.env.NODE_ENV,
        }
    });
}
