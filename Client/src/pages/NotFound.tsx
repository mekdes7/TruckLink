import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100 px-6 py-12">
      {/* Logo */}
      <div className="mb-8">
        <img
          src="/TruckLink_Logo.jpg"
          alt="TruckLink Logo"
          className="h-20 w-auto object-contain select-none"
          draggable={false}
        />
      </div>

      {/* Content */}
      <div className="text-center bg-white p-10 rounded-3xl shadow-lg max-w-md w-full">
        <h1 className="text-6xl font-extrabold mb-4 text-gray-900">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found.</p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-gradient-to-tr from-indigo-600 via-indigo-700 to-indigo-800 text-white rounded-xl font-semibold shadow-md hover:brightness-110 transition"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
