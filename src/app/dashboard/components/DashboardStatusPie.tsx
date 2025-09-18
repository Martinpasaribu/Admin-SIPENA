// components/DashboardStatusPie.tsx
"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { GetReportStatusStats } from "../services/service_dashboard";

// Definisikan tipe data untuk data yang diterima dari API
interface StatusData {
  name: string;
  value: number;
}

// Pemetaan warna berdasarkan nama status
const STATUS_COLORS: { [key: string]: string } = {
  "Dalam Proses": "#F59E0B",
  "Selesai": "#10B981",
  "Antrian": "#999999FF",
  "Ditolak": "#F64B3B",
  "Review Ulang": "#3B82F6"
};

export default function DashboardStatusPie() {
  const [data, setData] = useState<StatusData[]>([]);
  const [timeframe, setTimeframe] = useState("current_month");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetReportStatusStats(timeframe);
        
        if (result.success && result.data) {
          setData(result.data);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("Gagal mengambil data status laporan:", error);
        setData([]);
      }
    };
    fetchData();
  }, [timeframe]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center justify-center">
      <div className="w-full flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Status Laporan</h3>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="p-1 border rounded-md text-sm text-gray-700"
        >
          <option value="current_month">Bulan Ini</option>
          <option value="last_1_month">1 Bulan Terakhir</option>
          <option value="last_2_months">2 Bulan Terakhir</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {/* Menggunakan tipe StatusData pada entry untuk validasi */}
            {data.map((entry: StatusData, index) => (
              <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}