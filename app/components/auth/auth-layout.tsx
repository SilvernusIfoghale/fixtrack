import type React from "react";
import Link from "next/link";
import { FaApple, FaFacebook } from "react-icons/fa";

import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface AuthLayoutProps {
  children: React.ReactNode;
  logo?: StaticImport | string;
  title: string;
  subtitle?: string;
  showSocialLogin?: boolean;
  alternateAction?: {
    question: string;
    actionText: string;
    actionLink: string;
  };
}

export default function AuthLayout({
  children,
  logo,
  title,
  subtitle,
  showSocialLogin = true,
  alternateAction,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col relative overflow-hidden">
      {/* Logo */}
      <div className="mx-auto h-52">
        {logo && <Image src={logo} alt="ellipse" />}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-6  max-w-md mx-auto w-full relative z-20">
        <div className="mb-6 mt-8 mx-auto text-center">
          <h1 className="text-xl font-bold text-blue-400">{title}</h1>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>

        <div className="flex-1">{children}</div>

        {showSocialLogin && (
          <div className="mt-6 mb-4">
            <div className="relative flex items-center justify-center">
              <div className="border-t border-gray-300 flex-grow" />
              <span className="mx-4 text-sm text-gray-500">OR</span>
              <div className="border-t border-gray-300 flex-grow" />
            </div>

            <div className="flex justify-center space-x-4 mt-4">
              <button className="p-2 rounded-full border border-gray-300">
                <FaApple className="w-6 h-6" />
              </button>
              <button className="p-2 rounded-full border border-gray-300">
                {/* <FaGoogle className="w-6 h-6" /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#ffc107"
                    d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
                  />
                  <path
                    fill="#ff3d00"
                    d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"
                  />
                  <path
                    fill="#4caf50"
                    d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.9 11.9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
                  />
                  <path
                    fill="#1976d2"
                    d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
                  />
                </svg>
              </button>
              <button className="p-2 rounded-full border border-gray-300">
                <FaFacebook className="w-6 h-6 text-blue-600" />
              </button>
            </div>
          </div>
        )}

        {alternateAction && (
          <div className="text-center mt-4 mb-6">
            <p className="text-sm text-gray-600">
              {alternateAction.question}{" "}
              <Link
                href={alternateAction.actionLink}
                className="text-[#216CA6]  font-medium underline"
              >
                {alternateAction.actionText}
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
