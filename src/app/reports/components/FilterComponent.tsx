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
    <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-wrap gap-4 justify-between">
      {/* Bagian Input & Select */}
      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Cari No Report"
          className="border rounded-lg p-2 text-sm"
          value={filters.searchTerm}
          onChange={(e) =>
            setFilters({ ...filters, searchTerm: e.target.value })
          }
        />

        <select
          className="border rounded-lg p-2 text-sm"
          value={filters.report_type}
          onChange={(e) =>
            setFilters({ ...filters, report_type: e.target.value })
          }
        >
          <option value="">Semua Tipe Report</option>
          <option value="BK">Bangunan Kantor</option>
          <option value="BL">Bangunan Lainya</option>
          <option value="K">Komplain</option>
          <option value="M">Mesin</option>
        </select>

        <select
          className="border rounded-lg p-2 text-sm"
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
              {r.code} {r.name} {!r.status && "( Non Aktif )"}
            </option>
          ))}
        </select>

        <select
          className="border rounded-lg p-2 text-sm"
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

        <select
          className="border rounded-lg p-2 text-sm"
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
          <option value="RU">Review Update</option>
        </select>
      </div>

      {/* Bagian Filter Tanggal */}
      <div className="flex flex-wrap gap-2">
        {filters.startDate && filters.endDate && (
          <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg text-sm">
            <span>
              {formatDate(filters.startDate)} - {formatDate(filters.endDate)}
            </span>
            <button
              onClick={handleClearDateFilter}
              className="text-red-500 hover:text-red-700 font-bold"
              aria-label="Hapus filter tanggal"
            >
              &times;
            </button>
          </div>
        )}
        <button
          onClick={() => setShowDateModal(true)}
          className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-800 transition-colors"
        >
          Filter Tanggal
        </button>
      </div>
    </div>
  );
}
