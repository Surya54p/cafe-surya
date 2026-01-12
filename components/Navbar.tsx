"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
export default function Navbar() {
  const pathname = usePathname() || "/";
  const [hash, setHash] = useState<string>(typeof window !== "undefined" ? window.location.hash : "");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname, hash]);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) {
      return pathname === "/" && hash === href.replace("/", "");
    }
    return pathname === href;
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const getLinkClass = (href: string, isMobile = false) => {
    const active = isActive(href);
    const base = "transition duration-200";
    const desktopStyles = active
      ? "font-bold text-gray-900 border-b-2 border-orange-500"
      : "text-gray-600 hover:text-orange-600 hover:font-medium";

    const mobileStyles = active
      ? "bg-orange-50 text-orange-600 font-bold pl-4 border-l-4 border-orange-500"
      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 pl-4 border-l-4 border-transparent";

    return `${base} ${isMobile ? `block py-3 ${mobileStyles}` : desktopStyles}`;
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/gambar-lorem.png"
              alt="Logo"
              className="rounded-full border border-gray-300"
              width={40}
              height={40}
            />
            <Link href="/" className="text-xl font-bold text-gray-800 tracking-tight">
              Cafe Surya
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={getLinkClass(link.href)}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-orange-600 transition">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-orange-600 transition">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            {/* Mobile Menu Toggle */}
            <button
              className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Popup Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 py-2">
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={getLinkClass(link.href, true)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
