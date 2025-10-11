"use client";

import { Division } from "@/app/division/models";
import { ReportFilters } from "../utils/Filter";

interface Props {
  filters: ReportFilters;
  setFilters: (filters: ReportFilters) => void;
  division: Division[];
  formatDate: (date: Date) => string;
  handleClearDateFilter: () => void;
  setShowDateModal: (show: boolean) => void;
}

export default function ReportFiltersComponent({
  filters,
  setFilters,
  division,
  formatDate,
  handleClearDateFilter,
  setShowDateModal,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 mb-6">
      {/* ================= Header (Mobile Responsive Title) ================= */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base sm:text-lg font-semibold text-gray-700">
          Filter Laporan
        </h2>
        <button
          onClick={() => setShowDateModal(true)}
          className="bg-green-700 text-white px-3 sm:px-4 py-2 rounded-lg text-sm hover:bg-green-800 transition-colors"
        >
          Filter Tanggal
        </button>
      </div>

      {/* ================= Input & Dropdown Filters ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Cari No Report */}
        <input
          type="text"
          placeholder="No Report"
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none"
          value={filters.searchTerm}
          onChange={(e) =>
            setFilters({ ...filters, searchTerm: e.target.value })
          }
        />

        {/* Tipe Report */}
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none"
          value={filters.report_type}
          onChange={(e) =>
            setFilters({ ...filters, report_type: e.target.value })
          }
        >
          <option value="">Semua Tipe Report</option>
          <option value="BK">Bangunan Kantor</option>
          <option value="BL">Bangunan Lainnya</option>
          <option value="K">Komplain</option>
          <option value="M">Mesin</option>
        </select>

        {/* Divisi */}
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none"
          value={filters.division_key}
          onChange={(e) =>
            setFilters({ ...filters, division_key: e.target.value })
          }
        >
          <option value="">Semua Divisi</option>
          {division.map((r) => (
            <option
              key={r._id}
              value={r._id}
              disabled={!r.status}
              className={!r.status ? "text-gray-400" : ""}
            >
              {r.code} {!r.status && "(Non Aktif)"}
            </option>
          ))}
        </select>

        {/* Kategori Kerusakan */}
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none"
          value={filters.broken_type}
          onChange={(e) =>
            setFilters({ ...filters, broken_type: e.target.value })
          }
        >
          <option value="">Semua Kategori Kerusakan</option>
          <option value="R">Ringan</option>
          <option value="S">Sedang</option>
          <option value="B">Berat</option>
        </select>

        {/* Progress */}
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none"
          value={filters.progress}
          onChange={(e) =>
            setFilters({ ...filters, progress: e.target.value })
          }
        >
          <option value="">Semua Progress</option>
          <option value="A">Antrian</option>
          <option value="P">Proses</option>
          <option value="S">Selesai</option>
          <option value="T">Tolak</option>
          <option value="RU">Review Ulang</option>
        </select>
      </div>

      {/* ================= Filter Tanggal ================= */}
      <div className="mt-4 flex flex-wrap gap-2 items-center justify-between">
        {filters.startDate && filters.endDate && (
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg text-xs sm:text-sm">
            <span className="text-gray-700">
              {formatDate(filters.startDate)} - {formatDate(filters.endDate)}
            </span>
            <button
              onClick={handleClearDateFilter}
              className="text-red-500 hover:text-red-700 font-bold"
              aria-label="Hapus filter tanggal"
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
