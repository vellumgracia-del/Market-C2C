import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const mitraSchema = z.object({
    namaUmkm: z.string().min(3, "Nama UMKM minimal 3 karakter"),
    nomorKTP: z.string().min(16, "Nomor KTP harus 16 digit").max(16, "Nomor KTP harus 16 digit"),
    alamatUmkm: z.string().min(10, "Alamat minimal 10 karakter"),
    deskripsiUsaha: z.string().min(20, "Deskripsi usaha minimal 20 karakter"),
});

export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const data = mitraSchema.parse(body);

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
        });

        if (user?.isMitra) {
            return NextResponse.json(
                { error: "Anda sudah terdaftar sebagai Mitra" },
                { status: 400 }
            );
        }

        if (user?.mitraStatus === "PENDING") {
            return NextResponse.json(
                { error: "Pendaftaran Anda sedang diproses" },
                { status: 400 }
            );
        }

        await prisma.user.update({
            where: { id: session.user.id },
            data: {
                namaUmkm: data.namaUmkm,
                nomorKTP: data.nomorKTP,
                alamatUmkm: data.alamatUmkm,
                deskripsiUsaha: data.deskripsiUsaha,
                mitraStatus: "PENDING",
            },
        });

        return NextResponse.json(
            { message: "Pendaftaran mitra berhasil dikirim! Menunggu verifikasi admin." },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.issues[0].message },
                { status: 400 }
            );
        }
        console.error("Mitra register error:", error);
        return NextResponse.json(
            { error: "Terjadi kesalahan server" },
            { status: 500 }
        );
    }
}
