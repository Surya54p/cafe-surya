// components/admin/MenuFavorit.tsx
"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Kopi Susu Aren", value: 45, color: "#1F2937" }, // Hitam (Best Seller)
  { name: "Nasi Goreng", value: 30, color: "#93C5FD" },    // Biru
  { name: "Matcha Latte", value: 15, color: "#86EFAC" },   // Hijau
  { name: "Lainnya", value: 10, color: "#E5E7EB" },        // Abu muda
];

export default function MenuFavorit() {
  return (
    <div className="bg-[#F7F9FB] rounded-[2rem] p-8 h-[400px] flex flex-col w-full">
      <h3 className="font-bold text-black text-lg mb-6">Menu Sering Diorder (%)</h3>

      <div className="flex flex-col sm:flex-row items-center h-full gap-8">
        {/* CHART SECTION */}
        <div className="flex-1 w-full h-[200px] sm:h-full relative">
           <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* CUSTOM LEGEND SECTION */}
        <div className="flex-1 w-full space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-3">
                <span 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></span>
                <span className="text-gray-700 font-medium truncate max-w-[100px]" title={item.name}>
                    {item.name}
                </span>
              </div>
              <span className="font-bold text-gray-900">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}