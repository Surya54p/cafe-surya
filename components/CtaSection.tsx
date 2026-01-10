import { Coffee } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="px-16 py-20 bg-gray-800 rounded-2xl text-white text-center grid grid-cols-1 md:grid-cols-2 md:text-left gap-8 items-center">
      <div className="flex justify-center   flex-col items-center ">
        <Coffee className="w-30 h-30 mb-4" />
      </div>
      <div className="flex flex-col items-center md:items-start">
        <h2 className="text-3xl font-semibold mb-4">Nongkrong enak gak perlu mikir panjang</h2>
        <p className="mb-6">Datang ke Cafe Surya hari ini</p>
        <a
          href="/menu"
          className="inline-block px-8 py-3 bg-white text-gray-800 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Pesan Menu
        </a>
      </div>
    </section>
  );
}
