import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-gray-300 mt-12">
            <div className="container mx-auto px-8 py-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h4 className="font-bold text-white text-lg mb-3">SegariHari</h4>
                        <p className="text-sm">Kesegaran harian, langsung ke rumah Anda.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-lg mb-3">Jelajahi</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/shop" className="hover:text-white transition">Belanja</Link></li>
                            <li><Link href="/fitur" className="hover:text-white transition">Fitur</Link></li>
                            <li><Link href="/data" className="hover:text-white transition">Data</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-lg mb-3">Dukungan</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="hover:text-white transition">Pusat Bantuan</Link></li>
                            <li><Link href="#" className="hover:text-white transition">Hubungi Kami</Link></li>
                            <li><Link href="#" className="hover:text-white transition">Kebijakan Privasi</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-lg mb-3">Ikuti Kami</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-white transition">FB</a>
                            <a href="#" className="hover:text-white transition">IG</a>
                            <a href="#" className="hover:text-white transition">TW</a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
                    &copy; 2025 SegariHari. Dibuat sebagai konsep oleh Amaranggana Group.
                </div>
            </div>
        </footer>
    );
}
