import MenuCard from "./MenuCard";

export default function MenuHighlightSection() {
  return (
    <section className="px-6 py-16 bg-white">
      <div className=" w-full">
        <h2 className="text-4xl font-semibold text-center mb-8">Menu Favorit</h2>

        <div className="grid md:grid-cols-4 gap-6  w-full">
          <MenuCard name="Kopi Susu Surya" price="18.000" />
          <MenuCard name="Espresso" price="15.000" />
          <MenuCard name="Latte" price="22.000" />
          <MenuCard name="Pisang Goreng" price="12.000" />
        </div>

        <div className="text-center mt-8">
          <a
            href="/menu"
            className="inline-block px-6 py-3 bg-gray-800 text-white rounded-lg hover:opacity-90 transition"
          >
            Pesan Sekarang
          </a>
        </div>
      </div>
    </section>
  );
}
