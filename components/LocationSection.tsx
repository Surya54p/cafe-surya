export default function LocationSection() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4">Lokasi & Jam Buka</h2>
        <p className="text-gray-600 mb-2">Setiap hari • 08.00 – 23.00</p>
        <p className="text-gray-600 mb-4">Jl. Contoh No. 123, Kota Kamu</p>

        <div className="mt-6 w-full ">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Jl.+Contoh+No.+123+Kota+Kamu"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
          >
            <div className="w-full h-48 md:h-96 overflow-hidden">
              <img
                src="/gambar-lorem.png"
                alt="Lokasi Cafe Surya (klik untuk buka di Google Maps)"
                className="w-full h-full object-cover"
              />
            </div>
          </a>

          <p className="text-sm text-gray-500 mt-2">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Jl.+Contoh+No.+123+Kota+Kamu"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Buka di Google Maps
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
