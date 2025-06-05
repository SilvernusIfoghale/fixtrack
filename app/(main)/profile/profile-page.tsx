"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLock,
  FaBell,
  FaGlobe,
  FaClock,
  FaCamera,
  FaEdit,
} from "react-icons/fa";
import ProfileField from "@/app/components/profile/profile-field";

interface UserProfile {
  name: string;
  role: string;
  profileImage: string;
  email: string;
  phone: string;
  address: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user] = useState<UserProfile>({
    name: "Andrew Simon",
    role: "Tenant",
    profileImage: "/andrew.png",
    email: "andrew.simon@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Apt 4B, New York, NY 10001",
  });

  const handleEditField = (fieldName: string) => {
    router.push(`/profile/edit/${fieldName}`);
  };

  const handleEditPhoto = () => {
    console.log("Edit profile photo");
    // Implement photo upload functionality
  };

  // const handleSignOut = () => {
  //   console.log("Sign out");

  // };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 mb-3 shadow">
        <h1 className="text-lg font-bold text-center">Profile</h1>
      </div>

      {/* Profile Section */}
      <div className="bg-white px-4 py-6 text-center shadow">
        <div className="relative w-24 h-24 mx-auto mb-4">
          <Image
            src={user.profileImage || "/placeholder.svg"}
            alt={`${user.name} profile picture`}
            fill
            className="rounded-full object-cover"
          />
          <button
            onClick={handleEditPhoto}
            className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
          >
            <FaCamera className="text-xs" />
          </button>
        </div>
        <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
        <p className="text-sm text-gray-500 mt-1">{user.role}</p>
      </div>

      {/* Personal Information */}
      <div className="mt-6">
        <div className="px-4 py-3 bg-gray-50 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">
            Personal Information
          </h3>
          <button className="text-blue-600 text-sm">
            <FaEdit className="inline mr-1" />
            Edit All
          </button>
        </div>
        <div className="bg-white">
          <ProfileField
            label="Full Name"
            value={user.name}
            icon={<FaUser />}
            onClick={() => handleEditField("fullName")}
          />
          <ProfileField
            label="Email Address"
            value={user.email}
            icon={<FaEnvelope />}
            onClick={() => handleEditField("email")}
          />
          <ProfileField
            label="Phone Number"
            value={user.phone}
            icon={<FaPhone />}
            onClick={() => handleEditField("phone")}
          />
          <ProfileField
            label="Address"
            value={user.address}
            icon={<FaMapMarkerAlt />}
            onClick={() => handleEditField("address")}
          />
        </div>
      </div>

      {/* Account Settings */}
      <div className="mt-6">
        <div className="px-4 py-3 bg-gray-50">
          <h3 className="text-sm font-semibold text-gray-900">
            Account Settings
          </h3>
        </div>
        <div className="bg-white">
          <ProfileField
            label="Password"
            value="••••••••"
            icon={<FaLock />}
            onClick={() => handleEditField("password")}
          />
          <ProfileField
            label="Notifications"
            value="Push, Email, SMS"
            icon={<FaBell />}
            onClick={() => handleEditField("notifications")}
          />
          <ProfileField
            label="Language"
            value="English (US)"
            icon={<FaGlobe />}
            onClick={() => handleEditField("language")}
          />
          <ProfileField
            label="Timezone"
            value="Eastern Time (EST)"
            icon={<FaClock />}
            onClick={() => handleEditField("timezone")}
          />
        </div>
      </div>

      {/* Actions */}
      {/* <div className="mt-6 px-4 pb-20 space-y-3">
        <button className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Download My Data
        </button>
        <button className="w-full py-3 px-4 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors">
          Help & Support
        </button>
        <button
          onClick={handleSignOut}
          className="w-full py-3 px-4 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
        >
          Sign Out
        </button>
      </div> */}
    </div>
  );
}
