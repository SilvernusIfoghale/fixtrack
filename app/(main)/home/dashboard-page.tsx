"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaBell } from "react-icons/fa";

import Button from "@/app/components/auth/button";

interface MaintenanceRequest {
  id: string;
  title: string;
  technician?: string;
  completedDate?: string;
  status: "Complete" | "Pending" | "In Progress";
}

export default function DashboardPage() {
  const router = useRouter();
  const [activeRequests] = useState(2);
  const [requests] = useState<MaintenanceRequest[]>([
    {
      id: "1",
      title: "Leaky Faucet in The Kitchen",
      status: "Complete",
    },
    {
      id: "2",
      title: "Technician: John Michael",
      completedDate: "May 5, 2022",
      status: "Pending",
    },
  ]);

  const handleSubmitNewRequest = () => {
    router.push("/new");
  };

  const handleViewDetails = (requestId: string) => {
    console.log("View details for request:", requestId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Complete":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex justify-between items-center border-b">
        <div>
          <h1 className="text-lg font-bold">FixTrack</h1>
          <p className="text-sm text-gray-600">Welcome, Alex</p>
        </div>
        <FaBell className="text-gray-600 text-xl" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Announcement Card */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="relative h-40">
            <Image
              src="/announcement.png"
              alt="Pool maintenance announcement"
              fill
              className="object-cover"
            />
            <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs">
              📢 Announcement
            </div>
            <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
              July 10, 2024
            </div>

            <div className="p-3">
              <p className="text-xs text-white absolute bottom-0 pb-3">
                The pool will be closed for scheduled maintenance. There have
                been kindly bear with us as the pool will be open back on July
                15th.
              </p>
            </div>
          </div>
        </div>

        {/* Maintenance Overview */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="font-semibold mb-2">Maintenance Overview</h2>
          <p className="text-sm text-gray-600 mb-4">
            You have {activeRequests} active maintenance requests
          </p>
          <Button onClick={handleSubmitNewRequest} className="w-full">
            + Submit New Request
          </Button>
        </div>

        {/* My Requests */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">My Request</h2>
            <button className="text-blue-600 text-sm">View all</button>
          </div>

          <div className="space-y-3 ">
            {requests.map((request) => (
              <div
                key={request.id}
                className="border border-gray-200 rounded-lg p-3"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{request.title}</h3>
                    {request.completedDate && (
                      <p className="text-xs text-gray-500">
                        Completed: {request.completedDate}
                      </p>
                    )}
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      request.status
                    )}`}
                  >
                    {request.status}
                  </span>
                </div>
                <button
                  onClick={() => handleViewDetails(request.id)}
                  className="text-blue-600 text-sm font-medium border py-1 px-2 rounded-xl border-[#1980E5]"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
