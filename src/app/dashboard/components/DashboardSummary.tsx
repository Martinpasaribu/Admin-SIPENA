// components/DashboardSummary.tsx
"use client";

import { FileText, Users, Package } from "lucide-react";
import { Dashboard } from "../models";

interface DashboardSummaryProps {
  dashboard: Dashboard | null;
}

export default function DashboardSummary({ dashboard }: DashboardSummaryProps) {
  return (
    <section>
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Ringkasan</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Pengguna */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
              <Users size={20} />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Total Pengguna</h4>
              <p className="text-2xl font-bold text-gray-900 mt-1">{dashboard?.amountEmployee}</p>
            </div>
          </div>
          <div className="w-full flex justify-end items-end">
            <button
              onClick={() => (window.location.href = "/employee")}
              className="mt-4 inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-green-700 rounded-lg hover:bg-green-800 transition"
            >
              <FileText size={16} className="mr-2" /> Lihat Semua
            </button>
          </div>
        </div>

        {/* Laporan Masuk */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition ">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 text-red-600 rounded-lg">
              <FileText size={20} />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Laporan Masuk</h4>
              <p className="text-2xl font-bold text-gray-900 mt-1">{dashboard?.amountReport}</p>
            </div>
          </div>
          <div className="w-full flex justify-end items-end">
            <button
              onClick={() => (window.location.href = "/reports")}
              className="mt-4 inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-green-700 rounded-lg hover:bg-green-800 transition"
            >
              <FileText size={16} className="mr-2" /> Lihat Semua
            </button>
          </div>
        </div>

        {/* Fasilitas */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition ">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gray-100 text-gray-600 rounded-lg">
              <Package size={20} />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Fasilitas</h4>
              <p className="text-2xl font-bold text-gray-900 mt-1">{dashboard?.amountFacility}</p>
            </div>
          </div>
          <div className="w-full flex justify-end items-end">
            <button
              onClick={() => (window.location.href = "/facility")}
              className="mt-4 inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-green-700 rounded-lg hover:bg-green-800 transition"
            >
              <FileText size={16} className="mr-2" /> Lihat Semua
            </button>
          </div>
        </div>

        {/* Divisi */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition ">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gray-100 text-gray-600 rounded-lg">
              <Package size={20} />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Divisi</h4>
              <p className="text-2xl font-bold text-gray-900 mt-1">{dashboard?.amountDivision}</p>
            </div>
          </div>
          <div className="w-full flex justify-end items-end">
            <button
              onClick={() => (window.location.href = "/division")}
              className="mt-4 inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-green-700 rounded-lg hover:bg-green-800 transition"
            >
              <FileText size={16} className="mr-2" /> Lihat Semua
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}