"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-semibold text-green-700 mb-4">Hubungi Kami</h2>
        <p className="text-gray-600 text-sm mb-6">
          Silakan isi form di bawah untuk menghubungi tim kami.
        </p>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Nama Anda"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500"
          />
          <input
            type="email"
            placeholder="Email Anda"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500"
          />
          <textarea
            placeholder="Pesan Anda"
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500 resize-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg py-2 transition"
          >
            Kirim Pesan
          </button>
        </form>
      </motion.div>
    </div>
  );
}
