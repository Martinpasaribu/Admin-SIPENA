// components/DashboardFacilityChart.tsx
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
import { FacilityItems } from "../models";

interface FacilityItemsProps {
  facilityItems?: FacilityItems[] | null;
}

export default function DashboardFacilityChart({facilityItems}:FacilityItemsProps ) {
  
  if (!facilityItems || facilityItems.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center justify-center">
        <p className="text-gray-500">Tidak ada data division items</p>
      </div>
    );
  }


  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Items Fasilitas</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={facilityItems}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          layout="vertical" // Mengubah layout menjadi vertikal (horizontal)
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" /> {/* Sumbu X sekarang untuk nilai numerik */}
          <YAxis 
            type="category" 
            dataKey="name" 
            width={120} // Memberi lebih banyak ruang untuk label nama
          /> 
          <Tooltip />
          <Legend />
          <Bar dataKey="qty" name="code" fill="#016630" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}