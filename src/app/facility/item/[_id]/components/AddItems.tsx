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
  const [division, setCodeDivision] = useState<any[]>([]);
  const { showToast } = useToast();

  // 🔹 Fetch division list
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetDivisionCode();
        setCodeDivision(res || []);

        // Set default division_key ke yg pertama status true
        const firstActive = res.find((d: any) => d.status === true);
        if (firstActive) {
          setForm((prev) => ({
            ...prev,
            division_key: firstActive._id,
          }));
        }
      } catch (error: any) {
        console.error("❌ Gagal fetch division:", error);
        showToast("error", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔹 Reset form tiap kali modal dibuka
  useEffect(() => {
    if (show && division.length > 0) {
      const firstActive = division.find((d) => d.status === true);
      setForm({
        ...INITIAL_FORM,
        facility_key,
        division_key: firstActive ? firstActive._id : "",
      });
    }
  }, [show, division, facility_key]);

  const handleChange = <K extends keyof ItemsMappingAdd>(
    field: K,
    value: ItemsMappingAdd[K]
  ) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.nup || !form.desc) {
      showToast("error", "Nama, Desc dan Kode harus diisi");
      return;
    }
    setLoading(true);
    try {
      const payload: ItemsMappingAdd = {
        ...form,
        facility_key,
      };

      await AddItems(facility_key, payload);

      showToast("success", "Items Berhasil ditambahkan!");
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
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm text-gray-600  flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6"
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-900">
          Tambah Items
        </h2>

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

        <select
          className="w-full border rounded-lg p-2 mb-3"
          value={form.division_key}
          onChange={(e) => handleChange("division_key", e.target.value)}
        >
          {division.map((r) => (
            <option
              key={r.code}
              value={r._id}
              disabled={!r.status} // kalau status false, option disable
              className={!r.status ? "text-gray-400" : ""}
            >
              {r.code} {r.name} {!r.status && "( Non Aktif )"}
            </option>
          ))}
        </select>

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
