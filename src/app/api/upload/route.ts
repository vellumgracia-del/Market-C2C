import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get("file") as File | null;
        const type = formData.get("type") as string | null;

        if (!file) {
            return NextResponse.json({ error: "File diperlukan" }, { status: 400 });
        }

        if (!type || !["ktp", "lapak"].includes(type)) {
            return NextResponse.json({ error: "Tipe file tidak valid" }, { status: 400 });
        }

        // Validate file type
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({ error: "Format file harus JPG, PNG, atau WebP" }, { status: 400 });
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json({ error: "Ukuran file maksimal 5MB" }, { status: 400 });
        }

        // Create upload directory
        const uploadDir = path.join(process.cwd(), "public", "uploads", "mitra", session.user.id);
        await mkdir(uploadDir, { recursive: true });

        // Generate filename
        const ext = file.name.split(".").pop() || "jpg";
        const fileName = `${type}-${Date.now()}.${ext}`;
        const filePath = path.join(uploadDir, fileName);

        // Write file
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filePath, buffer);

        // Return the public URL path
        const publicPath = `/uploads/mitra/${session.user.id}/${fileName}`;

        return NextResponse.json({ path: publicPath, message: "Upload berhasil" });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Gagal mengupload file" }, { status: 500 });
    }
}
