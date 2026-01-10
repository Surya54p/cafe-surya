// components/admin/TrackingMenu.tsx
"use client";

import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

// Data Dummy 1: Top Menu Spesifik
const menuData = [
  { name: "Kopi Susu", value: 450, color: "#93C5FD" },   // Biru Muda
  { name: "Nasgor", value: 380, color: "#6EE7B7" },      // Hijau Teal
  { name: "Dimsum", value: 300, color: "#000000" },      // Hitam
  { name: "Croissant", value: 250, color: "#60A5FA" },   // Biru
  { name: "Matcha", value: 200, color: "#C084FC" },      // Ungu
  { name: "Es Teh", value: 180, color: "#86EFAC" },      // Hijau Muda
];

// Data Dummy 2: Jenis Kelamin Pembeli
const genderData = [
  { name: "Pria", value: 1200, color: "#1F2937" },       // Abu Gelap
  { name: "Wanita", value: 1800, color: "#EC4899" },     // Pink
];

// Data Dummy 3: Makanan vs Minuman
const typeData = [
  { name: "Makanan", value: 1500, color: "#F59E0B" },    // Oranye
  { name: "Minuman", value: 2100, color: "#3B82F6" },    // Biru
];

export default function TrackingMenu() {
  const [activeTab, setActiveTab] = useState<'menu' | 'gender' | 'type'>('menu');

  // Pilih data berdasarkan tab
  const currentData = 
    activeTab === 'menu' ? menuData :
    activeTab === 'gender' ? genderData :
    typeData;

  return (
    <div className="bg-[#F7F9FB] rounded-[2rem] p-8 h-[400px] flex flex-col w-full">
      {/* HEADER DENGAN TAB */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h3 className="font-bold text-black text-lg hidden sm:block">Tracking Menu</h3>
        
        <div className="flex gap-4 text-sm">
          <button 
            onClick={() => setActiveTab('menu')}
            className={`pb-1 transition ${activeTab === 'menu' ? 'font-bold text-black border-b-2 border-black' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Menu
          </button>
          <button 
            onClick={() => setActiveTab('gender')}
            className={`pb-1 transition ${activeTab === 'gender' ? 'font-bold text-black border-b-2 border-black' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Jenis Kelamin
          </button>
          <button 
            onClick={() => setActiveTab('type')}
            className={`pb-1 transition ${activeTab === 'type' ? 'font-bold text-black border-b-2 border-black' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Tipe
          </button>
        </div>
      </div>
      
      {/* CHART AREA */}
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={currentData} barSize={activeTab === 'menu' ? 40 : 80}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9CA3AF', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9CA3AF', fontSize: 12 }} 
            />
            <Tooltip 
              cursor={{fill: 'transparent'}}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <Bar dataKey="value" radius={[10, 10, 10, 10]}>
              {currentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}