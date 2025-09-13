// components/DashboardActivityList.tsx
"use client";

import { Bell } from "lucide-react";

const dummyRecentActivities = [
  {
    id: 1,
    type: "Laporan Baru",
    description: "Laporan baru dari pengguna John Doe.",
    date: "2025-09-07",
    status: "Menunggu",
  },
  {
    id: 2,
    type: "Laporan Selesai",
    description: "Laporan fasilitas 'Keran Bocor' telah selesai.",
    date: "2025-09-06",
    status: "Selesai",
  },
  {
    id: 3,
    type: "Pengguna Baru",
    description: "Pengguna baru Jane Smith terdaftar.",
    date: "2025-09-06",
    status: "Aktif",
  },
  {
    id: 4,
    type: "Laporan Baru",
    description: "Laporan baru dari pengguna Jane Smith.",
    date: "2025-09-05",
    status: "Menunggu",
  },
];

export default function DashboardActivityList() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Aktivitas Terbaru</h3>
      <ul className="space-y-4">
        {dummyRecentActivities.map((activity) => (
          <li key={activity.id} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
              <Bell size={18} />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">{activity.type}</p>
              <p className="text-sm text-gray-600">{activity.description}</p>
            </div>
            <span className="text-xs text-gray-500 mt-1">{activity.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}