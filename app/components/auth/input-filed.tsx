"use client";

import type React from "react";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

interface InputFieldProps {
  type: "text" | "email" | "password" | "tel" | "code";
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label?: string;
  error?: string;
  maxLength?: number;
}

export default function InputField({
  type,
  placeholder,
  value,
  onChange,
  name,
  label,
  error,
  maxLength,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const getIcon = () => {
    if (type === "email") return <FaEnvelope className="text-gray-400" />;
    if (type === "text" && name.toLowerCase().includes("name"))
      return <FaUser className="text-gray-400" />;
    if (type === "tel") return <FaPhone className="text-gray-400" />;
    return null;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`w-full px-3 py-2  bg-white ${
            error ? "border-red-500 border" : "border border-white"
          } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
            type === "code" ? "text-center letter-spacing-wide text-lg" : ""
          }`}
        />

        {type === "email" && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <FaEnvelope className="text-gray-400" />
          </span>
        )}

        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? (
              <FaEyeSlash className="text-gray-400" />
            ) : (
              <FaEye className="text-gray-400" />
            )}
          </button>
        )}

        {getIcon() && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {getIcon()}
          </span>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
