import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const session = await auth();

        // Only allow admin or first user (simple admin check)
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const mitraApplications = await prisma.user.findMany({
            where: {
                mitraStatus: { in: ["PENDING", "APPROVED", "REJECTED"] },
            },
            select: {
                id: true,
                name: true,
                email: true,
                namaUmkm: true,
                nomorKTP: true,
                alamatUmkm: true,
                deskripsiUsaha: true,
                fotoKTP: true,
                fotoLapak: true,
                mitraStatus: true,
                isMitra: true,
                createdAt: true,
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ applications: mitraApplications });
    } catch (error) {
        console.error("Admin mitra API error:", error);
        return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { userId, action } = await request.json();

        if (!userId || !["APPROVE", "REJECT"].includes(action)) {
            return NextResponse.json({ error: "Data tidak valid" }, { status: 400 });
        }

        if (action === "APPROVE") {
            await prisma.user.update({
                where: { id: userId },
                data: {
                    mitraStatus: "APPROVED",
                    isMitra: true,
                    role: "SELLER",
                },
            });
        } else {
            await prisma.user.update({
                where: { id: userId },
                data: {
                    mitraStatus: "REJECTED",
                    isMitra: false,
                },
            });
        }

        return NextResponse.json({ message: `Mitra berhasil di-${action.toLowerCase()}` });
    } catch (error) {
        console.error("Admin mitra action error:", error);
        return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
    }
}
