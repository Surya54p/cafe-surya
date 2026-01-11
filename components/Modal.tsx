// components/Modal.tsx
"use client";
import React from "react";
import { X } from "lucide-react";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-300/75">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <div className="flex flex-row justify-between mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <X size={30} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
