"use client";

import React, { useState } from 'react';

function AboutModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 p-6 z-10">
        <button onClick={onClose} className="absolute top-3 right-3 p-2 rounded hover:bg-gray-100">×</button>
        <h3 className="text-xl font-semibold mb-2">Tentang Cafe Surya</h3>
        <p className="text-gray-700 mb-4">
          Cafe Surya berdiri dengan misi menghadirkan kopi berkualitas dari petani lokal. Kami menyajikan berbagai
          varian kopi, pilihan camilan, dan suasana yang ramah untuk bekerja atau bersantai. Barista kami terlatih untuk
          memastikan konsistensi rasa di setiap cangkir.
        </p>
        <p className="text-gray-700">
          Selain itu, kami berkomitmen pada praktik berkelanjutan: menggunakan biji kopi dari sumber yang adil dan
          mengurangi limbah kemasan. Datang dan rasakan pengalaman ngopi yang hangat dan personal di Cafe Surya.
        </p>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="px-6 py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="order-1 md:order-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/gambar-lorem.png" alt="Cafe Surya interior" className="w-full rounded-lg shadow" />
        </div>

        <div className="order-2 md:order-2 text-left">
          <h2 className="text-2xl font-semibold mb-4">Tentang Cafe Surya</h2>
          <p className="text-gray-600 mb-4">
            Cafe Surya adalah kafe lokal yang menghadirkan kopi berkualitas dengan suasana nyaman untuk bekerja, belajar,
            maupun nongkrong bersama teman.
          </p>

          <div className="flex items-center gap-4">
            <button onClick={() => setOpen(true)} className="px-5 py-2 bg-gray-800 text-white rounded-md">
              Selengkapnya
            </button>
            <a href="/menu" className="px-5 py-2 border border-gray-300 rounded-md">
              Lihat Menu
            </a>
          </div>
        </div>
      </div>

      <AboutModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
