"use client";

import { useState } from "react";
import { Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart } from "recharts";

// Tipe Data
interface ChartData {
  name: string;
  thisYear: number;
  lastYear: number;
}

interface TopProductData {
  menuName: string;
  orders: number;
}

// Props menerima semua jenis data
interface UserAnalyticsProps {
  usersData: ChartData[];
  incomeData: ChartData[];
  ordersData: ChartData[];
  topProducts: TopProductData[];
}

export default function UserAnalytics({ usersData, incomeData, ordersData, topProducts }: UserAnalyticsProps) {
  // State untuk melacak tab aktif (default: 'users')
  const [activeTab, setActiveTab] = useState<"users" | "income" | "orders">("users");

  // Pilih data berdasarkan tab aktif
  const currentData = activeTab === "users" ? usersData : activeTab === "income" ? incomeData : ordersData;

  // Helper untuk format angka Y-Axis (Rp vs Angka biasa)
  const formatYAxis = (value: number) => {
    if (activeTab === "income") {
      return `${(value / 1000000).toFixed(0)}jt`; // Format Jutaan (cth: 10jt)
    }
    return `${value / 1000}K`; // Format Ribuan (cth: 10K)
  };

  // Helper untuk format Tooltip
  const formatTooltip = (value: number) => {
    if (activeTab === "income") {
      return `Rp ${value.toLocaleString("id-ID")}`;
    }
    return value.toLocaleString("id-ID");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full">
      {/* BAGIAN KIRI: CHART */}
      <div className="lg:col-span-3 bg-[#F7F9FB] rounded-[2rem] p-8 w-full h-[450px] flex flex-col">
        {/* Header Tab Button */}
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div className="flex gap-6 text-sm">
            <button
              onClick={() => setActiveTab("users")}
              className={`pb-1 transition ${
                activeTab === "users"
                  ? "font-bold text-black border-b-2 border-black"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Total Users
            </button>
            <button
              onClick={() => setActiveTab("income")}
              className={`pb-1 transition ${
                activeTab === "income"
                  ? "font-bold text-black border-b-2 border-black"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Total Pemasukan
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`pb-1 transition ${
                activeTab === "orders"
                  ? "font-bold text-black border-b-2 border-black"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Total Orderan Berhasil
            </button>
          </div>

          {/* Legend */}
          <div className="flex gap-4 text-xs font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-black"></span>
              <span>Tahun Ini</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#93C5FD]"></span>
              <span>Tahun Lalu</span>
            </div>
          </div>
        </div>

        {/* The Chart */}
        <div className="flex-1 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={currentData}>
              <defs>
                <linearGradient id="colorThisYear" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#000000" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#000000" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                tickFormatter={formatYAxis} // Pakai formatter dinamis
                width={activeTab === "income" ? 40 : 30} // Lebarkan dikit kalau Income
              />
              <Tooltip
                // Terima value sebagai (number | undefined)
                formatter={(value: number | undefined) => {
                  // Jika value undefined, tampilkan placeholder "-"
                  if (value === undefined) return ["-", ""];
                  // Jika ada, baru diformat
                  return [formatTooltip(value), ""];
                }}
                contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
              />

              <Line
                type="monotone"
                dataKey="lastYear"
                stroke="#93C5FD"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="Tahun Lalu"
              />
              <Area
                type="monotone"
                dataKey="thisYear"
                stroke="#1F2937"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorThisYear)"
                name="Tahun Ini"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* BAGIAN KANAN: TOP MENU (Tetap sama) */}
      <div className="lg:col-span-1 bg-[#F7F9FB] rounded-[2rem] p-8 h-[450px] flex flex-col justify-center">
        <h3 className="font-bold text-black mb-6">Top Orderan Makanan</h3>
        <div className="space-y-6">
          {topProducts.map((item, index) => (
            <div key={index} className="flex items-center justify-between group cursor-pointer">
              <span className="text-sm font-medium text-gray-700 truncate max-w-[140px]" title={item.menuName}>
                {item.menuName}
              </span>
              <div className="flex gap-1">
                <div className={`h-1 rounded-full w-4 ${item.orders > 50 ? "bg-black" : "bg-gray-200"}`}></div>
                <div className={`h-1 rounded-full w-4 ${item.orders > 100 ? "bg-gray-600" : "bg-gray-200"}`}></div>
                <div className={`h-1 rounded-full w-4 ${item.orders > 200 ? "bg-gray-300" : "bg-gray-200"}`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
