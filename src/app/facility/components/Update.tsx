/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Facility } from "../models";
import { useToast } from "@/components/ToastContect";
import { UpdateFacility } from "../services/service_facility";

interface Props {
  show: boolean;
  onClose: () => void;
  facility: Facility;
  onSuccess: () => void;
}

export default function EditFacilityModal({
  show,
  onClose,
  facility,
  onSuccess,
}: Props) {
  const [form, setForm] = useState({
    name: "",
    desc: "",
    code: "",
    qty: 0,
    unit: "",
    status: "A",
    category: "" as "BK" | "M" | "BL" | "",
    data_before: { date: new Date(), qty: 0, price: 0 },
    data_after: { date: new Date(), qty: 0, price: 0 },
  });

  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  // 🧩 Set data awal saat facility berubah
  useEffect(() => {
    if (facility) resetFormToFacility();
  }, [facility]);

  // 🧩 Fungsi reset form ke data utama facility
  const resetFormToFacility = () => {
    setForm({
      name: facility.name,
      code: facility.code,
      desc: facility.desc,
      qty: facility.qty,
      unit: facility.unit,
      status: facility.status,
      category: facility.category,
      data_before: facility.data_before,
      data_after: facility.data_after,
    });
  };

  // 🧩 Handle close modal (reset + close)
  const handleClose = () => {
    resetFormToFacility(); // kembalikan isi form ke data utama
    onClose(); // tutup modal
  };

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleNestedChange = (
    section: "data_before" | "data_after",
    key: string,
    value: any
  ) => {
    setForm((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) {
      showToast("error", "Nama harus diisi");
      return;
    }

    setLoading(true);
    try {
      await UpdateFacility(facility._id, form);
      showToast("success", "Facility berhasil diperbarui!");
      onSuccess();
    } catch (error: any) {
      console.error(error);
      showToast("error", `${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm text-gray-700 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
        <form onSubmit={handleSubmit} className="p-6">
          {/* 🔹 Tombol close */}
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            disabled={loading}
          >
            ✕
          </button>

          <h2 className="text-lg font-semibold mb-4 text-gray-900">
            Edit Facility
          </h2>

          {/* 🔹 Grid responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nama */}
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

            {/* No ID */}
            <div>
              <label className="block text-sm mb-1">No ID</label>
              <input
                type="text"
                value={form.code}
                className="cursor-not-allowed w-full border rounded-lg p-2 mb-3 bg-gray-50"
                disabled
                required
              />
            </div>

            {/* Unit */}
            <div>
              <label className="block text-sm mb-1">Satuan</label>
              <select
                value={form.unit}
                onChange={(e) =>
                  handleChange("unit", e.target.value as "D" | "B" | "U")
                }
                className="border rounded p-2 w-full mb-3"
              >
                <option value="D">Dummy</option>
                <option value="U">Unit</option>
                <option value="B">Buah</option>
              </select>
            </div>

            {/* Kategori */}
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

          {/* 🔹 Deskripsi */}
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

          {/* 🔹 Data Sebelum & Sesudah */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            {/* Sebelum */}
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Data Sebelum</h3>

              <label className="block text-sm mb-1">Tanggal</label>
              <input
                type="date"
                value={
                  form.data_before.date
                    ? new Date(form.data_before.date)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  handleNestedChange("data_before", "date", e.target.value)
                }
                className="w-full border rounded-lg p-2 mb-2"
                disabled={loading}
              />

              <label className="block text-sm mb-1">Qty</label>
              <input
                type="number"
                value={form.data_before.qty}
                onChange={(e) =>
                  handleNestedChange("data_before", "qty", e.target.value)
                }
                className="w-full border rounded-lg p-2 mb-2"
                disabled={loading}
              />

              <label className="block text-sm mb-1">Price</label>
              <input
                type="number"
                value={form.data_before.price}
                onChange={(e) =>
                  handleNestedChange("data_before", "price", e.target.value)
                }
                className="w-full border rounded-lg p-2 mb-2"
                disabled={loading}
              />
            </div>

            {/* Sesudah */}
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Data Sesudah</h3>

              <label className="block text-sm mb-1">Tanggal</label>
              <input
                type="date"
                value={
                  form.data_after.date
                    ? new Date(form.data_after.date)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  handleNestedChange("data_after", "date", e.target.value)
                }
                className="w-full border rounded-lg p-2 mb-2"
                disabled={loading}
              />

              <label className="block text-sm mb-1">Qty</label>
              <input
                type="number"
                value={form.data_after.qty}
                onChange={(e) =>
                  handleNestedChange("data_after", "qty", e.target.value)
                }
                className="w-full border rounded-lg p-2 mb-2"
                disabled={loading}
              />

              <label className="block text-sm mb-1">Price</label>
              <input
                type="number"
                value={form.data_after.price}
                onChange={(e) =>
                  handleNestedChange("data_after", "price", e.target.value)
                }
                className="w-full border rounded-lg p-2 mb-2"
                disabled={loading}
              />
            </div>
          </div>

          {/* 🔹 Tombol */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 sticky bottom-0 bg-white pt-3">
            <button
              type="button"
              onClick={handleClose}
              className="w-full sm:w-auto px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
              disabled={loading}
            >
              Batal
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
              disabled={loading}
            >
              {loading ? "Mengirim..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
