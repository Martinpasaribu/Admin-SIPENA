/* eslint-disable @typescript-eslint/no-explicit-any */
// app/dashboard/page.tsx

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { User, Settings, LogOut } from "lucide-react";
import { getDashboardInfo } from "./services/service_dashboard";
import { Dashboard } from "./models";

// Import komponen yang sudah dibuat
import DashboardSummary from "./components/DashboardSummary";
import DashboardReportChart from "./components/DashboardReportChart";
import DashboardStatusPie from "./components/DashboardStatusPie";
import DashboardDivisionChart from "./components/DashboardDivisionChart";
import DashboardFacilityChart from "./components/DashboardFacilityChart";
import DashboardPriorityList from "./components/DashboardPriorityList";
import DashboardActivityList from "./components/DashboardActivityList";
import DashboardDivisionItemsPie from "./components/DashboardDivisionItemsPie";
import { useToast } from "@/components/ToastContect";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/auth";

import { AnimatePresence, motion } from 'framer-motion';
import DashboardSummaryMini from "./components/DashboardSummaryMini";

export default function DashboardPage() {
  const [userName] = useState("Admin");
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>();
  
  const barRef = useRef<HTMLDivElement | null>(null);
  const [isFloating, setIsFloating] = useState(false);

  const { showToast } = useToast();
  const router = useRouter();
  
  const fetchData = useCallback(async () => {
      
      setLoading(true);

      try {
        
        const isValid = await authService.checkSession();

        if (!isValid) {
          router.push("/login?session=expired");
          return;
        }
  
        const profile = await authService.fetchProfile();
        if (profile?.username) {
          setUser(profile);
        }

        const res = await getDashboardInfo()

        if (res) {
          setDashboard(res);
         }

      } catch (error) {
        showToast("error", `Gagal mengambil data: ${error}`);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }, [router, showToast]);
  

    useEffect(() => {
        fetchData();
      }, [fetchData]);
      
          useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Kalau bar hilang dari layar → tampilkan floating
            setIsFloating(!entry.isIntersecting);
          });
        },
        { threshold: 0.1 } // bar dianggap hilang kalau 90% sudah tidak kelihatan
      );

      if (barRef.current) observer.observe(barRef.current);

      return () => {
        if (barRef.current) observer.unobserve(barRef.current);
      };
    }, []);




  return (
    <main className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="flex justify-between items-center bg-white shadow-sm rounded-xl px-6 py-4 mb-8">
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-full transition">
            <Settings size={20} className="text-gray-700" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition">
            <LogOut size={20} className="text-gray-700" />
          </button>
        </div>
      </header>

      {/* Greeting */}
      <section className="bg-gradient-to-br from-green-700 to-green-800 text-white rounded-xl shadow p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-white text-green-600 p-3 rounded-full shadow-inner">
            <User size={28} />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Halo, {userName} </h2>
            <p className="text-sm opacity-90">
              Senang melihat Anda kembali. Semoga harimu menyenangkan!
            </p>
          </div>
        </div>
      </section>

      {/* Ringkasan */}
      <div ref={barRef} >

        <DashboardSummary dashboard={dashboard} />

      </div>

           <AnimatePresence>

              {isFloating && (
                <motion.div
                  key="floating-bar"  
                  initial={{ y: -80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -80, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="fixed bottom-[1rem] w-full left-0 right-0 z-40  text-white flex justify-center items-center "
                >
                  <DashboardSummaryMini dashboard={dashboard} />
                
                </motion.div>
              )}

            </AnimatePresence>
  

      {/* Modul Grafik (semua chart berada di dalam komponen mereka sendiri) */}
      <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <DashboardReportChart reportchart={dashboard?.reportStats || []} />
        <DashboardStatusPie />
        <DashboardDivisionItemsPie divisionItems={dashboard?.itemDivision} />
      </section>

      {/* Modul Statistik Divisi dan Fasilitas */}
      <section className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-6">
        <DashboardDivisionChart division={dashboard?.reportDivision}/>
        <DashboardFacilityChart facilityItems={dashboard?.itemFacility}/>
      </section>

      {/* Modul Laporan Prioritas dan Aktivitas Terbaru */}
      <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardPriorityList report={dashboard?.pendingReports}/>
        <DashboardActivityList />
      </section>
    </main>
  );
}