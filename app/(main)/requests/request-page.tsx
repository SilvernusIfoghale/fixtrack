"use client";

import RequestFilterTabs from "@/app/components/requests/request-filter-tabs";
import RequestListItem from "@/app/components/requests/request-list-item";
import { useState, useMemo } from "react";

interface MaintenanceRequest {
  id: string;
  title: string;
  location: string;
  submittedDate: string;
  status: "Complete" | "Pending" | "In Progress";
}

type FilterStatus = "All" | "Pending" | "In Progress" | "Complete";

export default function RequestsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("All");

  // Mock data - in real app, this would come from an API
  const allRequests: MaintenanceRequest[] = [
    {
      id: "1",
      title: "Leaky Faucet",
      location: "Kitchen sink",
      submittedDate: "May 5, 2025",
      status: "Complete",
    },
    {
      id: "2",
      title: "Leaky Faucet",
      location: "Kitchen sink",
      submittedDate: "May 5, 2025",
      status: "Pending",
    },
    {
      id: "3",
      title: "Leaky Faucet",
      location: "Kitchen sink",
      submittedDate: "May 5, 2025",
      status: "In Progress",
    },
    {
      id: "4",
      title: "Leaky Faucet",
      location: "Kitchen sink",
      submittedDate: "May 5, 2025",
      status: "In Progress",
    },
    {
      id: "5",
      title: "Leaky Faucet",
      location: "Kitchen sink",
      submittedDate: "May 5, 2025",
      status: "Complete",
    },
    {
      id: "6",
      title: "Leaky Faucet",
      location: "Kitchen sink",
      submittedDate: "May 5, 2025",
      status: "Pending",
    },
  ];

  const { filteredRequests, requestCounts } = useMemo(() => {
    const counts = {
      all: allRequests.length,
      pending: allRequests.filter((r) => r.status === "Pending").length,
      inProgress: allRequests.filter((r) => r.status === "In Progress").length,
      complete: allRequests.filter((r) => r.status === "Complete").length,
    };

    const filtered =
      activeFilter === "All"
        ? allRequests
        : allRequests.filter((request) => request.status === activeFilter);

    return { filteredRequests: filtered, requestCounts: counts };
  }, [allRequests, activeFilter]);

  const handleRequestClick = (request: MaintenanceRequest) => {
    console.log("Request clicked:", request);
    // Navigate to request details page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-5 mb-3 shadow">
        <h1 className="text-lg font-bold">Maintenance Request</h1>
      </div>

      {/* Filter Tabs */}
      <RequestFilterTabs
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        requestCounts={requestCounts}
      />

      {/* Request List */}
      <div className="p-4 pb-20">
        {filteredRequests.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No {activeFilter.toLowerCase()} requests found
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredRequests.map((request) => (
              <RequestListItem
                key={request.id}
                request={request}
                onClick={handleRequestClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
