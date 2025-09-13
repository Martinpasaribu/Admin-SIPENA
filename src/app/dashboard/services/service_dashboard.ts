
import { Facility } from "@/app/facilitys/models";
import http from "@/utils/http";
import { Dashboard } from "../models";

export async function getDashboardInfo(): Promise<Dashboard> {
  const res = await http.get("/dashboard");
  return res.data.data; // sesuaikan sama struktur response backend
}


// Fungsi untuk mendapatkan data status laporan
export const GetReportStatusStats = async (timeframe: string) => {
    try {
        const response = await http.get("/dashboard/report-status-pie", {
            params: { timeframe },
        });

        return response.data;
    } catch (error) {
        console.error("Failed to fetch report status stats", error);
        throw error;
    }
};