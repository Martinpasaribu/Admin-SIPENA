/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Bell } from "lucide-react";

interface Activity {
  id: string;
  type: string;
  description: string;
  date: string;
  status: string;
}

interface DashboardActivityListProps {
  activities: Activity[];
}

export default function DashboardActivityList({ activities }: DashboardActivityListProps) {

  console.log(activities);
  
  if (!activities || activities.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Aktivitas Terbaru</h3>
        <p className="text-gray-500">Belum ada aktivitas terbaru.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Aktivitas Terbaru</h3>
      <ul className="space-y-4">
        {activities.map((activity) => (
          <li
            key={activity.id}
            className={`flex items-start gap-4 p-3 rounded-lg ${
              activity.status === "Selesai" ? "bg-green-50" : "bg-gray-50"
            }`}
          >
            <div
              className={`p-2 rounded-full ${
                activity.status === "Selesai" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
              }`}
            >
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
