"use client";

import React from 'react';

export default function MenuCard({
  item,
  name,
  price,
  description,
  image,
  type,
  onViewDetails,
  onOrder,
}: {
  item?: {
    id: string | number;
    name: string;
    price: number | string;
    description: string;
    image?: string;
    type?: string;
  };
  name?: string;
  price?: number | string;
  description?: string;
  image?: string;
  type?: string;
  onViewDetails?: (item: any) => void;
  onOrder?: (item: any) => void;
}) {
  // support legacy usage: <MenuCard name="..." price="..." />
  const itemResolved = item ?? (name ? { id: name, name, price: price ?? '', description: description ?? '', image, type } : undefined);

  if (!itemResolved) {
    return (
      <div className="p-4 bg-white rounded-xl shadow-sm border">
        <div className="h-40 bg-gray-100 rounded mb-4 flex items-center justify-center">
          <div className="text-sm text-gray-400">Memuat...</div>
        </div>
        <div className="h-4 bg-gray-100 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gray-100 rounded w-1/2 mb-4" />
        <div className="h-8 bg-gray-100 rounded" />
      </div>
    );
  }

  const handleView = (it: any) => {
    if (onViewDetails) return onViewDetails(it);
    if (typeof window !== 'undefined' && window.alert) return window.alert(it.name);
  };

  const handleOrder = (it: any) => {
    if (onOrder) return onOrder(it);
    if (typeof window !== 'undefined') {
      const text = `Saya ingin pesan: ${it.name} - Rp ${it.price}`;
      const url = `https://wa.me/6281234567890?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-300">
      <div className="h-40 bg-gray-100 rounded mb-4 flex items-center justify-center overflow-hidden">
        {itemResolved.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={itemResolved.image} alt={itemResolved.name} className="w-full h-full object-cover" />
        ) : (
          <div className="text-sm text-gray-500">Foto Menu</div>
        )}
      </div>

      <h3 className="font-semibold text-gray-800">{itemResolved.name}</h3>
      <p className="text-sm text-gray-600 mb-2">Rp {itemResolved.price}</p>

      <p className="text-sm text-gray-600 mb-4 line-clamp-3" style={{ WebkitLineClamp: 3, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {itemResolved.description}
      </p>

      <div className="flex gap-2">
        <button
          onClick={() => handleOrder(itemResolved)}
          className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-md text-sm hover:opacity-95 transition"
        >
          Pesan
        </button>
        <button
          onClick={() => handleView(itemResolved)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition"
        >
          Lihat Detail
        </button>
      </div>
    </div>
  );
}
