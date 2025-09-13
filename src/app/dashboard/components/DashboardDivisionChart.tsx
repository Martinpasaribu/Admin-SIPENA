/* eslint-disable @typescript-eslint/no-explicit-any */
// components/DashboardDivisionChart.tsx
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
import { DivisionCharts } from "../models";
import { useEffect, useState } from "react";

interface ChartData {
  name: string;
  qty: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

interface DivisionProps {
  division?: DivisionCharts[] | null;
}

// Komponen Tooltip Kustom
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-300 rounded-md shadow-lg">
        <p className="font-bold text-lg text-gray-900">{label}</p>
        <div className="mt-2 space-y-1">
          {payload.map((entry, index) => (
            <p key={index} className="text-sm text-gray-700">
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function DashboardDivisionChart({ division }: DivisionProps) {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    if (division && division.length > 0) {
      const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
        "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
      ];

      const processedData: ChartData[] = division.map((item) => {
        const monthName = monthNames[item.month - 1];
        return {
          name: `${monthName} - ${item.code}`, // bulan + code divisi
          qty: item.qty || 0,
        };
      });

      setChartData(processedData);
    }
  }, [division]);

  if (!division || division.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center justify-center">
        <p className="text-gray-500">Tidak ada data division items</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Report Divisi</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" /> {/* ✅ pakai name, bukan code */}
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="qty" name="Laporan" fill="#60A5FA" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
