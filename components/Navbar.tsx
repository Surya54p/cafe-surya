"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname() || "/";
  const [hash, setHash] = useState<string>(typeof window !== "undefined" ? window.location.hash : "");

  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) {
      // anchor links on the homepage
      return pathname === "/" && hash === href.replace("/", "");
    }
    return pathname === href;
  };

  const linkClass = (href: string) =>
    `transition ${isActive(href) ? "font-bold text-gray-900" : "text-gray-600 hover:text-gray-800"}`;

  return (
    <nav className="bg-white shadow-sm p-6">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-800">
          Cafe Surya
        </Link>
        <div className="flex gap-6">
          <Link href="/" className={linkClass("/")}>Home</Link>
          <Link href="/menu" className={linkClass("/menu")}>Menu</Link>
          <Link href="/about" className={linkClass("/about")}>About</Link>
          <Link href="/contact" className={linkClass("/contact")}>Contact</Link>
        </div>
      </div>
    </nav>
  );
}
