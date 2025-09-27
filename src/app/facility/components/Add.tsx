/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { FacilityClient } from "../models";
import { useToast } from "@/components/ToastContect";
import { AddFacility } from "../services/service_facility";

interface Props {
  show: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const INITIAL_FORM: FacilityClient = {
  name: "",
  desc: "",
  code: "",
  qty: 0,
  status: "A",
  unit: "D",
  category: "BK",
  data_before: {
    date: null,
    qty: 0,
    price: 0,
  },
  data_after: {
    date: null,
    qty: 0,
    price: 0,
  },
};

export default function AddFacilityModal({ show, onClose, onSuccess }: Props) {
  const [form, setForm] = useState<FacilityClient>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleChange = <K extends keyof FacilityClient>(
    field: K,
    value: FacilityClient[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

    // ✅ Fungsi umum untuk reset & tutup modal
  const handleClose = () => {
    setForm(INITIAL_FORM); // reset semua data form
    onClose(); // tutup modal
  };

  const handleNestedChange = (
    parent: "data_before" | "data_after",
    field: "date" | "qty" | "price",
    value: any
  ) => {
    setForm((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]:
          field === "qty" || field === "price"
            ? Number(value)
            : field === "date"
            ? new Date(value)
            : value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.code || !form.desc) {
      showToast("error", "Nama, Deskripsi, dan Kode wajib diisi");
      return;
    }

    setLoading(true);
    try {
      const payload: FacilityClient = {
        ...form,
        data_before: {
          ...form.data_before,
          date: form.data_before.date ? new Date(form.data_before.date) : null,
        },
        data_after: {
          ...form.data_after,
          date: form.data_after.date ? new Date(form.data_after.date) : null,
        },
      };

      await AddFacility(payload);
      showToast("success", "Fasilitas berhasil ditambahkan!");
      setForm(INITIAL_FORM);
      onSuccess();
    } catch (error: any) {
      console.error(error);
      showToast("error", `${error.message}, coba lagi.`);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 text-gray-500 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-6">
      <form
        onSubmit={handleSubmit}
        className="
          bg-white rounded-2xl shadow-lg 
          w-full max-w-2xl 
          p-5 sm:p-8 
          overflow-y-auto 
          max-h-[90vh]
        "
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            Tambah Fasilitas
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-sm sm:text-base"
          >
            ✕
          </button>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Nama */}
          <div>
            <label className="block text-sm font-medium mb-1">Nama</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full border rounded-lg p-2 sm:p-2.5 text-sm sm:text-base focus:ring focus:ring-green-100"
              required
              disabled={loading}
            />
          </div>

          {/* Kode */}
          <div>
            <label className="block text-sm font-medium mb-1">Kode</label>
            <input
              type="text"
              value={form.code}
              onChange={(e) =>
                handleChange("code", e.target.value.toUpperCase())
              }
              className="w-full border rounded-lg p-2 sm:p-2.5 text-sm sm:text-base focus:ring focus:ring-green-100"
              required
              disabled={loading}
            />
          </div>

          {/* Unit */}
          <div>
            <label className="block text-sm font-medium mb-1">Unit</label>
            <select
              value={form.unit}
              onChange={(e) =>
                handleChange("unit", e.target.value as "D" | "U" | "B")
              }
              className="border rounded-lg p-2 sm:p-2.5 w-full text-sm sm:text-base focus:ring focus:ring-green-100"
              disabled={loading}
            >
              <option value="B">BUAH</option>
              <option value="D">DUMMY</option>
              <option value="U">UNIT</option>
            </select>
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-sm font-medium mb-1">Kategori Aset</label>
            <select
              value={form.category}
              onChange={(e) =>
                handleChange("category", e.target.value as "BK" | "M" | "BL")
              }
              className="border rounded-lg p-2 sm:p-2.5 w-full text-sm sm:text-base focus:ring focus:ring-green-100"
              disabled={loading}
            >
              <option value="BK">Bangunan Kantor</option>
              <option value="M">Mesin</option>
              <option value="BL">Bangunan Lainnya</option>
            </select>
          </div>
        </div>

        {/* Deskripsi */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Deskripsi</label>
          <textarea
            value={form.desc}
            onChange={(e) => handleChange("desc", e.target.value)}
            className="w-full border rounded-lg p-2 sm:p-2.5 text-sm sm:text-base focus:ring focus:ring-green-100"
            rows={3}
            disabled={loading}
          />
        </div>

        {/* Data Before & After */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          {/* Sebelum */}
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Data Sebelum</h3>
            <div className="space-y-2">
              <input
                type="date"
                value={
                  form.data_before.date
                    ? form.data_before.date.toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  handleNestedChange("data_before", "date", e.target.value)
                }
                className="w-full border rounded-lg p-2 sm:p-2.5 text-sm"
                disabled={loading}
              />
              <input
                type="number"
                value={form.data_before.qty}
                onChange={(e) =>
                  handleNestedChange("data_before", "qty", e.target.value)
                }
                placeholder="Qty"
                className="w-full border rounded-lg p-2 sm:p-2.5 text-sm"
                disabled={loading}
              />
              <input
                type="number"
                value={form.data_before.price}
                onChange={(e) =>
                  handleNestedChange("data_before", "price", e.target.value)
                }
                placeholder="Harga"
                className="w-full border rounded-lg p-2 sm:p-2.5 text-sm"
                disabled={loading}
              />
            </div>
          </div>

          {/* Sesudah */}
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Data Sesudah</h3>
            <div className="space-y-2">
              <input
                type="date"
                value={
                  form.data_after.date
                    ? form.data_after.date.toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  handleNestedChange("data_after", "date", e.target.value)
                }
                className="w-full border rounded-lg p-2 sm:p-2.5 text-sm"
                disabled={loading}
              />
              <input
                type="number"
                value={form.data_after.qty}
                onChange={(e) =>
                  handleNestedChange("data_after", "qty", e.target.value)
                }
                placeholder="Qty"
                className="w-full border rounded-lg p-2 sm:p-2.5 text-sm"
                disabled={loading}
              />
              <input
                type="number"
                value={form.data_after.price}
                onChange={(e) =>
                  handleNestedChange("data_after", "price", e.target.value)
                }
                placeholder="Harga"
                className="w-full border rounded-lg p-2 sm:p-2.5 text-sm"
                disabled={loading}
              />
            </div>
          </div>
        </div>

        {/* Tombol */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8">
          <button
            type="button"
            onClick={handleClose}
            className="w-full sm:w-auto px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 transition"
            disabled={loading}
          >
            Batal
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
            disabled={loading}
          >
            {loading ? "Mengirim..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
}
