import Feature from "./Feature";
import { Coffee, Wifi, Plug, Armchair, Lock, Music } from 'lucide-react';

export default function FeaturesSection() {
  return (
    <section className="px-6 py-16">
      <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-800 flex items-center justify-center gap-3">
        Kenyaman ekstra di Surya Coffee
      </h2>
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 text-center">
        <Feature title="Kopi Berkualitas" icon={<Coffee size={30} />} description="Kopi yang dijual di Surya Coffee adalah kopi yang berkualitas dan dijamin kualitasnya." />
        <Feature title="WiFi Stabil" icon={<Wifi size={30} />} description="Kami menyediakan WiFi yang stabil dan cepat untuk memudahkan Anda." />
        <Feature title="Banyak Colokan" icon={<Plug size={30} />} description="Kami menyediakan banyak colokan untuk memudahkan Anda." />
        <Feature title="Nyaman & Santai" icon={<Armchair size={30} />} description="Kami menyediakan ruang yang nyaman dan santai untuk memudahkan Anda." />
        <Feature title="Ruang Privasi" icon={<Lock size={30} />} description="Kami menyediakan ruang yang nyaman dan santai untuk memudahkan Anda." />
        <Feature title="Live music" icon={<Music size={30} />} description="Kami menyediakan ruang yang nyaman dan santai untuk memudahkan Anda." />
      </div>
    </section>
  );
}
