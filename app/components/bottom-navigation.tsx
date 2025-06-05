"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  IoHome,
  IoDocumentText,
  IoAdd,
  IoPerson,
  IoPhonePortrait,
} from "react-icons/io5";

export default function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
    {
      icon: IoHome,
      label: "Home",
      href: "/home",
      active: pathname === "/home",
    },
    {
      icon: IoDocumentText,
      label: "Request",
      href: "/requests",
      active: pathname.startsWith("/request"),
    },
    {
      icon: IoAdd,
      label: "New",
      href: "/new-property",
      active: pathname === "/new-property",
    },
    {
      icon: IoPerson,
      label: "Profile",
      href: "/profile",
      active: pathname === "/profile",
    },
    {
      icon: IoPhonePortrait,
      label: "Mobile",
      href: "/mobile",
      active: pathname === "/mobile",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center p-2 hover:text-blue-600 ${
                item.active ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <Icon className="text-xl mb-1" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
