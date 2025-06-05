"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUpload } from "react-icons/fa";
import Button from "@/app/components/auth/button";

export default function NewRequestPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    issueType: "",
    urgencyLevel: "",
    issueDetails: "",
    files: [] as File[],
  });

  const issueTypes = [
    "Plumbing",
    "Electrical",
    "HVAC",
    "Appliance Repair",
    "Carpentry",
    "Painting",
    "Cleaning",
    "Other",
  ];

  const urgencyLevels = ["Low", "Medium", "High", "Emergency"];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev) => ({ ...prev, files: [...prev.files, ...files] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    router.push("/submitted");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-5 shadow">
        <h1 className="text-lg font-bold">New Maintenance Request</h1>
      </div>

      {/* Content */}
      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-6 mb-16">
          {/* Issue Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Issue type
            </label>
            <select
              name="issueType"
              value={formData.issueType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            >
              <option value="">Select Issue type</option>
              {issueTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Urgency Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Urgency level
            </label>
            <select
              name="urgencyLevel"
              value={formData.urgencyLevel}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            >
              <option value="">Select urgency level</option>
              {urgencyLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          {/* Issue Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Issue details
            </label>
            <textarea
              name="issueDetails"
              value={formData.issueDetails}
              onChange={handleInputChange}
              placeholder="Please provide details about the issue"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          {/* Upload Photo/Videos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload photo/videos
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <FaUpload className="mx-auto text-gray-400 text-2xl mb-2" />
                <p className="text-sm text-gray-600">
                  Click to upload or drag and drop
                  <br />
                  files. PNG, JPG, or GIF (MAX: 10MB)
                </p>
              </label>
            </div>
            {formData.files.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">
                  {formData.files.length} file(s) selected
                </p>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Submit Request
          </Button>
        </form>
      </div>
    </div>
  );
}
