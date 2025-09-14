"use client";

import { FileText, Users, Package } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dashboard } from "../models";

interface DashboardSummaryProps {
  dashboard: Dashboard | null;
}

export default function DashboardSummaryMini({ dashboard }: DashboardSummaryProps) {
  const router = useRouter();

  const items = [
    {
      label: "Pengguna",
      value: dashboard?.amountEmployee ?? 0,
      icon: <Users size={20} />,
      color: "bg-indigo-100 text-indigo-600",
      href: "/employee",
    },
    {
      label: "Laporan",
      value: dashboard?.amountReport ?? 0,
      icon: <FileText size={20} />,
      color: "bg-red-100 text-red-600",
      href: "/reports",
    },
    {
      label: "Fasilitas",
      value: dashboard?.amountFacility ?? 0,
      icon: <Package size={20} />,
      color: "bg-gray-100 text-gray-600",
      href: "/facility",
    },
    {
      label: "Divisi",
      value: dashboard?.amountDivision ?? 0,
      icon: <Package size={20} />,
      color: "bg-gray-100 text-gray-600",
      href: "/division",
    },
  ];

  return (
    <section className="w-full max-w-[40rem] px-4 py-2 bg-white/40 backdrop-blur-lg rounded-2xl shadow-lg">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item) => (
          <button
            key={item.label}
            onClick={() => router.push(item.href)}
            className="group bg-white rounded-xl shadow-sm px-2 py-2 flex flex-col items-center justify-center gap-2 
                       transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95"
          >
            {/* <div
              className={`p-3 rounded-xl ${item.color} group-hover:rotate-6 transition-transform`}
            >
              {item.icon}
            </div> */}
            <div className="text-center">
              <p className="text-xs font-medium text-gray-500">{item.label}</p>
              <p className="text-xl font-bold text-gray-900">{item.value}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
