"use client";

import { useRouter } from "next/navigation";
import {
  FaCheckCircle,
  FaHashtag,
  FaFileAlt,
  FaExclamationTriangle,
  FaCalendarAlt,
} from "react-icons/fa";

export default function RequestSubmittedPage() {
  const router = useRouter();

  // Mock data - in real app, this would come from the submission
  const requestData = {
    confirmationCode: "REQ-2024-001",
    issueType: "Plumbing",
    urgencyLevel: "High",
    dateSubmitted: "July 10, 2024",
  };

  const handleBackToHomepage = () => {
    router.push("/home");
  };

  const handleViewDetails = () => {
    console.log("View request details");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-3 shadow">
        <h1 className="text-lg font-bold text-center text-[#216CA6]">
          Request Submitted
        </h1>
      </div>

      {/* Content */}
      <div className="p-4 mb-16">
        <div className="bg-white rounded-lg p-6 text-center shadow-sm">
          {/* Success Icon */}
          <div className="mb-4">
            <FaCheckCircle className="mx-auto text-green-500 text-4xl" />
          </div>

          {/* Success Message */}
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Your request has been submitted!
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            We&apso;ve received your request and will assign a technician
            shortly, you will receive updates as your request progresses
          </p>

          {/* Request Details */}
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-3 bg-gray-100 p-2 rounded-lg">
              <FaHashtag className="text-gray-400 bg-gray-300 p-1.5 text-2xl rounded" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Confirmation Code
                </p>
                <p className="text-sm text-gray-600">
                  {requestData.confirmationCode}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-gray-100 p-2 rounded-lg">
              <FaFileAlt className="text-gray-400 bg-gray-300 p-1.5 text-2xl rounded" />
              <div>
                <p className="text-sm font-medium text-gray-900">Issue Type</p>
                <p className="text-sm text-gray-600">{requestData.issueType}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-gray-100 p-2 rounded-lg">
              <FaExclamationTriangle className="text-red-400 bg-red-200 p-1.5 text-2xl rounded" />
              <div>
                <p className="text-sm font-medium text-gray-900">Urgency</p>
                <p className="text-sm text-red-500">
                  {requestData.urgencyLevel}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-gray-100 p-2 rounded-lg">
              <FaCalendarAlt className="text-gray-400 bg-gray-300 p-1.5 text-2xl rounded" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Date Submitted
                </p>
                <p className="text-sm text-gray-600">
                  {requestData.dateSubmitted}
                </p>
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="mt-6 space-y-3">
            <button
              onClick={handleViewDetails}
              className="text-blue-900 text-sm font-medium bg-blue-200 w-full rounded-lg py-2 hover:cursor-pointer hover:bg-blue-400"
            >
              View request details
            </button>
            <br />
            <button
              onClick={handleBackToHomepage}
              className="text-blue-900 text-sm font-medium bg-blue-300 w-full rounded-lg py-2 hover:cursor-pointer hover:bg-blue-400"
            >
              Back to homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
