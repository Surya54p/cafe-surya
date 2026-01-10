"use client";

import { usePathname } from "next/navigation";

const routeMap: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/menu": "Menu",
  "/admin/orders": "Orders",
  "/admin/settings": "Settings",
};

export default function Topbar() {
  const pathname = usePathname();

  const title =
    routeMap[pathname] ??
    routeMap[
      Object.keys(routeMap).find((key) =>
        pathname.startsWith(key)
      ) ?? ""
    ] ??
    "Admin";

  return (
    <header className="h-16 bg-white border-b border-gray-300 flex items-center justify-between px-6">
      <div className="text-sm text-gray-600">
        {title}
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm">Admin</span>
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs">
          A
        </div>
      </div>
    </header>
  );
}
