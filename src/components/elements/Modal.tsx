"use client";

import { Close } from "@mui/icons-material";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed w-screen inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[70%] relative">
        <button
          className="absolute top-2 right-5 text-gray-500 z-30"
          onClick={onClose}
        >
          <Close />
        </button>
        {children}
      </div>
    </div>
  );
}
