/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { IRepair, Report } from "../models";
import { Progress, StatusBroken, TypeBroken } from "../constant";
import { Trash2, Pencil, Wrench, Image, Settings } from "lucide-react";
import { FormatDate } from "../utils/Date";
import RepairModal from "./RepairModal";
import { useState } from "react";

interface Props {
  report: Report;
  onEdit: (report: Report) => void;
  onDelete: (reportId: string) => void;
}

export default function ReportCard({ report, onEdit, onDelete }: Props) {
  const [repair, setRepair] = useState<IRepair>();
  const [showDescModal, setShowDescModal] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const HandleRepairModal = (data: any) => {
    setRepair(data);
    setShowDescModal(true);
  };

  return (
    <div className="relative group bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
      {/* 🔹 Tombol edit & delete */}
      <div
        className="
          absolute top-3 right-3 flex gap-2
          opacity-100 xl:opacity-0 xl:group-hover:opacity-100
          transition duration-300 ease-in-out
        "
      >
        <button
          onClick={() => onEdit(report)}
          className="p-1.5 sm:p-2 text-gray-500 rounded-lg border shadow hover:text-gray-700 hover:bg-gray-100 transition"
        >
          <Pencil size={25} className="h-3 w-3 md:h-5 md:w-5"/>
        </button>
        <button
          onClick={() => report._id && onDelete(report._id)}
          className="p-1.5 sm:p-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 shadow transition"
        >
          <Trash2 size={25} className="h-3 w-3 md:h-5 md:w-5"/>
        </button>
      </div>

      {/* 🔹 Info utama */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-2">
        {[
          ["No Laporan", report.report_code],
          ["Tipe Report", TypeBroken(report.report_type).label],
          ["Pelapor", report.employee_key?.username || "-"],
          ["Fasilitas", report.facility_key?.name || "-"],
          ["Divisi", report.division_key?.code || "-"],
          ["Tipe Kerusakan", StatusBroken(report.broken_type).label],
          ["Status", Progress(report.progress).label],
          ["Laporan Masuk", FormatDate(report.createdAt, "/")],
          ["Lama Pengerjaan", report.duration?.text || "-"],
        ].map(([label, value], idx) => (
          <div key={idx} className="flex flex-col gap-1">
            <p className="text-[11px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
              {label}
            </p>
            <p
              className={`text-sm sm:text-base font-semibold  ${
                label === "Status"
                  ? Progress(report.progress).className
                  : "text-gray-900"
              }`}
            >
              {value}
            </p>
          </div>
        ))}

        {/* Perbaikan */}
        <div className="flex flex-col gap-1 items-start">
          <p className="text-[11px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
            Perbaikan
          </p>
          <button
            onClick={() => HandleRepairModal(report.repair)}
            className="mt-1 text-gray-600 hover:text-gray-800 transition"
          >
            <Wrench size={22} />
          </button>
        </div>

        {/* Gambar */}
        <div className="flex flex-col gap-1 items-start">
          <p className="text-[11px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
            Gambar
          </p>
          {report.image ? (
            <button
              onClick={() => setPreviewImage(report.image)}
              className="mt-1 text-gray-600 hover:text-gray-800 transition"
            >
              <Image size={22} />
            </button>
          ) : (
            <span className="text-xs text-gray-400 italic">Tidak ada</span>
          )}
        </div>

        {/* Aksi mobile */}
        <div className="flex flex-col gap-1 items-start xl:hidden">
          <p className="text-[11px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
            Aksi
          </p>
          <button
            onClick={() => HandleRepairModal(report.repair)}
            className="mt-1 text-gray-600 hover:text-gray-800 transition"
          >
            <Settings size={22} />
          </button>
        </div>
      </div>

      {/* 🔹 Pesan Customer */}
      <div className="mt-3 sm:mt-4">
        <p className="text-gray-500 text-xs sm:text-sm mb-1">Pesan Customer</p>
        <p className="text-gray-700 text-sm sm:text-base bg-gray-50 p-3 sm:p-4 rounded-lg">
          {report.broken_des
            ? report.broken_des
            : report.complain_des || "Belum ada balasan"}
        </p>
      </div>

      {/* 🔹 Balasan Admin */}
      <div className="mt-3 sm:mt-4">
        <p className="text-gray-500 text-xs sm:text-sm mb-1">Balasan Admin</p>
        <p className="text-gray-700 text-sm sm:text-base bg-gray-50 p-3 sm:p-4 rounded-lg">
          {report.admin_note || "Belum ada balasan"}
        </p>
      </div>

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

      {/* 🔹 Modal Perbaikan */}
      <RepairModal
        show={showDescModal}
        repair={repair}
        onClose={() => setShowDescModal(false)}
      />
    </div>
  );
}
