// components/DashboardDivisionItemsPie.tsx
"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DivisionItems } from "../models";

interface DivisionItemsProps {
  divisionItems?: DivisionItems[] | null;
}

// Palet warna berdasarkan index
const COLORS: string[] = [
  "#3B82F6", // biru
  "#10B981", // hijau
  "#F59E0B", // kuning
  "#F64B3B", // merah
  "#8B5CF6", // ungu
  "#EC4899", // pink
  "#14B8A6", // teal
  "#999999", // abu-abu
];

export default function DashboardDivisionItemsPie({
  divisionItems,
}: DivisionItemsProps) {
  
  if (!divisionItems || divisionItems.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center justify-center">
        <p className="text-gray-500">Tidak ada data division items</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center justify-center">
              <h3 className="w-full text-lg font-semibold text-gray-900 text-left">Items Divisi</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={divisionItems}
            dataKey="qty"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {divisionItems.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]} // warna berdasarkan index
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
