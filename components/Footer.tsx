import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-200 bg-transparent">
      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Cafe Surya</h3>
          <p className="text-sm text-gray-600">Jl. Contoh No. 123, Kota Kamu</p>
          <p className="text-sm text-gray-500 mt-4">© {new Date().getFullYear()} Cafe Surya. All rights reserved.</p>
        </div>

        <div className="flex justify-end">
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Navigasi</h4>
              <ul className="space-y-1">
                <li><Link href="/" className="hover:text-gray-800">Home</Link></li>
                <li><Link href="/menu" className="hover:text-gray-800">Menu</Link></li>
                <li><Link href="/#about" className="hover:text-gray-800">About</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Kontak</h4>
              <ul className="space-y-1">
                <li>Email: hello@cafesurya.example</li>
                <li>Tel: (021) 1234-5678</li>
                <li><a href="https://wa.me/6281234567890" className="hover:text-gray-800">WhatsApp</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
