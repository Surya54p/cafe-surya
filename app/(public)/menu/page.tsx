"use client";

import React, { useEffect, useMemo, useState } from 'react';
import MenuCard from '@/components/MenuCard';
import MenuModal from '@/components/MenuModal';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

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
  }, {
    id: 9,
    name: 'Kue Cokelat',
    price: 15000,
    description: 'Kue cokelat moist dengan tekstur lembut dan lapisan ganache di atasnya.',
    image: '/gambar-lorem.png',
    type: 'Makanan',
  }, {
    id: 10,
    name: 'Kue Cokelat',
    price: 15000,
    description: 'Kue cokelat moist dengan tekstur lembut dan lapisan ganache di atasnya.',
    image: '/gambar-lorem.png',
    type: 'Makanan',
  }, {
    id: 11,
    name: 'Desert',
    price: 15000,
    description: 'Kue cokelat moist dengan tekstur lembut dan lapisan ganache di atasnya.',
    image: '/gambar-lorem.png',
    type: 'Desert',
  },
];

export default function MenuPage() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const { addToCart, totalItems } = useCart();

  // debounce 2 seconds
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim()), 1000);
    return () => clearTimeout(t);
  }, [query]);

  const types = useMemo(() => ['All', ...Array.from(new Set(SAMPLE_MENU.map((menu) => menu.type)))], []);

  const filtered = useMemo(() => {
    return SAMPLE_MENU.filter((m) => {
      const matchesType = typeFilter === 'All' || m.type === typeFilter;
      const matchesQuery = debouncedQuery === '' || [m.name, m.description, m.type].join(' ').toLowerCase().includes(debouncedQuery.toLowerCase());
      return matchesType && matchesQuery;
    });
  }, [debouncedQuery, typeFilter]);

  function handleOrder(item: any) {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    alert(`${item.name} berhasil ditambahkan ke keranjang!`);
  }

  return (
    <div className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold">Menu Kami</h1>
            <Link
              href="/cart"
              className="relative p-2 text-gray-600 hover:text-orange-600 transition border border-gray-200 rounded-md"
              title="Ke Keranjang"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari menu... "
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
