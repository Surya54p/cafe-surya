import type { ReactNode } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";
import "@/app/globals.css";
import { Raleway } from "next/font/google";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${raleway.variable} antialiased h-screen flex bg-white overflow-hidden`}>
      <Sidebar />
      <div className="flex-1 flex flex-col h-full">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}