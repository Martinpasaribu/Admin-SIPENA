/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
// src/app/reports/components/ReportTable.tsx
import React from "react";
import { IRepair, Report } from "../models"; // Import IRepair dan Report
import { Progress, StatusBroken, TypeBroken } from "../constant"; // Import constant helpers
import { Image, Pencil, PencilLine, Trash2, Wrench } from "lucide-react"; // Import icons
import { FormatDate } from "../utils/Date"; // Import FormatDate
import RepairModal from "./RepairModal"; // Import RepairModal
import { useState } from "react";

interface ReportTableProps {
  reports: Report[];
  onEdit: (report: Report) => void;
  onDelete: (id: string) => void;
}

const ReportTable: React.FC<ReportTableProps> = ({

  reports,
  onEdit,
  onDelete,
}) => {


  const [repair, setRepair] = useState<IRepair>();
  const [showDescModal, setShowDescModal] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const HandleRepairModal = (data: any) => {
    setRepair(data);
    setShowDescModal(true);
  };

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              No Laporan
            </th>
            <th scope="col" className="px-6 py-3">
              Pelapor
            </th>
            <th scope="col" className="px-6 py-3">
              Divisi
            </th>
            <th scope="col" className="px-6 py-3">
              Tipe Report
            </th>
            <th scope="col" className="px-6 py-3">
              Kerusakan
            </th>
            <th scope="col" className="px-6 py-3">
              Progress
            </th>
            <th scope="col" className="px-6 py-3">
              Laporan Masuk
            </th>
            <th scope="col" className="px-6 py-3">
              Lama Pengerjaan
            </th>
            <th scope="col" className="px-6 py-3">
              Perbaikan
            </th>
            <th scope="col" className="px-6 py-3">
              Gambar
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr
              key={report._id}
              className="bg-white border-b hover:bg-gray-50 group"
            >
              {/* ID */}
              <td className="px-6 py-4 font-semibold text-gray-900">
                {report.report_code}
              </td>

              {/* Pelapor */}
              <td className="px-6 py-4 text-gray-800">
                {report.employee_key?.username || "-"}
              </td>

              {/* Divisi */}
              <td className="px-6 py-4 text-gray-700">
                {report.division_key?.code || '-'}
              </td>

              {/* Tipe Report */}
              <td className="px-6 py-4">
                {TypeBroken(report.report_type).label}
              </td>

              {/* Kerusakan */}
              <td className="px-6 py-4">
                <span className="inline-block py-1 px-2 rounded-md bg-gray-100 text-gray-700 text-xs font-semibold">
                  {StatusBroken(report.broken_type).label}
                </span>
              </td>

              {/* Progress */}
              <td className="px-6 py-4">
                <span
                  className={`inline-block py-1 px-2 rounded-md text-xs font-semibold ${
                    Progress(report.progress).className
                  }`}
                >
                  {Progress(report.progress).label}
                </span>
              </td>

              {/* Laporan Masuk (createdAt) */}
              <td className="px-6 py-4">
                {FormatDate(report.createdAt, "/")}
              </td>

              {/* Lama Pengerjaan */}
              <td className="px-6 py-4">{report.duration?.text || "-"}</td>

              {/* Perbaikan (Wrench Icon) */}
              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => HandleRepairModal(report.repair)}
                  className="text-gray-500 hover:text-blue-500 transition"
                  aria-label="Lihat Detail Perbaikan"
                >
                  <Wrench size={18} />
                </button>
              </td>

              <td className="px-6 py-4">

                  {report.image ? (
                    <p
                      onClick={() => setPreviewImage(report.image)} // ✅ trigger preview image
                      className="flex justify-center mt-1 text-sm font-semibold text-gray-900 cursor-pointer"
                    >
                      <Image size={20} className="text-gray-500 hover:text-gray-700 transition" />
                    </p>
                  ) : (
                    <span className="text-xs text-gray-400 italic">Tidak ada</span>
                  )}

              </td>

              {/* Aksi */}
              <td
                className="text-center align-middle opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => onEdit(report)}
                    aria-label="Edit Report"
                    className="p-2 text-gray-400 rounded-lg border shadow transition-colors duration-200 ease-in-out"
                    title="Edit"
                  >
                    <PencilLine size={16} />
                  </button>
                  <button
                    onClick={() => report._id && onDelete(report._id)}
                    className="p-2 bg-gray-400 rounded-lg shadow hover:bg-gray-500 text-white transition-colors duration-200 ease-in-out"
                    title="Hapus"
                    aria-label="Hapus Report"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      <RepairModal
        show={showDescModal}
        repair={repair}
        onClose={() => setShowDescModal(false)}
      />


      {/* 🔹 Preview Image Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            alt="Preview"
            className="max-w-[90%] max-h-[90%] rounded-lg shadow-2xl transition-transform duration-300 scale-100 hover:scale-105"
          />
          <button
            onClick={() => setPreviewImage(null)}
            className="absolute top-6 right-6 text-white bg-black/50 hover:bg-black/70 p-2 px-3 rounded-full transition"
          >
            ✕
          </button>
        </div>
      )}


    </div>
  );
};

export default ReportTable;