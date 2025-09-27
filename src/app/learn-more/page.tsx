"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function LearnMorePage() {
  const features = [
    "Manajemen data yang cepat dan aman",
    "Dashboard analitik yang mudah dipahami",
    "Integrasi dengan sistem lain",
    "Akses multi-level (Admin & User)",
    "Riwayat aktivitas dan notifikasi otomatis",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl text-center"
      >
        <h1 className="text-4xl font-bold text-green-700 mb-4">Pelajari Lebih Lanjut</h1>
        <p className="text-gray-600 text-lg mb-10">
          Temukan bagaimana <span className="font-semibold text-green-700">SIPENA</span> membantu
          Anda dalam mengelola dan memantau aktivitas secara efektif.
        </p>

        <div className="grid md:grid-cols-2 gap-6 text-left">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              className="bg-white shadow-md border border-green-100 p-6 rounded-xl flex items-start gap-3 transition"
            >
              <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
              <p className="text-gray-700 font-medium">{feature}</p>
            </motion.div>
          ))}
        </div>

        <Link
          href="/"
          className="mt-10 inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition"
        >
          Kembali ke Beranda
        </Link>
      </motion.div>
    </div>
  );
}
