"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthLayout from "@/app/components/auth/auth-layout";
import Button from "@/app/components/auth/button";
import InputField from "@/app/components/auth/input-filed";

import logo from "@/public/fixtrack.png";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Submit form data
      console.log("Login form submitted:", formData);

      // Navigate to dashboard or home page after successful login
      router.push("/home");
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      logo={logo}
      subtitle="Log In To Continue"
      alternateAction={{
        question: "Don't have an account?",
        actionText: "Sign Up",
        actionLink: "/register",
      }}
    >
      <form onSubmit={handleSubmit}>
        <InputField
          type="email"
          name="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={handleChange}
          label="Email"
          error={errors.email}
        />

        <InputField
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          label="Password"
          error={errors.password}
        />

        <div className="flex justify-end mb-4">
          <Link href="/forgot-password" className="text-sm text-blue-600">
            Forgot Password
          </Link>
        </div>

        <div className="mt-2">
          <Button type="submit">Login</Button>
        </div>
      </form>
    </AuthLayout>
  );
}
