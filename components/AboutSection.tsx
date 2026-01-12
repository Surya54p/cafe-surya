"use client";

import React, { useState } from 'react';
import Modal from "@/components/Modal";

export default function AboutSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="px-6 py-16">
      <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-center md:text-left">Tentang Cafe Surya</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="order-1 md:order-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/gambar-lorem.png" alt="Cafe Surya interior" className="w-full rounded-lg shadow" />
        </div>

        <div className="order-2 md:order-2 text-left">
          <p className="text-gray-600 mb-4">
            Cafe Surya adalah kafe lokal yang menghadirkan kopi berkualitas dengan suasana nyaman untuk bekerja, belajar,
            maupun nongkrong bersama teman.
          </p>

          <div className="flex items-center gap-4">
            <button onClick={() => setOpen(true)} className="px-5 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition">
              Selengkapnya
            </button>
            <a href="/menu" className="px-5 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition">
              Lihat Menu
            </a>
          </div>
        </div>
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)} title="Tentang Cafe Surya">
        <div className="space-y-4">
          <p className="text-gray-700">
            Cafe Surya berdiri dengan misi menghadirkan kopi berkualitas dari petani lokal. Kami menyajikan berbagai
            varian kopi, pilihan camilan, dan suasana yang ramah untuk bekerja atau bersantai. Barista kami terlatih untuk
            memastikan konsistensi rasa di setiap cangkir.
          </p>
          <p className="text-gray-700">
            Selain itu, kami berkomitmen pada praktik berkelanjutan: menggunakan biji kopi dari sumber yang adil dan
            mengurangi limbah kemasan. Datang dan rasakan pengalaman ngopi yang hangat dan personal di Cafe Surya.
          </p>
        </div>
      </Modal>
    </section>
  );
}
