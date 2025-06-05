"use client";

type FilterStatus = "All" | "Pending" | "In Progress" | "Complete";

interface RequestFilterTabsProps {
  activeFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
  requestCounts?: {
    all: number;
    pending: number;
    inProgress: number;
    complete: number;
  };
}

export default function RequestFilterTabs({
  activeFilter,
  onFilterChange,
  requestCounts,
}: RequestFilterTabsProps) {
  const filters: { key: FilterStatus; label: string; count?: number }[] = [
    { key: "All", label: "All", count: requestCounts?.all },
    { key: "Pending", label: "Pending", count: requestCounts?.pending },
    {
      key: "In Progress",
      label: "In Progress",
      count: requestCounts?.inProgress,
    },
    { key: "Complete", label: "Complete", count: requestCounts?.complete },
  ];

  const getFilterButtonStyle = (filter: FilterStatus) => {
    const isActive = activeFilter === filter;
    const baseStyle =
      "px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap";

    if (isActive) {
      switch (filter) {
        case "All":
          return `${baseStyle} bg-gray-800 text-white`;
        case "Pending":
          return `${baseStyle} bg-yellow-500 text-white`;
        case "In Progress":
          return `${baseStyle} bg-blue-500 text-white`;
        case "Complete":
          return `${baseStyle} bg-green-500 text-white`;
        default:
          return `${baseStyle} bg-gray-200 text-gray-700`;
      }
    }

    return `${baseStyle} bg-gray-100 text-gray-700 hover:bg-gray-300`;
  };

  return (
    <div className="bg-white px-4 py-3 shadow mb-2">
      <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={getFilterButtonStyle(filter.key)}
          >
            {filter.label}
            {filter.count !== undefined && (
              <span className="ml-1 text-xs opacity-75">({filter.count})</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
