// app/dashboard/page.tsx
import UserAnalytics from "@/components/admin/UserAnalytics";
import StatCard from "@/components/admin/StatCard";
import TrafficDevice from "@/components/admin/TrackingMenu";
import TrafficLocation from "@/components/admin/MenuFavorit";
export default function Dashboard() {
  // 1. Data Dummy: TOTAL USERS
  const usersData = [
    { name: "Jan", thisYear: 12000, lastYear: 5000 },
    { name: "Feb", thisYear: 18000, lastYear: 10000 },
    { name: "Mar", thisYear: 14000, lastYear: 22000 },
    { name: "Apr", thisYear: 34000, lastYear: 15000 },
    { name: "May", thisYear: 25000, lastYear: 18000 },
    { name: "Jun", thisYear: 40000, lastYear: 28000 },
    { name: "Jul", thisYear: 32000, lastYear: 31000 },
  ];

  // 2. Data Dummy: TOTAL PEMASUKAN (Angka dalam Jutaan/Rupiah)
  const incomeData = [
    { name: "Jan", thisYear: 50000000, lastYear: 40000000 }, // 50jt vs 40jt
    { name: "Feb", thisYear: 75000000, lastYear: 45000000 },
    { name: "Mar", thisYear: 60000000, lastYear: 55000000 },
    { name: "Apr", thisYear: 90000000, lastYear: 60000000 },
    { name: "May", thisYear: 85000000, lastYear: 70000000 },
    { name: "Jun", thisYear: 120000000, lastYear: 80000000 },
    { name: "Jul", thisYear: 110000000, lastYear: 90000000 },
    { name: "Aug", thisYear: 110000000, lastYear: 90000000 },
  ];

  // 3. Data Dummy: TOTAL ORDERAN BERHASIL (Jumlah Transaksi)
  const ordersData = [
    { name: "Jan", thisYear: 800, lastYear: 600 },
    { name: "Feb", thisYear: 950, lastYear: 700 },
    { name: "Mar", thisYear: 1200, lastYear: 900 },
    { name: "Apr", thisYear: 1100, lastYear: 850 },
    { name: "May", thisYear: 1500, lastYear: 1100 },
    { name: "Jun", thisYear: 1800, lastYear: 1300 },
    { name: "Jul", thisYear: 1650, lastYear: 1400 },
  ];

  const topMenuData = [
    { menuName: "Kopi Susu Gula Aren", orders: 250 },
    { menuName: "Nasi Goreng Spesial", orders: 180 },
    { menuName: "Matcha Latte", orders: 120 },
    { menuName: "Croissant Butter", orders: 90 },
    { menuName: "Es Teh Manis", orders: 60 },
  ];

  // 3. Data Dummy Kartu Atas
  const statsData = [
    { label: "Total orderan", value: "7,265", percentage: "+11.01%", isUp: true, type: "purple" },
    { label: "Orderan berhasil", value: "3,671", percentage: "-0.03%", isUp: false, type: "blue" },
    { label: "Keuntungan hari ini", value: "156", percentage: "+15.03%", isUp: true, type: "purple" },
    { label: "orderan hari ini", value: "2,318", percentage: "+6.08%", isUp: true, type: "blue" },
  ];

  return (
    <div className=" bg-white min-h-screen space-y-8">
      <h1 className="text-xl font-bold text-black">Dashboard Restoran</h1>

      {/* Stat Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((item, index) => (
          <StatCard
            key={index}
            label={item.label}
            value={item.value}
            percentage={item.percentage}
            isUp={item.isUp}
            type={item.type as "purple" | "blue"}
          />
        ))}
      </div>

      {/* Analytics Chart & Top Menu Section */}
      {/* Kirim semua dataset ke komponen */}
      <UserAnalytics usersData={usersData} incomeData={incomeData} ordersData={ordersData} topProducts={topMenuData} />
      {/* 3. NEW SECTION: Traffic Device & Location */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrafficDevice />
        <TrafficLocation />
      </div>
    </div>
  );
}
