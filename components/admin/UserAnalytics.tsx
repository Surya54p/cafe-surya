"use client";

import { useState } from "react";
import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from "recharts";

/* ================= TYPES ================= */
interface ChartData {
  name: string;
  thisYear: number;
  lastYear: number;
}

interface TopProductData {
  menuName: string;
  orders: number;
}

type TabKey = "users" | "income" | "orders";

interface UserAnalyticsProps {
  usersData?: ChartData[];
  incomeData?: ChartData[];
  ordersData?: ChartData[];
  topProducts?: TopProductData[];

  defaultTab?: TabKey;
  enabledTabs?: TabKey[];
}

/* ================= COMPONENT ================= */
export default function UserAnalytics({
  usersData,
  incomeData,
  ordersData,
  topProducts,
  defaultTab,
  enabledTabs,
}: UserAnalyticsProps) {
  /* ---------- TAB CONFIG ---------- */
  const allTabs: { key: TabKey; label: string }[] = [
    { key: "users", label: "Total Users" },
    { key: "income", label: "Total Pemasukan" },
    { key: "orders", label: "Total Orderan Berhasil" },
  ];

  const tabs = enabledTabs
    ? allTabs.filter((tab) => enabledTabs.includes(tab.key))
    : allTabs;

  /* ---------- SAFE INITIAL TAB ---------- */
  const initialTab: TabKey =
    defaultTab && tabs.some((t) => t.key === defaultTab)
      ? defaultTab
      : tabs[0]?.key ?? "users";

  const [activeTab, setActiveTab] = useState<TabKey>(initialTab);

  /* ---------- DATA PICKER ---------- */
  const currentData =
    activeTab === "users"
      ? usersData
      : activeTab === "income"
      ? incomeData
      : ordersData;

  /* ---------- FORMATTERS ---------- */
  const formatYAxis = (value: number) =>
    activeTab === "income"
      ? `${(value / 1_000_000).toFixed(0)}jt`
      : `${value / 1000}K`;

  const formatTooltip = (value: number) =>
    activeTab === "income"
      ? `Rp ${value.toLocaleString("id-ID")}`
      : value.toLocaleString("id-ID");

  /* ================= RENDER ================= */
  return (
    <div className=" w-full">
      {/* ================= LEFT: CHART ================= */}
      <div className=" bg-[#F7F9FB] rounded-[2rem] p-8 h-[450px] flex flex-col">
        {/* ---------- HEADER ---------- */}
        <div className="flex justify-between items-center mb-6">
          {/* Tabs */}
          <div className="flex gap-6 text-sm">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-1 transition ${
                  activeTab === tab.key
                    ? "font-bold text-black border-b-2 border-black"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="flex gap-4 text-xs font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-black" />
              <span>Tahun Ini</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#93C5FD]" />
              <span>Tahun Lalu</span>
            </div>
          </div>
        </div>

        {/* ---------- CHART ---------- */}
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={currentData}>
              <defs>
                <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#000" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#000" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={formatYAxis} />

              <Tooltip
                formatter={(v?: number) =>
                  v === undefined ? ["-", ""] : [formatTooltip(v), ""]
                }
              />

              <Line
                type="monotone"
                dataKey="lastYear"
                stroke="#93C5FD"
                strokeDasharray="5 5"
                dot={false}
              />

              <Area
                type="monotone"
                dataKey="thisYear"
                stroke="#111827"
                fill="url(#areaFill)"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
