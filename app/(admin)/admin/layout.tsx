import type { ReactNode } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";
import "@/app/globals.css";
import { Raleway } from "next/font/google";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} antialiased`}>
        {/* UBAH 1: Gunakan h-screen (tinggi layar penuh) dan overflow-hidden 
          agar body tidak bisa di-scroll 
        */}
        <div className="h-screen flex bg-white overflow-hidden">
          
          {/* SIDEBAR (Akan diam di kiri karena parentnya fixed height) */}
          <Sidebar />

          {/* MAIN AREA WRAPPER */}
          <div className="flex-1 flex flex-col h-full">
            
            {/* TOPBAR (Akan diam di atas karena dia elemen flex pertama yang tidak discroll) */}
            <Topbar />

            {/* UBAH 2: Tambahkan overflow-y-auto pada main.
              Ini membuat HANYA area ini yang bisa di-scroll secara vertikal.
            */}
            <main className="flex-1 overflow-y-auto  p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}