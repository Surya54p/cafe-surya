"use client";

import { useState } from 'react';
import LocationSection from '@/components/LocationSection';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = `Pesan dari ${name || 'Pengunjung'}`;
    const body = `Nama: ${name}%0AEmail: ${email}%0A%0A${encodeURIComponent(message)}`;
    window.location.href = `mailto:info@cafesurya.example?subject=${encodeURIComponent(subject)}&body=${body}`;
  }

  return (
    <main className="px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">Hubungi Kami</h1>

        <form onSubmit={handleSubmit} className="grid gap-4 mb-8">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama" className="px-4 py-2 border border-gray-300 rounded-md" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" className="px-4 py-2 border border-gray-300 rounded-md" />
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Pesan" rows={6} className="px-4 py-2 border border-gray-300 rounded-md" />
          <div className="flex gap-3">
            <button type="submit" className="px-4 py-2 bg-gray-800 text-white rounded-md">Kirim</button>
            <button type="button" onClick={() => { setName(''); setEmail(''); setMessage(''); }} className="px-4 py-2 border rounded-md">Reset</button>
          </div>
        </form>

        <LocationSection />
      </div>
    </main>
  );
}
