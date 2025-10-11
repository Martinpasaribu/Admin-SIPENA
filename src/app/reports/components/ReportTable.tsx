/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { IRepair, Report, Review } from "../models";
import { Progress, StatusBroken, TypeBroken } from "../constant";
import { CheckCircle, Clock, Image, Info, PencilLine, Star, Trash2, Wrench, XCircle } from "lucide-react";
import { FormatDate } from "../utils/Date";
import RepairModal from "./RepairModal";
import ReviewDetailModal from "./ReviewDetailModal";

interface ReportTableProps {
  reports: Report[];
  onEdit: (report: Report) => void;
  onDelete: (id: string) => void;
}



const ReportTable: React.FC<ReportTableProps> = ({ reports, onEdit, onDelete }) => {
  const [repair, setRepair] = useState<IRepair>();
  const [showDescModal, setShowDescModal] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  // State baru untuk Modal Detail Review
  const [showReviewDetailModal, setShowReviewDetailModal] = useState(false);
  const [reviewDetail, setReviewDetail] = useState<Review | null>(null);


  const HandleRepairModal = (data: any) => {
    setRepair(data);
    setShowDescModal(true);
  };

  const HandleReviewDetailModal = (review: Review) => {
    setReviewDetail(review);
    setShowReviewDetailModal(true);
  }

  const ProgressIcon = (progressStatus: string) => {
    switch (progressStatus) {
      case 'A': return <Clock size={14} className="mr-1" />;
      case 'P': return <Wrench size={14} className="mr-1" />;
      case 'S': return <CheckCircle size={14} className="mr-1" />;
      case 'T': return <XCircle size={14} className="mr-1" />;
      case 'RU': return <Info size={14} className="mr-1" />;
      default: return <Info size={14} className="mr-1" />;
    }
  }


  return (
    <div className="overflow-x-auto w-full p-2 sm:p-4 bg-white rounded-xl shadow-sm border border-gray-100">
      <table className="w-full min-w-[900px] text-xs sm:text-sm text-gray-600">
        <thead className="text-gray-700 uppercase bg-gray-100 text-[11px] sm:text-xs">
          <tr>
            {[
              "No Laporan",
              "Pelapor",
              "Fasilitas",
              "Divisi",
              "Tipe Report",
              "Review",
              "Kerusakan",
              "Progress",
              "Laporan Masuk",
              "Lama Pengerjaan",
              "Perbaikan",
              "Gambar",
              "Aksi",
            ].map((head, idx) => (
              <th key={idx} className="px-3 py-2 sm:px-4 sm:py-3 text-center font-semibold">
                {head}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {reports.map((report) => (
            <tr
              key={report._id}
              className="bg-white border-b hover:bg-gray-50 transition group"
            >
              {/* No Laporan */}
              <td className="px-3 py-2 sm:px-4 sm:py-3 font-semibold text-gray-900">
                {report.report_code}
              </td>

              {/* Pelapor */}
              <td className="px-3 py-2 sm:px-4 sm:py-3">
                {report.employee_key?.username || "-"}
              </td>

              {/* Fasilitas */}
              <td className="px-3 py-2 sm:px-4 sm:py-3">
                {report.facility_key?.name || "-"}
              </td>

              {/* Divisi */}
              <td className="px-3 py-2 sm:px-4 sm:py-3">
                {report.division_key?.code || "-"}
              </td>

              {/* Tipe Report */}
              <td className="px-3 py-2 sm:px-4 sm:py-3 font-medium text-gray-800">
                {TypeBroken(report.report_type).label}
              </td>

              {/* Review */}
              <td className="px-3 py-2 sm:px-4 sm:py-3">
{
              report.review.stars > 0
                ? (
                    <button 
                        onClick={() => HandleReviewDetailModal(report.review!)}
                        className="flex items-center text-sm font-bold text-yellow-700 bg-yellow-100 px-2 py-1 rounded-lg hover:bg-yellow-200 transition"
                    >
                        <Star size={14} className="mr-1 fill-current" /> 
                        {report.review.stars}
                    </button>
                )
                : (
                    <span className="text-sm text-gray-400 font-medium italic">
                        -
                    </span>
                )
            } 
              </td>

              {/* Kerusakan */}
              <td className="px-3 py-2 sm:px-4 sm:py-3">
                <span className="inline-block py-1 px-2 rounded-md bg-gray-100 text-gray-700 text-[11px] sm:text-xs font-semibold">
                  {StatusBroken(report.broken_type).label}
                </span>
              </td>

              {/* Progress */}
              <td className="">
                <span
                  className={` w-full flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-sm ${Progress(report.progress).className}`}
                >
                  {ProgressIcon(report.progress)}
                  {Progress(report.progress).label}
                </span>
              </td>

              {/* Laporan Masuk */}
              <td className="px-3 py-2 sm:px-4 sm:py-3">
                {FormatDate(report.createdAt, "/")}
              </td>

              {/* Lama Pengerjaan */}
              <td className="px-3 py-2 sm:px-4 sm:py-3">
                {report.duration?.text || "-"}
              </td>

              {/* Perbaikan */}
              <td className="px-3 py-2 sm:px-4 sm:py-3 text-center">
              <button
                onClick={() => HandleRepairModal(report.repair)}
                className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors duration-200 shadow-sm active:scale-95 text-sm font-medium"
              >
                Lihat Detail
              </button>
              </td>

              

              {/* Gambar */}
              <td className="px-3 py-2 sm:px-4 sm:py-3 text-center">
                {report.image ? (
                  <button
                    onClick={() => setPreviewImage(report.image)}
                    className="text-gray-600 hover:text-gray-800 transition"
                  >
                    <Image size={20} />
                  </button>
                ) : (
                  <span className="text-[11px] text-gray-400 italic">
                    Tidak ada
                  </span>
                )}
              </td>

              {/* Aksi */}
              <td
                className="
                  px-3 py-2 sm:px-4 sm:py-3 text-center
                  flex justify-center items-center gap-2
                  xl:opacity-0 xl:group-hover:opacity-100
                  transition-opacity duration-300
                "
              >
                <button
                  onClick={() => onEdit(report)}
                  className="p-1.5 sm:p-2 text-gray-400 rounded-lg border shadow hover:text-gray-600 hover:bg-gray-100 transition"
                  title="Edit"
                >
                  <PencilLine size={18} />
                </button>
                <button
                  onClick={() => report._id && onDelete(report._id)}
                  className="p-1.5 sm:p-2 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500 transition"
                  title="Hapus"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔹 Modal Detail Perbaikan */}
      <RepairModal
        show={showDescModal}
        repair={repair}
        onClose={() => setShowDescModal(false)}
      />

      {/* 🎯 Modal Detail Review BARU */}
      <ReviewDetailModal
        show={showReviewDetailModal}
        review={reviewDetail}
        onClose={() => setShowReviewDetailModal(false)}
      />

      {/* 🔹 Preview Gambar */}
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
