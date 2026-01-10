"use client";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import { Coffee, Wifi, Armchair, DollarSign } from "lucide-react";

function Carousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % images.length), 3000);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <div className="mt-8">
      <div className="relative max-w-5xl mx-auto rounded-lg overflow-hidden">
        <div className="w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {images.map((src, i) => (
              <div key={i} style={{ flex: '0 0 100%' }} className="h-48 md:h-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`slide-${i}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <button
          aria-label="previous"
          onClick={() => setIndex((index + images.length - 1) % images.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
        >
          ‹
        </button>
        <button
          aria-label="next"
          onClick={() => setIndex((index + 1) % images.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
        >
          ›
        </button>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`go-to-${i}`}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full ${i === index ? 'bg-gray-800' : 'bg-white/80'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const images = [
    '/gambar-lorem.png',
    '/gambar-lorem.png',
    '/gambar-lorem.png',
    '/gambar-lorem.png',
  ];

  return (
    <section className="px-6 py-20 text-center max-w-5xl mx-auto  rounded-lg ">
      <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-800 flex items-center justify-center gap-3">
        <Coffee className="w-12 h-12" />
        Cafe Surya
      </h1>
      <p className="text-xl md:text-2xl mb-4 text-gray-700">Tempat Ngopi Terbaik di Kota</p>
      <p className="text-lg md:text-xl mb-6 text-gray-600 max-w-3xl mx-auto">
        Nikmati kopi spesial pilihan, suasana yang nyaman, dan WiFi super cepat. Cocok untuk bekerja, nongkrong bareng
        teman, atau sekadar melepas penat.
      </p>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 flex items-center gap-2">
          <Coffee className="w-4 h-4" />
          Kopi Lokal Berkualitas
        </span>
        <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 flex items-center gap-2">
          <Wifi className="w-4 h-4" />
          WiFi Kencang
        </span>
        <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 flex items-center gap-2">
          <Armchair className="w-4 h-4" />
          Tempat Nyaman
        </span>
        <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          Harga Terjangkau
        </span>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button variant="primary" href="/menu">
          Lihat Menu Lengkap
        </Button>
        <Button variant="secondary" href="https://wa.me/6281234567890" className="sm:ml-4">
          Reservasi Meja
        </Button>
      </div>

      {/* Carousel (4 images) */}
      <Carousel images={images} />
    </section>
  );
}
