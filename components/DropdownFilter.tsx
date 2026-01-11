// components/DropdownFilter.tsx
"use client";
import React from "react";

interface DropdownFilterProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
}

export default function DropdownFilter({ value, onChange, options, className = "" }: DropdownFilterProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`px-6 py-3  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 ${className}`}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
