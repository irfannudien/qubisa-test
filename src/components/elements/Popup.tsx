"use client";

import React, { ReactNode, useEffect } from "react";
import { Cancel } from "@mui/icons-material";

interface PopupProps {
  title?: string;
  onClose: () => void;
  children: ReactNode;
  isOpen: boolean;
  customHeader?: ReactNode;
}

export default function Popup({
  title,
  onClose,
  children,
  isOpen,
  customHeader,
}: PopupProps) {
  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
    }
    return () => document.documentElement.classList.remove("overflow-hidden");
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="w-full h-[78px] flex items-center justify-between px-10 py-4 border-b border-gray-300 bg-white sticky top-0 z-10 gap-5">
        {customHeader ? (
          <div className="flex-1">{customHeader}</div>
        ) : (
          <h2 className="text-2xl font-semibold">{title}</h2>
        )}
        <button onClick={onClose}>
          <Cancel sx={{ fontSize: 38, cursor: "pointer", color: "#BF1E2E" }} />
        </button>
      </div>

      <div className="w-full p-6 flex justify-center">{children}</div>
    </div>
  );
}
