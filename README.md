# SegariHari - E-Commerce Marketplace

Platform e-commerce **SegariHari** untuk kebutuhan harian — dibangun dengan Next.js, NextAuth, Prisma, dan Tailwind CSS.

## 🚀 Fitur

### Halaman Publik
- **Beranda** — Hero, Search, Promo Kilat, Kategori, Tanya Pakar (Gemini AI)
- **Fitur Unggulan** — Smart List, Langganan Cerdas, Resep Cerdas (Gemini AI)
- **Dasbor Data** — Charts statistik (Recharts), KPI
- **Tentang Kami** — Misi & nilai-nilai

### Sistem Role (RBAC)
- **Pembeli (BUYER)** — Default role, akses belanja & katalog
- **Penjual (SELLER/Mitra)** — Upgrade via pendaftaran mitra
- **Pendaftaran Mitra** — Form validasi (React Hook Form + Zod), verifikasi admin
- **Middleware Protection** — `/seller/*` hanya untuk Mitra aktif

### Dashboard Pembeli (`/shop`)
- Katalog produk dengan filter & search
- Keranjang belanja
- Riwayat pesanan
- Animasi Framer Motion

### Dashboard Penjual (`/seller`)
- Overview statistik penjualan
- Manajemen produk (TanStack Table — sort, filter, pagination)
- Manajemen pesanan masuk (TanStack Table)
- Sidebar navigasi

## 🛠 Tech Stack

| Library | Fungsi |
|---------|--------|
| Next.js 16 (App Router) | Framework React |
| NextAuth v5 (Auth.js) | Autentikasi + RBAC |
| Prisma 6 + SQLite | ORM + Database |
| Tailwind CSS 4 | Styling |
| React Hook Form + Zod | Form + Validasi |
| Framer Motion | Animasi (sisi pembeli) |
| TanStack Table | Tabel data (sisi penjual) |
| Recharts | Visualisasi data |
| Gemini API | AI (Tanya Pakar + Resep Cerdas) |

## 📦 Setup

```bash
# Install dependencies
npm install

# Setup database
npx prisma generate
npx prisma db push

# Jalankan dev server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## 📁 Struktur

```
src/
├── app/
│   ├── api/           # API Routes (auth, gemini, mitra)
│   ├── data/          # Halaman Dasbor Data
│   ├── fitur/         # Halaman Fitur Unggulan
│   ├── login/         # Halaman Login
│   ├── menjadi-mitra/ # Halaman Pendaftaran Mitra
│   ├── register/      # Halaman Registrasi
│   ├── seller/        # Dashboard Penjual
│   ├── shop/          # Dashboard Pembeli
│   └── tentang/       # Halaman Tentang
├── components/        # Navbar, Footer, AuthProvider
├── lib/               # Prisma client, NextAuth config
└── types/             # Type augmentation
```

## 🔐 Environment Variables

Buat file `.env`:
```
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
GEMINI_API_KEY="your-gemini-api-key"
```

---
© 2025 SegariHari — Amaranggana Group
