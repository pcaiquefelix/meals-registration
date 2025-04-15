import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600">Page Not Found</h2>
        <p className="text-gray-500 pb-9">
          Sorry, the page you are looking for does not exist or you do not have
          access.
        </p>
        <Link
          href="/"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
