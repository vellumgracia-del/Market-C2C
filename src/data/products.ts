export const allProducts = [
    { id: "1", name: "Brokoli Organik", unit: "500 gr / ikat", price: 14000, originalPrice: 20000, discount: "Diskon 30%", category: "Sayuran", image: "/images/brokoli.png" },
    { id: "2", name: "Daging Sapi Has Dalam", unit: "250 gr / pack", price: 48000, originalPrice: 60000, discount: "Diskon 20%", category: "Daging & Unggas", image: "/images/daging-sapi.png" },
    { id: "3", name: "Telur Ayam Omega-3", unit: "10 butir / pack", price: 30000, originalPrice: null, discount: "Beli 1 Gratis 1", category: "Susu & Telur", image: "/images/telur-ayam.png" },
    { id: "4", name: "Jeruk Sunkist Navel", unit: "1 kg", price: 24000, originalPrice: 40000, discount: "Diskon 40%", category: "Buah-buahan", image: "/images/jeruk-sunkist.png" },
    { id: "5", name: "Bayam Segar", unit: "250 gr / ikat", price: 5000, originalPrice: null, discount: null, category: "Sayuran", image: "/images/bayam.png" },
    { id: "6", name: "Ayam Kampung", unit: "1 ekor", price: 85000, originalPrice: 95000, discount: "Diskon 10%", category: "Daging & Unggas", image: "/images/ayam-kampung.png" },
    { id: "7", name: "Susu Segar", unit: "1 liter", price: 18000, originalPrice: null, discount: null, category: "Susu & Telur", image: "/images/susu-segar.png" },
    { id: "8", name: "Ikan Salmon", unit: "200 gr / fillet", price: 65000, originalPrice: 75000, discount: "Diskon 13%", category: "Ikan & Seafood", image: "/images/ikan-salmon.png" },
    { id: "9", name: "Wortel Import", unit: "500 gr", price: 12000, originalPrice: null, discount: null, category: "Sayuran", image: "/images/wortel.png" },
    { id: "10", name: "Roti Tawar", unit: "1 bungkus", price: 15000, originalPrice: null, discount: null, category: "Kebutuhan Dapur", image: "/images/roti-tawar.png" },
    { id: "11", name: "Udang Segar", unit: "500 gr", price: 55000, originalPrice: 65000, discount: "Diskon 15%", category: "Ikan & Seafood", image: "/images/udang.png" },
    { id: "12", name: "Apel Fuji", unit: "1 kg", price: 35000, originalPrice: 42000, discount: "Diskon 17%", category: "Buah-buahan", image: "/images/apel-fuji.png" },
];

export function formatRupiah(num: number) {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
}
