"use client";

import UserAnalytics from "./admin/UserAnalytics";
interface ChartData {
  name: string;
  thisYear: number;
  lastYear: number;
}

interface TopProductData {
  menuName: string;
  orders: number;
}

interface MoneyReportSectionProps {
  incomeData: ChartData[];
  totalIncome: number;
  topProducts: TopProductData[];
}

export default function MoneyReportSection({
  incomeData,
  totalIncome,
}: MoneyReportSectionProps) {
  return (
    <section className="space-y-6 border-b border-gray-300 pb-8">
      <UserAnalytics
        usersData={[]} // aman, tapi tidak dipakai
        ordersData={[]} // aman, tapi tidak dipakai
        incomeData={incomeData}
        topProducts={[]} // atau hapus section kanan nanti
        defaultTab="income"
        enabledTabs={["income"]}
      />

      {/* TOTAL */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Total Income Today</span>
        <span className="text-2xl font-bold text-green-600">
          Rp {totalIncome.toLocaleString("id-ID")}
        </span>
      </div>
    </section>
  );
}
