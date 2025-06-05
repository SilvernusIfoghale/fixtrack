"use client";

import type React from "react";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import InputField from "@/app/components/auth/input-filed";
import Button from "@/app/components/auth/button";

const fieldLabels: Record<string, string> = {
  fullName: "Full Name",
  email: "Email Address",
  phone: "Phone Number",
  address: "Address",
  password: "Password",
  notifications: "Notifications",
  language: "Language",
  timezone: "Timezone",
};

const fieldTypes: Record<string, "text" | "email" | "tel" | "password"> = {
  fullName: "text",
  email: "email",
  phone: "tel",
  address: "text",
  password: "password",
  notifications: "text",
  language: "text",
  timezone: "text",
};

export default function EditFieldPage() {
  const router = useRouter();
  const params = useParams();
  const fieldId = params.field as string;

  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fieldLabel = fieldLabels[fieldId] || "Field";
  const fieldType = fieldTypes[fieldId] || "text";

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(`Saving ${fieldId}:`, value);
      router.back();
    } catch (error) {
      console.error("Error saving field:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b flex items-center">
        <button onClick={handleBack} className="mr-3">
          <FaArrowLeft className="text-gray-600" />
        </button>
        <h1 className="text-lg font-bold">Edit {fieldLabel}</h1>
      </div>

      {/* Content */}
      <div className="p-4">
        <form onSubmit={handleSave} className="space-y-6">
          <InputField
            type={fieldType}
            name={fieldId}
            placeholder={`Enter your ${fieldLabel.toLowerCase()}`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            label={fieldLabel}
          />

          <div className="flex space-x-3">
            <Button
              type="button"
              variant="secondary"
              onClick={handleBack}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !value.trim()}
              className="flex-1"
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
