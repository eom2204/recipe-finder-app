import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div
      className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-sm flex items-center gap-2"
      role="alert"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p>{message}</p>
    </div>
  );
}
