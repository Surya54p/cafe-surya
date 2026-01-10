import Feature from "./Feature";
import { Coffee, Wifi, Plug, Armchair } from 'lucide-react';

export default function FeaturesSection() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-6 text-center">
        <Feature title="Kopi Berkualitas" icon={<Coffee className="w-8 h-8 mx-auto mb-2" />} />
        <Feature title="WiFi Stabil" icon={<Wifi className="w-8 h-8 mx-auto mb-2" />} />
        <Feature title="Banyak Colokan" icon={<Plug className="w-8 h-8 mx-auto mb-2" />} />
        <Feature title="Nyaman & Santai" icon={<Armchair className="w-8 h-8 mx-auto mb-2" />} />
      </div>
    </section>
  );
}
