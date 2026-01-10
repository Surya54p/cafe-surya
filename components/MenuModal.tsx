import React from 'react';
import { X } from 'lucide-react';

export default function MenuModal({ item, onClose }: { item: any | null; onClose: () => void }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 p-6 z-10">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded hover:bg-gray-100">
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="mb-4">
          {item.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.image} alt={item.name} className="w-full h-56 object-cover rounded" />
          ) : null}
        </div>

        <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-600 mb-4">Rp {item.price}</p>

        <div className="text-gray-700">
          {item.description}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <a href={`/order?item=${encodeURIComponent(item.name)}`} className="px-4 py-2 bg-gray-800 text-white rounded-md">Pesan</a>
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md">Tutup</button>
        </div>
      </div>
    </div>
  );
}
