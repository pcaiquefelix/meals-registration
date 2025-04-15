"use client";

import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

const Error = ({ error, reset }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <AlertTriangle className="mx-auto h-16 w-16 text-red-500" />
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Oops! Something went wrong
        </h1>

        <div className="mb-8">
          <p className="text-gray-600 mb-4">
            Sorry, we encountered an issue while processing your request.
          </p>
          {process.env.NODE_ENV === "development" && (
            <div className="text-left bg-gray-100 p-4 rounded-lg mb-4">
              <p className="text-sm font-mono text-gray-700">
                {error.message || "An unexpected error occurred"} 
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <RefreshCcw className="mr-2 h-5 w-5" />
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </Link>
        </div>

        {error.digest && (
          <p className="mt-4 text-sm text-gray-500">
            Error Code: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
};

export default Error;