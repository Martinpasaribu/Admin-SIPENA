/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { IRepair, Report } from "../models";
import { Progress, StatusBroken, TypeBroken } from "../constant";
import { Trash2, Pencil, Wrench, Image } from "lucide-react";
import { FormatDate } from "../utils/Date";
import RepairModal from "./RepairModal";
import { useState } from "react";

interface Props {
  report: Report;
  onEdit: (report: Report) => void;
 onDelete: (reportId: string) => void;
}



export default function ReportCard({ report, onEdit, onDelete }: Props) {

  const [ repair, setRepair ] = useState<IRepair>();
  const [showDescModal, setShowDescModal] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const HandleRepairModal = (data : any) => {
    setRepair(data);
    setShowDescModal(true);
    console.log(`tombol ditekan ${JSON.stringify(data, null, 2)} `)
  }


  return (
    <div className="relative group bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition">
      <div className="space-y-1">

        <div className="flex flex-wrap gap-x-8 gap-y-4">
          
          {/* Kolom 1: ID */}
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              No Laporan
            </p>
            <p className="text-sm font-semibold text-gray-900">
              {report.report_code}
            </p>
          </div>

          {/* Kolom 2: Tipe Report */}
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tipe Report
            </p>
            <p className="text-sm font-semibold text-gray-900">
              {TypeBroken(report.report_type).label}
            </p>
          </div>

          {/* Kolom 3: Pelapor */}
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Pelapor
            </p>
            <p className="text-sm font-semibold text-gray-900">
              {report.employee_key?.username || '-'}
            </p>
          </div>

          {/* Kolom 4: Fasilitas */}
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fasilitas
            </p>
           <span className="text-sm text-gray-700 font-semibold rounded-md">
              {report.facility_key?.name || '-'}
            </span>
          </div>

          {/* Kolom 5: Divisi */}
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Divisi
            </p>
           <span className="text-sm text-gray-700 font-semibold px-2 rounded-md">
              {report.division_key?.code || '-'}
            </span>
          </div>
          
          {/* Kolom 5: Tipe Kerusakan */}
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tipe Kerusakan
            </p>
            <div className="inline-block py-1 text-center px-2 rounded-md bg-gray-100 text-gray-700 text-sm font-semibold">
              {StatusBroken(report.broken_type).label}
            </div>
          </div>

          {/* Kolom 6: Status */}
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </p>
            <div className={`inline-block py-1 px-2 rounded-md text-sm font-semibold ${Progress(report.progress).className}`}>
              {Progress(report.progress).label}
            </div>
          </div>

          {/* Kolom 7: Laporan Masuk */}
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Laporan Masuk
            </p>
            <p className="text-sm font-semibold text-gray-900">
              {FormatDate(report.createdAt, "/")}
            </p>
          </div>

          {/* Kolom 8: Lama Pengerjaan */}
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Lama Pengerjaan
            </p>
            <p className="text-sm font-semibold text-gray-900">
              {report.duration?.text || '-'}
            </p>
          </div>

          {/* Kolom 8: Biaya Perbaikan */}
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Perbaikan
            </p>
            <p onClick={ () => HandleRepairModal(report.repair) }  className="flex justify-center mt-1 text-sm font-semibold text-gray-900">
              <Wrench size={20} className="text-gray-500 cursor-pointer" />
            </p>
          </div>

          <div className="flex flex-col gap-1">

            <div className="flex flex-col gap-1">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gambar
              </p>
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
            </div>
          </div>


        </div>

        <div className="mt-3">
          <p className="text-gray-500 text-sm">Pesan Customer</p>
          <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg">
            {report.broken_des
              ? report.broken_des
              : report.complain_des || "Belum ada balasan"}
          </p>
        </div>
        <div className="mt-3">
          <p className="text-gray-500 text-sm">Balasan Admin</p>
          <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg">
            {report.admin_note || "Belum ada balasan"}
          </p>
        </div>

      </div>

      {/* 🔹 Tombol muncul saat hover */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition flex gap-2">
        <button
          onClick={() => onEdit(report)}
          className="p-2 text-gray-400 rounded-lg border shadow"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={() => report._id && onDelete(report._id)}
          className="p-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 shadow"
        >
          <Trash2 size={16} />
        </button>
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

      <RepairModal
        show={showDescModal}
        repair={repair}
        onClose={() => setShowDescModal(false)}
      />
      

    </div>
  );
}
