"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-green-100 flex flex-col items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl text-center"
      >
        <h1 className="text-4xl font-bold text-green-700 mb-4">Tentang SIPENA</h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-8">
          <span className="font-semibold text-green-700">SIPENA</span> adalah sistem
          pengelolaan data terpadu yang dirancang untuk memudahkan administrasi, pemantauan,
          dan pelaporan aktivitas secara efisien.  
          <br />
          Kami percaya bahwa pengelolaan informasi yang baik akan meningkatkan produktivitas
          dan transparansi.
        </p>

        <p className="text-gray-600 mb-8">
          Dengan antarmuka modern dan fitur intuitif, SIPENA membantu Anda memusatkan data,
          mempercepat pengambilan keputusan, dan meningkatkan efisiensi kerja.
        </p>

        <Link
          href="/"
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition"
        >
          Kembali ke Beranda
        </Link>
      </motion.div>
    </div>
  );
}
