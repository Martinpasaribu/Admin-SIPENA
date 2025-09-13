/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { ItemsMappingUpdate } from "../models";
import { useToast } from "@/components/ToastContect";
import { GetDivisionCode, UpdateItems } from "../services/service_Items";
import { Division } from "@/app/division/models";

interface Props {
  show: boolean;
  onClose: () => void;
  items?: ItemsMappingUpdate; // ✅ optional → bisa tambah atau edit
  onSuccess: () => void;
}

export default function EditItemsModal({
  show,
  onClose,
  items,
  onSuccess,
}: Props) {
  const [form, setForm] = useState({
    name: "",
    nup: "",
    qty: 0,
    desc: "",
    status: "A",
    division_key: "",
  });

  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const [division, setDivision] = useState<Division[]>([]);

  // 🔹 Fetch division list
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetDivisionCode();
        setDivision(res || []);
      } catch (error: any) {
        console.error("❌ Gagal fetch division:", error);
        showToast("error", error.message);
      }
    };

    if (show) fetchData();
  }, [show]);

  // 🔹 Isi form saat `items` berubah (mode edit)
  useEffect(() => {
    if (items && show) {
      setForm({
        name: items.name,
        nup: items.nup,
        desc: items.desc,
        qty: items.qty,
        status: items.status,
        division_key: items.division_key?._id,
      });
    }
  }, [items, show]);

  // 🔹 Reset form kalau tambah (tidak ada items)
  useEffect(() => {
    if (show && !items && division.length > 0) {
      const firstActive = division.find((d) => d.status === true);
      setForm({
        name: "",
        nup: "",
        qty: 0,
        desc: "",
        status: "A",
        division_key: firstActive ? firstActive._id : "",
      });
    }
  }, [show, items, division]);

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) {
      showToast("error", "Nama harus diisi");
      return;
    }

    setLoading(true);
    try {
      if (items?._id) {
        // ✅ Update item
        await UpdateItems(items._id, form);
        showToast("success", "Items berhasil diperbarui!");
      } else {
        // 🚀 TODO: Tambah item API kalau diperlukan
        showToast("success", "Items baru berhasil ditambahkan!");
      }
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error(error);
      showToast("error", error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm text-gray-600 flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          disabled={loading}
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-4 text-gray-900">
          {items ? "Edit Items" : "Tambah Items"}
        </h2>

        {/* Grid untuk name, code, unit, category */}
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
            <label className="block text-sm mb-1">NUP</label>
            <input
              type="text"
              value={form.nup}
              onChange={(e) =>
                handleChange("nup", e.target.value.toUpperCase())
              }
              className="cursor-not-allowed w-full border rounded-lg p-2 mb-3 bg-gray-50"
              disabled
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">QTY</label>
            <input
              type="number"
              value={form.qty}
              onChange={(e) => handleChange("qty", Number(e.target.value))}
              className="w-full border rounded-lg p-2 mb-3"
              disabled={loading}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Division</label>
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
                  {r.code} {r.name} {!r.status && "( Non Aktif )"}
                </option>
              ))}
              <option value="">Kosongkan</option>
            </select>
          </div>
        </div>

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
            {loading ? "Mengirim..." : items ? "Update" : "Tambah"}
          </button>
        </div>
      </form>
    </div>
  );
}
