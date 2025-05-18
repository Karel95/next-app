'use client';
import React from 'react';


const stats = [
  { label: 'Users', value: '1,234' },
  { label: 'Revenue', value: '$12,345' },
  { label: 'Active Sessions', value: '567' },
  { label: 'Conversion Rate', value: '4.5%' },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button className="bg-gray-800 hover:bg-gray-700 text-gray-100 px-4 py-2 rounded transition">
          Settings
        </button>
      </header>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-gray-800 rounded-lg p-6 shadow hover:shadow-lg transition"
          >
            <div className="text-sm uppercase text-gray-400">{stat.label}</div>
            <div className="mt-2 text-2xl font-semibold">{stat.value}</div>
          </div>
        ))}
      </section>
      <section className="bg-gray-800 rounded-lg p-6 shadow">
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        <div className="h-48 flex items-center justify-center text-gray-400">
          {/* Placeholder for chart or additional content */}
          Chart goes here
        </div>
      </section>
    </main>
  );
}