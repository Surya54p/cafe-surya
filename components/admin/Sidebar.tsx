"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Coffee,
  Book,
  Notebook,
  User,
  Receipt,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-300 min-h-screen px-4 py-6">
      <h1 className="text-xl font-bold mb-8">☕ Cafe Surya</h1>

      <nav className="space-y-6 text-sm">

        {/* ===== MAIN SECTION ===== */}
        <Section title="Main">
          <MenuItem href="/admin/dashboard" icon={<LayoutDashboard size={18} />}>
            Dashboard
          </MenuItem>

          <MenuItem href="/admin/orders" icon={<Receipt size={18} />}>
            Orders
          </MenuItem>

          <MenuItem href="/admin/menu" icon={<Coffee size={18} />}>
            Menu
          </MenuItem>
        </Section>

        {/* ===== MANAGEMENT SECTION ===== */}
        <Section title="Management">
          <MenuItem href="/admin/content-management" icon={<Book size={18} />}>
            Content Management
          </MenuItem>

          <MenuItem href="/admin/employee" icon={<User size={18} />}>
            Employee
          </MenuItem>
        </Section>

        {/* ===== REPORTS SECTION ===== */}
        <Section title="Reports">
          <MenuItem href="/admin/activity-report" icon={<Notebook size={18} />}>
            Activity Report
          </MenuItem>
        </Section>

      </nav>
    </aside>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2">
        {title}
      </p>
      <div className="space-y-1">{children}</div>
    </div>
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
