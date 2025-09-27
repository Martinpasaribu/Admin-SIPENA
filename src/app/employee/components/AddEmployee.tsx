/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Employee, EmployeeClient } from "../models";
import { Division } from "@/app/division/models";
import { AddEmployee } from "../services/services_employee";
import { useToast } from "@/components/ToastContect";
import { Eye, EyeOff } from "lucide-react";

interface Props {
  show: boolean;
  onClose: () => void;
  onSuccess: () => void;
  division: Division[] | [];
}

export default function AddEmployeeModal({ show, onClose, onSuccess, division }: Props) {
  const [divisions, setDivision] = useState<Division[]>([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState<EmployeeClient>({
    username: "",
    password: "",
    email: "",
    phone: 0,
    role: "E",
    division_key: [],
    status: "P",
  });

  useEffect(() => {
    if (division && division.length > 0) {
      setDivision(division);
    }
  }, [division]);

  if (!show) return null;

  const handleSubmit = async () => {
    if (!form.username || !form.password || !form.email) {
      showToast("error", "Semua field wajib diisi");
      return;
    }

    try {
      setLoading(true);
      await AddEmployee(form);
      showToast("success", "Berhasil tambah Employee");

      setForm({
        username: "",
        password: "",
        email: "",
        phone: 0,
        role: "E",
        division_key: [],
        status: "P",
      });

      onSuccess();
      onClose();
    } catch (err: any) {
      showToast("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    // ✅ reset semua data form
    setForm({
      username: "",
      password: "",
      email: "",
      phone: 0,
      role: "E",
      division_key: [],
      status: "P",
    });
    setShowPassword(false);

    // ✅ tutup modal
    onClose();
  };

  
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white text-gray-700 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative shadow-lg">
        {/* Tombol close */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          disabled={loading}
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-5 text-gray-900">Tambah Employee</h2>

        {/* Username */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            placeholder="Masukkan username"
            className="w-full border rounded-lg p-2"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            disabled={loading}
          />
        </div>

        {/* Password */}
        <div className="mb-3 relative">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Masukkan password"
            className="w-full border rounded-lg p-2 pr-10"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[2.8rem] -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Masukkan email"
            className="w-full border rounded-lg p-2"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            disabled={loading}
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">No. Telepon</label>
          <input
            type="number"
            placeholder="Masukkan nomor telepon"
            className="w-full border rounded-lg p-2"
            value={form.phone || ""}
            onChange={(e) => setForm({ ...form, phone: Number(e.target.value) })}
            disabled={loading}
          />
        </div>

        {/* Division pilihan */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">Pilih Division</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {divisions.map((r) => (
              <label
                key={r._id}
                className={`flex items-center space-x-2 border rounded-lg p-2 text-sm cursor-pointer ${
                  !r.status ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
                }`}
              >
                <input
                  type="checkbox"
                  value={r._id}
                  disabled={!r.status}
                  checked={form.division_key.includes(r._id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setForm({
                        ...form,
                        division_key: [...form.division_key, r._id],
                      });
                    } else {
                      setForm({
                        ...form,
                        division_key: form.division_key.filter((id) => id !== r._id),
                      });
                    }
                  }}
                />
                <span>
                  Division {r.code} {!r.status && "(Ditutup)"}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Role */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-1">Peran</label>
          <select
            className="w-full border rounded-lg p-2"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value as Employee["role"] })}
            disabled={loading}
          >
            <option value={"E"}>Pegawai</option>
            <option value={"H1"}>Kepala Bagian 1</option>
            <option value={"H2"}>Kepala Bagian 2</option>
          </select>
        </div>

        {/* Tombol aksi */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
          <button
            onClick={handleClose}
            className="w-full sm:w-auto px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
            disabled={loading}
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full sm:w-auto px-4 py-2 rounded-lg text-white ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-700 hover:bg-green-800"
            }`}
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}
