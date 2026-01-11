// components/SearchInput.tsx
"use client";
import React from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchInput({ value, onChange, placeholder = "Cari...", className = "" }: SearchInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`px-6 py-3  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 ${className}`}
    />
  );
}
