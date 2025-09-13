/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { FacilityClient } from "../models";
import { useToast } from "@/components/ToastContect";
import { AddFacility } from "../services/service_facility";

interface Props {
  show: boolean;
  onClose: () => void;
  onSuccess: () => void; // Callback saat sukses
}

const INITIAL_FORM: FacilityClient = {
  name: "",
  desc: "",
  code: "",
  qty: 0,
  status:"A",
  unit: "D", // default
  category: "BK", // default
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
      showToast("error", "Nama, Desc dan Kode harus diisi");
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
      showToast("success", "Facility berhasil ditambahkan!");
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
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6"
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-900">
          Tambah Facility
        </h2>

        {/* Grid untuk nama, kode, unit */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Nama</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full border rounded-lg p-2 mb-3"
              disabled={loading}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Kode</label>
            <input
              type="text"
              value={form.code}
              onChange={(e) => handleChange("code", e.target.value.toUpperCase())}
              className="w-full border rounded-lg p-2 mb-3"
              disabled={loading}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Unit</label>
 
            <select
              value={form.unit}
              onChange={(e) =>
                handleChange("unit", e.target.value as "D" | "U" | "B")
              }
              className="border rounded p-2 w-full mb-3"
            >
              <option value="B">BUAH</option>
              <option value="D">DUMMY</option>
              <option value="U">UNIT</option>
            </select>

          </div>

          <div>
            <label className="block text-sm mb-1">Kategori</label>
            <select
              value={form.category}
              onChange={(e) =>
                handleChange("category", e.target.value as "BK" | "M" | "BL")
              }
              className="border rounded p-2 w-full mb-3"
            >
              <option value="BK">Bangunan Kantor</option>
              <option value="M">Mesin</option>
              <option value="BL">Bangunan Lainnya</option>
            </select>
          </div>
        </div>

        {/* Deskripsi full width */}
        <div>
          <label className="block text-sm mb-1">Deskripsi</label>
          <textarea
            value={form.desc}
            onChange={(e) => handleChange("desc", e.target.value)}
            className="w-full border rounded-lg p-2 mb-3"
            disabled={loading}
            rows={3}
          />
        </div>

        {/* Data Before & After */}
        <div className="grid grid-cols-2 gap-6 mt-4">
          {/* Data Before */}
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Data Sebelum</h3>
            <label className="block text-sm mb-1">Tanggal</label>
            <input
              type="date"
              value={form.data_before.date ? form.data_before.date.toISOString().split("T")[0] : ""}
              onChange={(e) => handleNestedChange("data_before", "date", e.target.value)}
              className="w-full border rounded-lg p-2 mb-2"
              disabled={loading}
            />
            
            <label className="block text-sm mb-1">Qty</label>
            <input
              type="number"
              value={form.data_before.qty}
              onChange={(e) => handleNestedChange("data_before", "qty", e.target.value)}
              className="w-full border rounded-lg p-2 mb-2"
              disabled={loading}
            />

            <label className="block text-sm mb-1">Price</label>
            <input
              type="number"
              value={form.data_before.price}
              onChange={(e) => handleNestedChange("data_before", "price", e.target.value)}
              className="w-full border rounded-lg p-2 mb-2"
              disabled={loading}
            />
          </div>

          {/* Data After */}
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Data Sesudah</h3>
            <label className="block text-sm mb-1">Tanggal</label>
            <input
              type="date"
              value={form.data_after.date ? form.data_after.date.toISOString().split("T")[0] : ""}
              onChange={(e) => handleNestedChange("data_after", "date", e.target.value)}
              className="w-full border rounded-lg p-2 mb-2"
              disabled={loading}
            />
            <label className="block text-sm mb-1">Qty</label>
            <input
              type="number"
              value={form.data_after.qty}
              onChange={(e) => handleNestedChange("data_after", "qty", e.target.value)}
              className="w-full border rounded-lg p-2 mb-2"
              disabled={loading}
            />
            <label className="block text-sm mb-1">Price</label>
            <input
              type="number"
              value={form.data_after.price}
              onChange={(e) => handleNestedChange("data_after", "price", e.target.value)}
              className="w-full border rounded-lg p-2 mb-2"
              disabled={loading}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
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
