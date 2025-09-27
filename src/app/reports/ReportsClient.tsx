/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Report } from "./models";
import EditReportModal from "./components/UpdateStatusReport";
import { DeletedReport, getReport, updateReport } from "./service/services.report";
import { filterReports, ReportFilters } from "./utils/Filter";
import ReportCard from "./components/ReportCard";
import ReportTable from "./components/ReportTable";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useToast } from "@/components/ToastContect";
import ConfirmDeleteModal from "@/components/ConfirmDeletedModal";
import { LayoutGrid, List } from "lucide-react"; // 👈 Impor ikon dari lucide-react
import LoadingSpinner from "@/components/Loading";
import { useSearchParams } from "next/navigation";
import { GetDivisionCodes } from "../division/services/service_division";
import { Division } from "../division/models";
import ExportButtons from "./components/ExportButton";
import ReportFiltersComponent from "./components/FilterComponent";

export default function ReportsPage() {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [deleteId, setDeleteId] = useState<{ _id: string } | null>(null);
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [division, setDivision] = useState<Division[]>([]);


  const { showToast } = useToast();

  const [dateRange, setDateRange] = useState([
   {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
   },
  ]);

   const searchParams = useSearchParams(); 

  const [filters, setFilters] = useState<ReportFilters>({
   report_type: "",
   broken_type: "",
   progress: "",
   startDate: undefined,
   endDate: undefined,
   searchTerm: "",
  });

  useEffect(() => {
   let mounted = true;

   const init = async () => {
      setLoading(true);
      try {
        const report = await getReport();
        if (mounted) setReports(report || []);

        FetchCodeDivision();
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        if (mounted) setLoading(false);
      }
   };

   init();
   return () => {
      mounted = false;
   };
  }, []);

  const openModal = (report: Report) => {
   setSelectedReport(report);
   setIsModalOpen(true);
  };

  const closeModal = () => {
   setSelectedReport(null);
   setIsModalOpen(false);
  };

  const FetchCodeDivision = async () => {
    try {
      const res = await GetDivisionCodes();
      setDivision(res || []);
    } catch (error: any) {
      console.error("❌ Gagal fetch division:", error);
      showToast("error", error.message);
    }
  };

  const saveChanges = async (updatedReport: Report) => {
   try {
      const res = await updateReport(updatedReport._id as string, {
        progress: updatedReport.progress,
        admin_note: updatedReport.admin_note,
        repair: updatedReport.repair,
      });

      setReports((prev) =>
        prev.map((r) => (r._id === updatedReport._id ? { ...r, ...res } : r))
      );

      const report = await getReport();
      setReports(report || []);
      showToast("success", "Berhasil update report");
   } catch (err) {
      console.error("Gagal update report:", err);
      showToast(`error`, `${err}`);
   }
  };

    // 👇 Tambahkan useEffect baru untuk menangkap query parameter
  useEffect(() => {
    // Ambil nilai report_code dari URL
    const reportCode = searchParams.get('report_code');
    
    // Jika report_code ada, perbarui state searchTerm
    if (reportCode) {
      setFilters(prev => ({
        ...prev,
        searchTerm: reportCode,
      }));
    }
  }, [searchParams]); // Jalankan efek ini setiap kali searchParams berubah

  
  const handleDateChange = (ranges: any) => {
   const { startDate, endDate } = ranges.selection;
   setDateRange([ranges.selection]);
   setFilters((prev) => ({
      ...prev,
      startDate: startDate instanceof Date ? startDate : undefined,
      endDate: endDate instanceof Date ? endDate : undefined,
   }));
  };

  const handleClearDateFilter = () => {
   setDateRange([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
   ]);

   setFilters((prev) => ({
      ...prev,
      startDate: undefined,
      endDate: undefined,
   }));
  };

  const formatDate = (date: Date) => {
   return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
   });
  };

  const handleDeleteReport = async () => {
   if (!deleteId) return;
   try {
      await DeletedReport(deleteId._id);
      showToast("success", "Berhasil menghapus report");

      const report = await getReport();
      setReports(report || []);

      setDeleteId(null);
   } catch (err: any) {
      showToast("error", err.response?.data?.message || err.message);
      setDeleteId(null);
   }
  };

  const filteredReports = filterReports(reports, filters);
  
  // 👇 Menambahkan variabel untuk class CSS yang sama dengan contoh Nuxt.js Anda
  const activeBtnClass = "p-2 bg-gray-800 text-white border-r border-gray-300";
  const inactiveBtnClass = "p-2 bg-white text-gray-800 hover:bg-gray-100 border-r border-gray-300";

  return (

   <div className=" p-2 md:p-8 bg-gray-50 text-gray-800 min-h-screen">
      <h1 className="text-xl p-4 md:p-0 md:text-3xl font-bold mb-2 md:mb-8 text-gray-900">Manajemen Laporan</h1>

      {/* Filter Component */}
      <ReportFiltersComponent
        filters={filters}
        setFilters={setFilters}
        division={division}
        formatDate={formatDate}
        handleClearDateFilter={handleClearDateFilter}
        setShowDateModal={setShowDateModal}
      />

      {/* 👇 Rubah kode ini untuk menggunakan ikon dari lucide-react */}
      <div className="flex justify-between items-center mb-4">
        {/* Placeholder biar spacing rapih */}


        {/* Export Buttons */}
        <div className="flex items-center space-x-2">
          <ExportButtons data={filteredReports} />
        </div>

        {/* Switch View */}
        <div className="flex border border-gray-200 bg-gray-50 rounded-xl shadow-sm overflow-hidden">
          <button
            onClick={() => setViewMode("card")}
            className={`px-3 py-2 transition-colors duration-200 ${
              viewMode === "card"
                ? "bg-green-100 text-green-700"
                : "bg-transparent text-gray-500 hover:bg-gray-100"
            }`}
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`px-3 py-2 transition-colors duration-200 ${
              viewMode === "table"
                ? "bg-green-100 text-green-700"
                : "bg-transparent text-gray-500 hover:bg-gray-100"
            }`}
          >
            <List size={20} />
          </button>
        </div>
      </div>


      {showDateModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl relative">
            <button
              onClick={() => setShowDateModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold"
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4">Pilih Rentang Tanggal</h3>
            <DateRangePicker
              ranges={dateRange}
              onChange={handleDateChange}
              editableDateInputs={true}
              moveRangeOnFirstSelection={false}
            />
          </div>
        </div>
      )}

      {loading ? (
        
        <LoadingSpinner />

      ) : filteredReports.length === 0 ? (
        <p className="text-gray-500 mt-5">Tidak ada laporan sesuai filter.</p>
      ) : (
        <div>
          {viewMode === "card" ? (
            <div className="space-y-5">
              {filteredReports.map((r) => (
                <ReportCard
                  key={r._id}
                  report={r}
                  onEdit={openModal}
                  onDelete={() => r._id && setDeleteId({ _id: r._id })}
                />
              ))}
            </div>
          ) : (
            <ReportTable
              reports={filteredReports}
              onEdit={openModal}
              onDelete={(id) => setDeleteId({ _id: id })}
            />
          )}
        </div>
      )}

      {selectedReport && (
        <EditReportModal
          show={isModalOpen}
          report={selectedReport}
          onClose={closeModal}
          onSave={saveChanges}
        />
      )}

      <ConfirmDeleteModal
        isOpen={!!deleteId}
        onConfirm={handleDeleteReport}
        onCancel={() => setDeleteId(null)}
        message="Yakin ingin menghapus report ini?"
      />
    </div>
  );
}