// utils/Filter.ts
import { Employee } from "@/app/employee/models";
import { Report, ReportFilterMapping } from "../models";

export interface ReportFilters {
  report_type?: string;
  broken_type?: string;
  division_key?: string;
  progress?: string;
  startDate?: Date;
  endDate?: Date;
  searchTerm?: string;
}

export function filterReports(reports: Report[], filters: ReportFilters): Report[] {
  return reports.filter((report) => {
    const normalizedSearchTerm = filters.searchTerm?.toLowerCase() || "";

    const reportTypeMatch =
      !filters.report_type || report.report_type === filters.report_type;
    const brokenTypeMatch =
      !filters.broken_type || report.broken_type === filters.broken_type;
    const progressMatch =
      !filters.progress || report.progress === filters.progress;
    const divisionMatch =
      !filters.division_key || report.division_key?._id === filters.division_key;

    // 🔹 Cek field yang bisa dicari
    const reportCode = (report.report_code ?? "").toString().toLowerCase();

    let employeeUsername = "";
    if (report.employee_key && typeof report.employee_key === "object") {
      employeeUsername = ((report.employee_key as Employee).username ?? "")
        .toString()
        .toLowerCase();
    }

    // 🔹 Logika filter gabungan
    const combinedSearchMatch =
      !normalizedSearchTerm ||
      reportCode.includes(normalizedSearchTerm) ||
      employeeUsername.includes(normalizedSearchTerm);

    // 🔹 Filter berdasarkan tanggal
    let dateMatch = true;
    if (filters.startDate || filters.endDate) {
      if (report.createdAt) {
        const reportDate = new Date(report.createdAt);

        const startDateMatch =
          !filters.startDate || reportDate >= filters.startDate;
        const endDateMatch =
          !filters.endDate || reportDate <= filters.endDate;

        dateMatch = startDateMatch && endDateMatch;
      } else {
        dateMatch = false;
      }
    }

    return (
      reportTypeMatch &&
      brokenTypeMatch &&
      progressMatch &&
      combinedSearchMatch &&
      divisionMatch &&
      dateMatch
    );
  });
}
