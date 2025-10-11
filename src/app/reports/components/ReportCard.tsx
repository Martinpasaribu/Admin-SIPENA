// src/components/ReportCard.tsx (BAGIAN YANG DIMODIFIKASI)

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { IRepair, Report } from "../models";
import { Progress, StatusBroken, TypeBroken } from "../constant";
import { Trash2, Pencil, Wrench, Image, Clock, CheckCircle, XCircle, Info, Star } from "lucide-react";
import { FormatDateWithTime } from "../utils/Date";
import RepairModal from "./RepairModal";
// 🎯 Import modal baru
import ReviewDetailModal, { ReportReview } from "./ReviewDetailModal"; 
import { useState } from "react";
import { div } from "framer-motion/client";

// Hapus interface ReportReview di sini jika sudah didefinisikan di ReviewDetailModal.tsx

interface Props {
  report: Report;
  onEdit: (report: Report) => void;
  onDelete: (reportId: string) => void;
}

export default function ReportCard({ report, onEdit, onDelete }: Props) {
  // ... state lainnya tetap sama
  const [repair, setRepair] = useState<IRepair>();
  const [showDescModal, setShowDescModal] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  // State baru untuk Modal Detail Review
  const [showReviewDetailModal, setShowReviewDetailModal] = useState(false);
  const [reviewDetail, setReviewDetail] = useState<ReportReview | null>(null);


  const HandleRepairModal = (data: any) => {
    setRepair(data);
    setShowDescModal(true);
  };

  // Handler untuk membuka modal detail review
  const HandleReviewDetailModal = (review: ReportReview) => {
    setReviewDetail(review);
    setShowReviewDetailModal(true);
  }

  // ... (ProgressIcon function dan statusColorClass tetap sama)

  const ProgressIcon = (progressStatus: string) => {
    switch (progressStatus) {
      case "A":
        return <Clock size={14} className="mr-1" />;
      case "P":
        return <Wrench size={14} className="mr-1" />;
      case "S":
        return <CheckCircle size={14} className="mr-1" />;
      case "T":
        return <XCircle size={14} className="mr-1" />;
      default:
        return <Info size={14} className="mr-1" />;
    }
  };

  const statusColorClass = Progress(report.progress).className.split(' ')[0].replace('text-', 'border-');

  const hasReview = report.review && report.review.stars > 0;

  return (
    <div className={`relative group bg-white p-6 rounded-2xl shadow-lg border-l-4 border-green-600 ${statusColorClass} hover:shadow-xl transition-all duration-300`}>
      
      {/* ... HEADER, GRID INFORMASI, Tombol Aksi Tambahan, PESAN DAN BALASAN tetap sama ... */}

      {/* 🔹 HEADER: No. Laporan & Tombol Aksi */}
      <div className="flex justify-between items-start pb-3 border-b border-gray-100 mb-4">
        <h3 className="text-xl font-extrabold text-slate-800 leading-tight">
          <span className="text-gray-600">{report.report_code}</span>
        </h3>
        
        <div className="flex gap-2 transition-all">
          <button
            onClick={() => onEdit(report)}
            title="Edit Laporan"
            className="p-2 text-gray-500 rounded-full hover:text-blue-600 hover:bg-blue-50 transition"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => report._id && onDelete(report._id)}
            title="Hapus Laporan"
            className="p-2 text-white bg-gray-500 hover:bg-gray-600 rounded-full shadow-md transition"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>


      {/* 🔹 GRID INFORMASI UTAMA */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-5">
        
        {/* ⚙️ Tipe Report */}
        <InfoItem label="Tipe Report" value={TypeBroken(report.report_type).label} />

        {/* ⚠️ Tipe Kerusakan */}
        <InfoItem 
            label="Tipe Kerusakan" 
            value={StatusBroken(report.broken_type).label} 
            // className={StatusBroken(report.broken_type).className}
        />

        {/* 🔄 Status */}
        <InfoItem
          label="Status"
          value={

            <div className="flex justify-start">
              <span className={`${Progress(report.progress).className} flex items-center font-bold`}>
                {ProgressIcon(report.progress)}
                {Progress(report.progress).label}
              </span>

              </div>
          }
        />
        
        {/* 🌟 REVIEW (TETAP SAMA) */}
        <InfoItem 
            label="Review Pelapor" 
            value={
                hasReview && report.review
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
                        Belum Ada
                    </span>
                )
            } 
        />
        {/* ------------------------------------------- */}

        {/* 👤 Pelapor */}
        <InfoItem label="Pelapor" value={report.employee_key?.username || "-"} />

        {/* 🏢 Fasilitas */}
        <InfoItem label="Fasilitas" value={report.facility_key?.name || "-"} />

        {/* 🧩 Divisi */}
        <InfoItem label="Divisi" value={report.division_key?.code || "-"} />

        {/* 🕒 Laporan Masuk */}
        <InfoItem label="Laporan Masuk" value={FormatDateWithTime(report.createdAt, "/")} />

        {/* ⏳ Lama Pengerjaan */}
        <InfoItem label="Lama Pengerjaan" value={report.duration?.text || "-"} />
      </div>
      
      {/* ---------------------------------------------------- */}

      {/* 🔹 Tombol Aksi Tambahan */}
      <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap gap-3">
        {/* 🔧 Perbaikan */}
        {report.repair && (
            <button
              onClick={() => HandleRepairModal(report.repair)}
              className="px-4 py-2 text-[12px] rounded-lg bg-green-50 text-green-700 hover:bg-green-100 shadow-sm transition font-semibold flex items-center"
            >
              <Wrench size={14} className="mr-2" /> Lihat Detail Perbaikan
            </button>
        )}

        {/* 🖼️ Gambar */}
        {report.image ? (
          <button
            onClick={() => setPreviewImage(report.image)}
            className="px-4 py-2 text-[12px] rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-sm transition font-semibold flex items-center"
          >
            <Image size={14} className="mr-2" /> Lihat Gambar
          </button>
        ) : (
          <span className="px-4 py-2 text-xs text-gray-400 italic">Gambar tidak tersedia</span>
        )}
      </div>

      {/* 🔹 PESAN DAN BALASAN */}
      <div className="space-y-4 mt-6">
          {/* Pesan Customer */}
          <TextBlock label="Pesan Pelapor (Deskripsi Kerusakan)" value={report.broken_des || report.complain_des || "Pelapor tidak memberikan deskripsi tambahan."} />

          {/* Balasan Admin */}
          <TextBlock label="Balasan/Catatan Admin" value={report.admin_note || "Admin belum memberikan balasan/catatan."} />
          
      </div>


      {/* 🔹 Preview Image Modal (Tetap Sama) */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            alt="Preview"
            className="max-w-full max-h-full md:max-w-[90%] md:max-h-[90%] rounded-lg shadow-2xl transition-transform duration-300 scale-100 hover:scale-[1.01]"
          />
          <button
            onClick={() => setPreviewImage(null)}
            className="absolute top-6 right-6 text-white bg-black/50 hover:bg-black/70 p-3 rounded-full transition text-lg font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* 🔹 Modal Perbaikan (Tetap Sama) */}
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
    </div>
  );
}

// ... Komponen Reusable InfoItem dan TextBlock (Tetap Sama)

function InfoItem({
  label,
  value,
  className = 'text-gray-800',
}: {
  label: string;
  value: React.ReactNode;
  className?: string; 
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
        {label}
      </p>
      <div className={`w-full font-semibold text-sm ${className}`}>
        <h1 className="w-full">
          {value}
          </h1>
        </div>
    </div>
  );
}

function TextBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-sm">
      <p className="text-gray-500 mb-1.5 font-bold uppercase tracking-wider text-[11px] sm:text-xs">{label}</p>
      <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-gray-700 leading-snug shadow-inner">
        {value}
      </div>
    </div>
  );
}