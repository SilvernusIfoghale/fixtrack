"use client";

import type React from "react";

import { FaChevronRight } from "react-icons/fa";

interface ProfileFieldProps {
  label: string;
  value: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export default function ProfileField({
  label,
  value,
  onClick,
  icon,
}: ProfileFieldProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between p-4 bg-white border-b border-gray-100 ${
        onClick ? "cursor-pointer hover:bg-gray-50" : ""
      } transition-colors`}
    >
      <div className="flex items-center flex-1">
        {icon && <div className="mr-3 text-gray-400">{icon}</div>}
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{label}</p>
          <p className="text-sm text-gray-500 mt-1">{value}</p>
        </div>
      </div>
      {onClick && <FaChevronRight className="text-gray-400 text-sm" />}
    </div>
  );
}
