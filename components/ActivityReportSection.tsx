"use client";


export default function ActivityReportSection() {
  return (
    <section className="space-y-6">
      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ReportCard
          title="Total Customers"
          value="128"
          subtitle="customers"
        />
        <ReportCard
          title="Successful Payments"
          value="94"
          subtitle="transactions"
          color="green"
        />
        <ReportCard
          title="Total Revenue"
          value="$2,450"
          subtitle="today"
          color="blue"
        />
        <ReportCard
          title="Failed Payments"
          value="7"
          subtitle="transactions"
          color="red"
        />
      </div>
    </section>
  );
}

function ReportCard({
  title,
  value,
  subtitle,
  color = "gray",
}: {
  title: string;
  value: string;
  subtitle: string;
  color?: "gray" | "green" | "blue" | "red";
}) {
  const colorMap = {
    gray: "text-gray-800",
    green: "text-green-600",
    blue: "text-blue-600",
    red: "text-red-600",
  };

  return (
    <div className="border rounded-xl p-4 bg-white space-y-2">
      <p className="text-sm text-gray-500">{title}</p>
      <p className={`text-2xl font-bold ${colorMap[color]}`}>
        {value}
      </p>
      <p className="text-xs text-gray-400">{subtitle}</p>
    </div>
  );
}
