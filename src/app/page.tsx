"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import ContactModal from "@/components/home/ContactModal";
import { useState } from "react";

export default function Home() {
  const [isContactOpen, setContactOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-green-100 flex flex-col">
      {/* ✅ Navbar Responsif */}
      <header className="w-full flex justify-between items-center px-6 sm:px-8 py-4 bg-white/70 backdrop-blur-md shadow-sm fixed top-0 z-50">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src="/image/icon-main.png" alt="Logo" width={40} height={40} />
          <h1 className="text-xl font-bold text-green-600 tracking-wide">SIPENA</h1>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/login"
            className="text-gray-700 hover:text-green-600 font-medium transition"
          >
            Login
          </Link>
          <Link
            href="/about"
            className="text-gray-700 hover:text-green-600 font-medium transition"
          >
            Tentang
          </Link>
          <Link
            href="/learn-more"
            className="text-gray-700 hover:text-green-600 font-medium transition"
          >
            Pelajari
          </Link>
          <button
            onClick={() => setContactOpen(true)}
            className="text-gray-700 hover:text-green-600 font-medium transition"
          >
            Kontak
          </button>
        </nav>

        {/* ✅ Tombol Menu (Mobile Only) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 hover:text-green-600 transition"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* ✅ Menu Mobile */}
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute top-[72px] left-0 w-full bg-white/95 backdrop-blur-md shadow-lg flex flex-col items-center py-6 space-y-4 md:hidden z-40"
          >
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 hover:text-green-600 font-medium text-lg transition"
            >
              Login
            </Link>
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 hover:text-green-600 font-medium text-lg transition"
            >
              Tentang
            </Link>
            <Link
              href="/learn-more"
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 hover:text-green-600 font-medium text-lg transition"
            >
              Pelajari Lebih Lanjut
            </Link>
            <button
              onClick={() => {
                setMenuOpen(false);
                setContactOpen(true);
              }}
              className="text-gray-700 hover:text-green-600 font-medium text-lg transition"
            >
              Kontak
            </button>
          </motion.nav>
        )}
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 mt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 flex justify-center">
            <Image
              src="/image/icon-main.png"
              alt="Logo"
              width={100}
              height={100}
              className="drop-shadow-md"
            />
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight">
            Selamat Datang di <span className="text-green-600">SIPENA</span>
          </h1>

          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mt-4">
            Kelola data, pantau aktivitas, dan dapatkan informasi terbaru dengan mudah melalui
            dashboard modern kami.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              href="/login"
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-md transition flex items-center justify-center gap-2"
            >
              Mulai Sekarang <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/learn-more"
              className="px-8 py-3 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold rounded-xl transition"
            >
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </motion.div>
      </main>


      {/* Modal Kontak */}
      {isContactOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl shadow-xl p-8 w-[90%] max-w-md text-center"
          >
            <h2 className="text-2xl font-semibold text-green-700 mb-3">
              Hubungi Kami
            </h2>
            <p className="text-gray-600 mb-6">
              Jika Anda memerlukan bantuan, silakan hubungi tim IT atau HRD melalui kontak berikut.
            </p>

            <div className="flex flex-col gap-3 text-gray-700 text-sm">
              <p>📧 Email: <span className="font-semibold">support@sipena.go.id</span></p>
              <p>📞 Telepon: <span className="font-semibold">(0421) 123-456</span></p>
              <p>🏢 Alamat: Pengadilan Negeri Sidenreng Rappang</p>
            </div>

            <div className="flex justify-center items-center gap-2">

                <button
                  onClick={() => setContactOpen(false)}
                  className="mt-6 px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
                >
                  Tutup
                </button>
                
            </div>

  
          </motion.div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm border-t border-gray-200 bg-white/70 backdrop-blur-md">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-semibold text-green-600">SIPENA</span>. All rights reserved.
      </footer>
    </div>
  );
}
