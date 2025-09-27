/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/ToastContect";
import { AddItems, GetDivisionCode } from "../services/service_Items";
import { ItemsMappingAdd } from "../models";

interface Props {
  show: boolean;
  facility_key: string;
  onClose: () => void;
  onSuccess: () => void; // Callback saat sukses
}

const INITIAL_FORM: any = {
  name: "",
  desc: "",
  nup: "",
  qty: 1,
  status: "A",
  division_key: "",
  facility_key: "",
};

export default function AddItemsModal({
  show,
  onClose,
  onSuccess,
  facility_key,
}: Props) {
  const [form, setForm] = useState<ItemsMappingAdd>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [division, setDivision] = useState<any[]>([]);
  const { showToast } = useToast();

  // 🔹 Fetch division list sekali saja
  useEffect(() => {
    const fetchDivision = async () => {
      try {
        const res = await GetDivisionCode();
        setDivision(res || []);
      } catch (error: any) {
        console.error("❌ Gagal fetch division:", error);
        showToast("error", error.message);
      }
    };

    fetchDivision();
  }, []);

  // 🔹 Reset form saat modal dibuka
  useEffect(() => {
    if (show && division.length > 0) {
      const firstActive = division.find((d) => d.status === true);
      resetForm(firstActive ? firstActive._id : "");
    }
  }, [show, division]);

  // 🔹 Fungsi umum untuk ubah field form
  const handleChange = <K extends keyof ItemsMappingAdd>(
    field: K,
    value: ItemsMappingAdd[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // 🔹 Fungsi reset form ke awal
  const resetForm = (divisionId = "") => {
    setForm({
      ...INITIAL_FORM,
      facility_key,
      division_key: divisionId,
    });
  };

  // 🔹 Close modal + reset otomatis
  const handleClose = () => {
    resetForm();
    onClose();
  };

  // 🔹 Submit data ke server
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.nup || !form.desc) {
      showToast("error", "Nama, NUP dan Deskripsi wajib diisi!");
      return;
    }

    setLoading(true);
    try {
      const payload: ItemsMappingAdd = {
        ...form,
        facility_key,
      };

      await AddItems(facility_key, payload);

      showToast("success", "Items berhasil ditambahkan!");
      resetForm();
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error(error);
      showToast("error", `${error.message || "Terjadi kesalahan"}`);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm text-gray-600 flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6"
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-900">
          Tambah Items
        </h2>

        {/* NUP */}
        <div>
          <label className="block text-sm mb-1">NUP</label>
          <input
            type="text"
            value={form.nup}
            onChange={(e) => handleChange("nup", e.target.value)}
            className="w-full border rounded-lg p-2 mb-3"
            disabled={loading}
            required
          />
        </div>

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

        {/* Division */}
        <select
          className="w-full border rounded-lg p-2 mb-3"
          value={form.division_key}
          onChange={(e) => handleChange("division_key", e.target.value)}
          disabled={loading}
        >
          {division.map((r) => (
            <option
              key={r._id}
              value={r._id}
              disabled={!r.status}
              className={!r.status ? "text-gray-400" : ""}
            >
              {r.code} — {r.name} {!r.status && "(Non Aktif)"}
            </option>
          ))}
        </select>

        {/* Deskripsi */}
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

        {/* Tombol Aksi */}
        <div className="flex justify-end gap-3 mt-6">
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
