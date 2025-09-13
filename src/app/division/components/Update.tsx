/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Division, DivisionClient } from "../models";
import { useToast } from "@/components/ToastContect";
import { UpdateDivision } from "../services/service_division";

interface Props {
  show: boolean;
  onClose: () => void;
  division: Division;
  onSuccess: () => void; // Callback saat sukses
}

export default function EditDivisionModal({ show, onClose, division, onSuccess }: Props) {
  const [form, setForm] = useState({
    name: "",
    desc: "",
    code: "",
  });
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    if (division) {
      setForm({
        name: division.name,
        desc: division.desc,
        code: division.code,
      });
    }
  }, [division]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) {
      showToast("error", "Nama harus diisi");
      return;
    }

    setLoading(true);
    try {
      const updatedData = {
        name: form.name,
        code: form.code,
        desc: form.desc,
      };
      await UpdateDivision(division._id, updatedData);
      showToast("success", "Divisi berhasil diperbarui!");
      onSuccess();
    } catch (error : any) {
      console.error(error);
      showToast("error", `${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm  text-gray-500 flex justify-center items-center z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          disabled={loading}
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-4 text-gray-900">Edit Division</h2>

        <label className="block text-sm mb-1">Nama</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border rounded-lg p-2 mb-3"
          disabled={loading}
          required
        />

        <label className="block text-sm mb-1">Kode</label>
        <input
          type="text"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
          className="cursor-not-allowed w-full border rounded-lg p-2 mb-3 bg-gray-50"
          disabled
          required
        />

        <label className="block text-sm mb-1">Description</label>
        <textarea
          value={form.desc}
          onChange={(e) => setForm({ ...form, desc: e.target.value })}
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
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Mengirim..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}