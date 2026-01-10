"use client";

import Link from "next/link";
import { LayoutDashboard, Coffee, Receipt } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-300 min-h-screen px-4 py-6">
      <h1 className="text-xl font-bold mb-8">
        ☕ Cafe Surya
      </h1>

      <nav className="space-y-2 text-sm">
        <MenuItem href="/admin/dashboard" icon={<LayoutDashboard size={18} />}>
          Dashboard
        </MenuItem>

        <MenuItem href="/admin/orders" icon={<Receipt size={18} />}>
          Orders
        </MenuItem>

        <MenuItem href="/admin/menu" icon={<Coffee size={18} />}>
          Menu
        </MenuItem>
      </nav>
    </aside>
  );
}

function MenuItem({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}
