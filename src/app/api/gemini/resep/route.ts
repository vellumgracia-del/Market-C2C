import { NextResponse } from "next/server";

const GEMINI_MODEL = "gemini-2.5-flash-preview-04-17";

export async function POST(request: Request) {
    try {
        const { bahan } = await request.json();

        if (!bahan) {
            return NextResponse.json({ error: "Bahan diperlukan" }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "API key tidak dikonfigurasi" }, { status: 500 });
        }

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

        const systemPrompt = `Anda adalah seorang koki ahli. Buatlah satu resep masakan dalam Bahasa Indonesia yang menggunakan bahan-bahan berikut. Pastikan resep tersebut memiliki nama, daftar bahan (termasuk jumlah yang dibutuhkan), dan langkah-langkah memasak. Output harus dalam format JSON sesuai skema yang diberikan.`;

        const payload = {
            contents: [{ parts: [{ text: `Buat resep menggunakan bahan-bahan berikut: ${bahan}` }] }],
            systemInstruction: {
                parts: [{ text: systemPrompt }],
            },
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "OBJECT",
                    properties: {
                        namaResep: { type: "STRING", description: "Nama hidangan yang menarik." },
                        deskripsiSingkat: { type: "STRING", description: "Deskripsi singkat resep." },
                        bahanDibutuhkan: {
                            type: "ARRAY",
                            description: "Daftar lengkap bahan dan jumlah yang dibutuhkan.",
                            items: { type: "STRING" },
                        },
                        langkahMemasak: {
                            type: "ARRAY",
                            description: "Langkah-langkah memasak secara berurutan.",
                            items: { type: "STRING" },
                        },
                    },
                    required: ["namaResep", "deskripsiSingkat", "bahanDibutuhkan", "langkahMemasak"],
                },
            },
        };

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errText = await response.text();
            console.error("Gemini API error:", errText);
            return NextResponse.json({ error: "Gagal menghubungi layanan AI" }, { status: 502 });
        }

        const result = await response.json();
        const jsonString = result.candidates?.[0]?.content?.parts?.[0]?.text;

        if (jsonString) {
            const parsedRecipe = JSON.parse(jsonString);
            return NextResponse.json(parsedRecipe);
        }

        return NextResponse.json({ error: "Tidak ada respons dari AI" }, { status: 500 });
    } catch (error) {
        console.error("Resep API error:", error);
        return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
    }
}
