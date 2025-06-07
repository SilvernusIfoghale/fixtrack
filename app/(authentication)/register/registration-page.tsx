"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "@/app/components/auth/auth-layout";
import InputField from "@/app/components/auth/input-filed";
import Button from "@/app/components/auth/button";
import logo from "@/public/fixtrack.png";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",

    password: "",
    email: "",
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

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Submit form data
      console.log("Form submitted:", formData);

      // Navigate to verification page
      router.push("/verify");
    }
  };

  return (
    <>
      <AuthLayout
        logo={logo}
        title="Start Managing With Ease"
        subtitle="and manage your property effortlessly"
        alternateAction={{
          question: "Already have an account?",
          actionText: "Login",
          actionLink: "/login",
        }}
      >
        <form onSubmit={handleSubmit}>
          <InputField
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            label="Name"
            error={errors.name}
          />

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

          <div className="mt-6">
            <Button type="submit">Sign Up</Button>
          </div>
        </form>
      </AuthLayout>
    </>
  );
}
