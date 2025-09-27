"use client";
import { useEffect, useState } from "react";
import { IRepair, Report } from "../models";

interface EditReportModalProps {
  show: boolean;
  report: Report;
  onClose: () => void;
  onSave: (updatedReport: Report) => void;
}

export default function EditReportModal({
  show,
  report,
  onClose,
  onSave,
}: EditReportModalProps) {
  const [form, setForm] = useState<Report>(report);

  useEffect(() => {
    if (report) setForm(report);
  }, [report]);

  const handleChange = (field: keyof Report, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleRepairChange = (field: keyof IRepair, value: string | number) => {
    setForm((prev) => ({
      ...prev,
      repair: {
        ...prev.repair,
        createdAt: new Date(),
        [field]: value,
      },
    }));
  };

  const handleSubmit = () => {
    onSave(form);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-2 md:p-4">
      {/* ✅ Container modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl h-auto max-h-[90vh] overflow-y-auto p-5 md:p-6 animate-fadeIn">
        {/* Tombol close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-lg md:text-xl font-semibold mb-5 text-gray-900 border-b pb-3 text-center md:text-left">
          Ubah Status Laporan
        </h2>

        {/* Konten */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Kolom kiri */}
          <div>
            <label className="block text-sm font-medium text-gray-800">Status</label>
            <select
              value={form.progress}
              onChange={(e) => handleChange("progress", e.target.value)}
              className="mt-1 border border-gray-300 rounded-lg px-3 py-2 w-full text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm md:text-base"
            >
              <option value="A">Antrian</option>
              <option value="P">Proses</option>
              <option value="S">Selesai</option>
              <option value="T">Tolak</option>
              <option value="RU">Review Ulang</option>
            </select>

            <label className="block mt-4 text-sm font-medium text-gray-800">
              Catatan Admin
            </label>
            <textarea
              value={form.admin_note || ""}
              onChange={(e) => handleChange("admin_note", e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm md:text-base"
              rows={4}
              placeholder="Masukkan catatan admin..."
            />
          </div>

          {/* Kolom kanan */}
          <div>
            <label className="block text-sm font-medium text-gray-800">Harga Perbaikan</label>
            <input
              type="number"
              value={form.repair?.price ?? ""}
              onChange={(e) => handleRepairChange("price", Number(e.target.value))}
              placeholder="Masukkan harga"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm md:text-base"
            />

            <label className="block mt-4 text-sm font-medium text-gray-800">
              Catatan Perbaikan
            </label>
            <textarea
              value={form.repair?.note ?? ""}
              onChange={(e) => handleRepairChange("note", e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm md:text-base"
              placeholder="Masukkan catatan teknisi..."
              rows={4}
            />
          </div>
        </div>

        {/* Tombol aksi */}
        <div className="sticky bottom-0 mt-6 pt-4 border-t flex flex-col md:flex-row justify-end gap-2 md:gap-3 bg-white">
          <button
            onClick={onClose}
            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition font-medium"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="w-full md:w-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-sm transition font-medium"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}
