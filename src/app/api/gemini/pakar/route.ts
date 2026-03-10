import { NextResponse } from "next/server";

const GEMINI_MODEL = "gemini-2.0-flash";

export async function POST(request: Request) {
    try {
        const { query } = await request.json();

        if (!query) {
            return NextResponse.json({ error: "Query diperlukan" }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "API key tidak dikonfigurasi" }, { status: 500 });
        }

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

        const systemPrompt = `Anda adalah seorang ahli pangan dan analis pasar dari SegariHari. Jawab pertanyaan pengguna dengan ringkas, fokus, dan informatif. Gunakan informasi terkini dari Google Search. Respon harus dalam Bahasa Indonesia.`;

        const payload = {
            contents: [{ parts: [{ text: query }] }],
            tools: [{ google_search: {} }],
            systemInstruction: {
                parts: [{ text: systemPrompt }],
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
        const candidate = result.candidates?.[0];

        if (candidate?.content?.parts?.[0]?.text) {
            const text = candidate.content.parts[0].text;
            let sources: { uri: string; title: string }[] = [];
            const groundingMetadata = candidate.groundingMetadata;

            if (groundingMetadata?.groundingAttributions) {
                sources = groundingMetadata.groundingAttributions
                    .map((attr: { web?: { uri?: string; title?: string } }) => ({
                        uri: attr.web?.uri,
                        title: attr.web?.title,
                    }))
                    .filter((s: { uri?: string; title?: string }) => s.uri && s.title);
            }

            return NextResponse.json({ text, sources });
        }

        return NextResponse.json({ error: "Tidak ada respons dari AI" }, { status: 500 });
    } catch (error) {
        console.error("Pakar API error:", error);
        return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
    }
}
