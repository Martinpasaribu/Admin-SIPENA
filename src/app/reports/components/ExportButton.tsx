// src/app/reports/components/ExportButtons.tsx
"use client";

import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Report } from "../models";
import { FormatDate } from "../utils/Date";
import { useToast } from "@/components/ToastContect";

interface ExportButtonsProps {
  data: Report[];
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ data }) => {
  const { showToast } = useToast();

  const exportToExcel = () => {
    if (data.length === 0) {
      showToast("error", "Tidak ada data untuk diexport");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(
      data.map((r) => ({
        "No Laporan": r.report_code,
        "Pelapor": r.employee_key?.username || "-",
        "Divisi": r.division_key?.code || "-",
        "Tipe Report": r.report_type,
        "Kerusakan": r.broken_type,
        "Progress": r.progress,
        "Laporan Masuk": FormatDate(r.createdAt, "/"),
        "Lama Pengerjaan": r.duration?.text || "-",
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reports");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `Laporan_${new Date().toISOString()}.xlsx`);
  };

  const exportToCSV = () => {
    if (data.length === 0) {
      showToast("error", "Tidak ada data untuk diexport");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(
      data.map((r) => ({
        "No Laporan": r.report_code,
        "Pelapor": r.employee_key?.username || "-",
        "Divisi": r.division_key?.code || "-",
        "Tipe Report": r.report_type,
        "Kerusakan": r.broken_type,
        "Progress": r.progress,
        "Laporan Masuk": FormatDate(r.createdAt, "/"),
        "Lama Pengerjaan": r.duration?.text || "-",
      }))
    );

    const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `Laporan_${new Date().toISOString()}.csv`);
  };

  return (
    <div className="flex gap-2">
    <button
        onClick={exportToExcel}
        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors shadow-sm"
    >
        Export Excel
    </button>
    <button
        onClick={exportToCSV}
        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors shadow-sm"
    >
        Export CSV
    </button>
    </div>

  );
};

export default ExportButtons;
