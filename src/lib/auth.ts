import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
    secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
    trustHost: true,
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email as string },
                    });

                    if (!user) return null;

                    const isPasswordValid = await bcrypt.compare(
                        credentials.password as string,
                        user.password
                    );

                    if (!isPasswordValid) return null;

                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        isMitra: user.isMitra,
                        mitraStatus: user.mitraStatus,
                    };
                } catch (error) {
                    console.error("NextAuth Authorize Error:", error);
                    return null; // This will trigger the standard UI invalid credentials error, not a 500
                }
            },
        }),
    ],
    debug: true,
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.role = user.role;
                token.isMitra = user.isMitra;
                token.mitraStatus = user.mitraStatus;
            }
            if (trigger === "update" && session) {
                token.role = session.role;
                token.isMitra = session.isMitra;
                token.mitraStatus = session.mitraStatus;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.sub!;
                session.user.role = token.role as string;
                session.user.isMitra = token.isMitra as boolean;
                session.user.mitraStatus = token.mitraStatus as string;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
});
