// components/DashboardPriorityList.tsx
"use client";

import { Clock, AlertCircle } from "lucide-react";
import { ReportPriority } from "../models";
import { useRouter } from "next/navigation"; // Import useRouter

// Fungsi untuk menghitung selisih hari dari tanggal sekarang
const calculateDaysAgo = (dateValue: string | Date | undefined): string => {
  const date = dateValue ? new Date(dateValue) : undefined;

  if (!date || isNaN(date.getTime())) {
    return "Tanggal tidak tersedia";
  }

  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return "hari ini";
  } else if (diffInDays === 1) {
    return "1 hari lalu";
  } else {
    return `${diffInDays} hari lalu`;
  }
};

// Konstanta definisi jenis laporan
const REPORT_TYPES: Record<string, string> = {
  BK: "Bangunan Kantor",
  M: "Mesin",
  BL: "Bangunan Lainnya",
  K: "Komplain",
};

interface ReportPriorityProps {
  report?: ReportPriority[] | null;
}

export default function DashboardPriorityList({ report }: ReportPriorityProps) {
  const router = useRouter();

  // Fungsi helper untuk navigasi menggunakan query
const handleViewDetail = (report_code: string) => {
  // Construct the URL string with a template literal
  router.push(`/reports?report_code=${report_code}`);
};

  if (!report || report.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center justify-center">
        <p className="text-gray-500">Tidak ada data List Priority</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
        <AlertCircle size={20} className="text-red-500" /> Laporan Terlambat
      </h3>
      <div className="max-h-64 overflow-y-auto pr-2">
        <ul className="space-y-4">
          {report.map((reportItem) => (
            <li
              key={reportItem.report_code}
              className="flex items-start gap-4 p-3 bg-red-50 rounded-lg border border-red-200"
            >
              <div className="p-2 bg-red-100 text-red-600 rounded-full">
                <AlertCircle size={18} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">
                  {reportItem.report_type
                    ? REPORT_TYPES[reportItem.report_type]
                    : "Jenis tidak dikenal"}
                </p>
                <p className="font-medium text-gray-800">
                  {reportItem.report_code}
                </p>
                <div className="flex items-center gap-2 text-sm text-red-600 mt-1">
                  <Clock size={16} />
                  <span>Menunggu: {calculateDaysAgo(reportItem.createdAt)}</span>
                </div>
              </div>
              <button
                onClick={() => handleViewDetail(reportItem.report_code)}
                className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition self-center"
              >
                Lihat
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}