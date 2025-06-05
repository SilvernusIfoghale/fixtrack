"use client";

interface MaintenanceRequest {
  id: string;
  title: string;
  location: string;
  submittedDate: string;
  status: "Complete" | "Pending" | "In Progress";
}

interface RequestListItemProps {
  request: MaintenanceRequest;
  onClick?: (request: MaintenanceRequest) => void;
}

export default function RequestListItem({
  request,
  onClick,
}: RequestListItemProps) {
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
    <div
      className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onClick?.(request)}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{request.title}</h3>
          <p className="text-sm text-gray-600 mb-1">{request.location}</p>
          <p className="text-xs text-gray-500">
            Submitted: {request.submittedDate}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
            request.status
          )}`}
        >
          {request.status}
        </span>
      </div>
    </div>
  );
}
