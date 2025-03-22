import React from "react";

interface AuthButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: React.ReactNode;
}

export default function AuthButton({
  isLoading = false,
  children,
  className,
  ...rest
}: AuthButtonProps) {
  return (
    <button
      className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
        isLoading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${className}`}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? "처리 중..." : children}
    </button>
  );
}
