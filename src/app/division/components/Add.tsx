/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Division, DivisionClient } from "../models";
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

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.code || !form.desc) {
      showToast("error", "Nama, Desc dan Kode harus diisi");
      return;
    }
    // if (!/^([AD])\d{1,2}$/i.test(form.code.trim())) {
    //   showToast(
    //     "warning",
    //     "Kode harus diawali D atau A dan diikuti angka, contoh: A01, D12"
    //   );
    //   return;
    // }

    setLoading(true);
    try {
      const payload: DivisionClient = {
        name: form.name,
        code: form.code,
        desc: form.desc,
      };
      await AddDivision(payload);
      showToast("success", " berhasil ditambahkan!");
      setForm(INITIAL_FORM);
      onSuccess();
    } catch (error : any) {
      console.error(error);
      showToast("error", `${error.message}, coba lagi.`);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm  text-gray-600 flex items-center justify-center z-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">Tambah Division</h2>

        <label className="block text-sm mb-1">Nama</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full border rounded-lg p-2 mb-3"
          disabled={loading}
          required
        />


        <label className="block text-sm mb-1">Kode</label>
        <input
          type="text"
          value={form.code}
          onChange={(e) => handleChange("code", e.target.value.toUpperCase())}
          className="w-full border rounded-lg p-2 mb-3"
          disabled={loading}
          required
        />

        <label className="block text-sm mb-1">Deskripsi</label>
        <textarea
          value={form.desc}
          onChange={(e) => handleChange("desc", e.target.value)}
          className="w-full border rounded-lg p-2 mb-3"
          disabled={loading}
          rows={3}
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
            disabled={loading}
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
            disabled={loading}
          >
            {loading ? "Mengirim..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
}