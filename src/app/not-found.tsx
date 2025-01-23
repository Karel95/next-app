import React from 'react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <h1 className="text-9xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-8">Page not found</p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
      >
        Go back home
      </Link>
    </section>
  );
};

export default NotFound;
