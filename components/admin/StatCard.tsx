import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  percentage: string;
  isUp: boolean;
  type: 'purple' | 'blue';
}

export default function StatCard({ label, value, percentage, isUp, type }: StatCardProps) {
  // Logika warna berdasarkan type
  const bgColor = type === 'purple' ? 'bg-[#F3F0FF]' : 'bg-[#EBF5FF]';

  return (
    <div className={`${bgColor} p-6 rounded-[2rem] flex flex-col gap-4 min-h-[180px]`}>
      <p className="text-gray-800 text-lg font-medium">{label}</p>
      
      <div className="mt-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{value}</h2>
        <div className="flex items-center gap-1">
          <span className="text-sm font-semibold text-gray-700">{percentage}</span>
          {isUp ? (
            <ArrowUpRight className="w-5 h-5 text-gray-700" />
          ) : (
            <ArrowDownRight className="w-5 h-5 text-gray-700" />
          )}
        </div>
      </div>
    </div>
  );
}