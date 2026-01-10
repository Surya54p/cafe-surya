"use client";

import React, { useEffect, useMemo, useState } from 'react';
import MenuCard from '@/components/MenuCard';
import MenuModal from '@/components/MenuModal';

const SAMPLE_MENU = [
  {
    id: 1,
    name: 'Kopi Susu Surya',
    price: 18000,
    description: 'Perpaduan robusta lokal dan susu segar, tekstur creamy dan rasa seimbang. Cocok dinikmati hangat atau dingin.',
    image: '/gambar-lorem.png',
    type: 'Minuman',
  },
  {
    id: 2,
    name: 'Espresso',
    price: 15000,
    description: 'Shot espresso pekat dengan crema tebal. Biji pilihan, diseduh dengan sempurna untuk rasa yang kaya dan mantap.',
    image: '/gambar-lorem.png',
    type: 'Minuman',
  },
  {
    id: 3,
    name: 'Latte',
    price: 22000,
    description: 'Nikmati latte lembut dengan foam halus, pilihan sirup tersedia untuk kustomisasi.',
    image: '/gambar-lorem.png',
    type: 'Minuman',
  },
  {
    id: 4,
    name: 'Pisang Goreng',
    price: 12000,
    description: 'Pisang goreng renyah dengan taburan gula, camilan klasik yang pas ditemani kopi.',
    image: '/gambar-lorem.png',
    type: 'Makanan',
  },
  {
    id: 5,
    name: 'Cappuccino',
    price: 20000,
    description: 'Klasik cappuccino dengan foam kental dan rasa seimbang antara kopi dan susu.',
    image: '/gambar-lorem.png',
    type: 'Minuman',
  },
  {
    id: 6,
    name: 'Sandwich Tuna',
    price: 25000,
    description: 'Sandwich isi tuna segar, sayur, dan saus spesial. Pilihan pas untuk sarapan atau makan siang ringan.',
    image: '/gambar-lorem.png',
    type: 'Makanan',
  },
  {
    id: 7,
    name: 'Mocha',
    price: 23000,
    description: 'Perpaduan cokelat dan espresso, manis dan hangat, favorit pecinta cokelat.',
    image: '/gambar-lorem.png',
    type: 'Minuman',
  },
  {
    id: 8,
    name: 'Kue Cokelat',
    price: 15000,
    description: 'Kue cokelat moist dengan tekstur lembut dan lapisan ganache di atasnya.',
    image: '/gambar-lorem.png',
    type: 'Makanan',
  },
];

export default function MenuPage() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  // debounce 2 seconds
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim()), 2000);
    return () => clearTimeout(t);
  }, [query]);

  const types = useMemo(() => ['All', ...Array.from(new Set(SAMPLE_MENU.map((m) => m.type)))], []);

  const filtered = useMemo(() => {
    return SAMPLE_MENU.filter((m) => {
      const matchesType = typeFilter === 'All' || m.type === typeFilter;
      const matchesQuery = debouncedQuery === '' || [m.name, m.description, m.type].join(' ').toLowerCase().includes(debouncedQuery.toLowerCase());
      return matchesType && matchesQuery;
    });
  }, [debouncedQuery, typeFilter]);

  function handleOrder(item: any) {
    const text = `Saya ingin pesan: ${item.name} - Rp ${item.price}`;
    const url = `https://wa.me/6281234567890?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }

  return (
    <div className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-semibold">Menu Kami</h1>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari menu... (2s debounce)"
              className="flex-1 md:w-72 px-4 py-2 border border-gray-300 rounded-md bg-white"
            />

            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md bg-white">
              {types.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <MenuCard key={item.id} item={item} onViewDetails={(it) => setSelectedItem(it)} onOrder={handleOrder} />
          ))}
        </div>

        <MenuModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      </div>
    </div>
  );
}
