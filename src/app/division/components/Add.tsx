/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { DivisionClient } from "../models";
import { useToast } from "@/components/ToastContect";
import { AddDivision } from "../services/service_division";

interface Props {
  show: boolean;
  onClose: () => void;
  onSuccess: () => void; // Callback saat sukses
}

const INITIAL_FORM = {
  name: "",
  code: "",
  desc: "",
};

export default function AddDivisionModal({ show, onClose, onSuccess }: Props) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  // 🔹 Reset form otomatis setiap kali modal dibuka
  useEffect(() => {
    if (show) {
      resetForm();
    }
  }, [show]);

  // 🔹 Fungsi untuk ubah field form
  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // 🔹 Fungsi reset form
  const resetForm = () => {
    setForm(INITIAL_FORM);
  };

  // 🔹 Fungsi close modal + reset form
  const handleClose = () => {
    resetForm();
    onClose();
  };

  // 🔹 Submit data ke server
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.code || !form.desc) {
      showToast("error", "Nama, Kode, dan Deskripsi wajib diisi!");
      return;
    }
    
    setLoading(true);
    try {
      const payload: DivisionClient = {
        name: form.name.trim(),
        code: form.code.trim().toUpperCase(),
        desc: form.desc.trim(),
      };

      await AddDivision(payload);
      showToast("success", "Division berhasil ditambahkan!");

      resetForm();
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error(error);
      showToast("error", `${error.message || "Terjadi kesalahan, coba lagi."}`);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm text-gray-600 flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-6"
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-900">
          Tambah Division
        </h2>

        {/* Nama */}
        <label className="block text-sm mb-1">Nama</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full border rounded-lg p-2 mb-3"
          disabled={loading}
          required
        />

        {/* Kode */}
        <label className="block text-sm mb-1">Kode</label>
        <input
          type="text"
          value={form.code}
          onChange={(e) =>
            handleChange("code", e.target.value.toUpperCase().trim())
          }
          className="w-full border rounded-lg p-2 mb-3 uppercase"
          disabled={loading}
          maxLength={4}
          required
        />

        {/* Deskripsi */}
        <label className="block text-sm mb-1">Deskripsi</label>
        <textarea
          value={form.desc}
          onChange={(e) => handleChange("desc", e.target.value)}
          className="w-full border rounded-lg p-2 mb-3"
          disabled={loading}
          rows={3}
        />

        {/* Tombol Aksi */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
            disabled={loading}
          >
            Batal
          </button>
          <button
            type="submit"
            className={`px-4 py-2 rounded-lg text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-700 hover:bg-green-800"
            }`}
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
}
