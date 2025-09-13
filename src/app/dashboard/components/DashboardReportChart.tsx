/* eslint-disable @typescript-eslint/no-explicit-any */
// components/DashboardReportChart.tsx
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ReportCharts } from "../models";
import { useEffect, useState } from "react";

// Definisikan tipe data untuk format yang akan digunakan oleh Recharts
interface ChartData {
  name: string;
  laporanMasuk: number;
  laporanSelesai: number;
}

interface ReportChartProps {
  reportchart?: ReportCharts[] | null;
}

// Definisikan tipe untuk props Tooltip kustom
interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

// Komponen Tooltip Kustom
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-300 rounded-md shadow-lg">
        <p className="font-bold text-lg text-gray-900">{label}</p>
        <div className="mt-2">
          {/* Mengatur warna teks untuk setiap item data sesuai dengan warna bar */}
          <p className="text-sm text-sky-500">{`${payload[0].name}: ${payload[0].value}`}</p>
          <p className="text-sm text-emerald-500">{`${payload[1].name}: ${payload[1].value}`}</p>
        </div>
      </div>
    );
  }
  return null;
};

export default function DashboardReportChart({ reportchart }: ReportChartProps) {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    if (reportchart && reportchart.length > 0) {
      const processedData: ChartData[] = reportchart.map(item => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
        const monthName = monthNames[item.month - 1];

        return {
          name: `${monthName} ${item.year}`,
          laporanMasuk: item.laporanMasuk || 0,
          laporanSelesai: item.laporanSelesai || 0,
        };
      });
      setChartData(processedData);
    }
  }, [reportchart]);

  return (
    <div className="lg:col-span-2 xl:col-span-2 bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Statistik Laporan</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          {/* Menggunakan Tooltip Kustom dengan prop 'content' */}
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="laporanMasuk" name="Laporan Masuk" fill="#0EA5E9" />
          <Bar dataKey="laporanSelesai" name="Laporan Selesai" fill="#10B981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}