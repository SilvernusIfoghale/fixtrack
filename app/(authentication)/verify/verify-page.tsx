"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthLayout from "@/app/components/auth/auth-layout";
import Button from "@/app/components/auth/button";

export default function VerifyPage() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 4);
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Clear error when user types
    if (error) setError("");

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Move to previous input on backspace if current input is empty
    if (e?.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e?.preventDefault();
    const pastedData = e?.clipboardData.getData("text/plain").trim();

    // Check if pasted content is a 4-digit number
    if (/^\d{4}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setCode(digits);

      // Focus the last input
      inputRefs.current[3]?.focus();
    }
  };

  const validateCode = () => {
    if (code.some((digit) => !digit)) {
      setError("Please enter the complete verification code");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateCode()) {
      const verificationCode = code.join("");
      console.log("Verification code submitted:", verificationCode);

      // Navigate to success page or dashboard
      router.push("/home");
    }
  };

  const handleResendCode = () => {
    console.log("Resending verification code");
    // Implement resend code logic here
  };

  return (
    <AuthLayout
      title="Enter Verification Code"
      subtitle="We've sent a verification code to your email address. Please enter the code below to verify your account."
      showSocialLogin={false}
    >
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex justify-center space-x-3 w-full mb-6">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              maxLength={1}
              value={code[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="w-14 h-14 text-center text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <Button type="submit" className="mb-4">
          Verify
        </Button>

        <div className="flex flex-col items-center mt-4 space-y-2">
          <button
            type="button"
            onClick={handleResendCode}
            className="text-blue-600 text-sm"
          >
            Resend Code
          </button>

          <Link href="/register" className="text-blue-600 text-sm">
            Entered the wrong email?
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
