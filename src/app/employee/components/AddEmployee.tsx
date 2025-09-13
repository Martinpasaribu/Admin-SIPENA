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
  onSuccess: () => void; // dipanggil setelah sukses tambah
  division: Division[] | [];
}

export default function AddCustomerModal({ show, onClose, onSuccess, division }: Props) {
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
  try {
    setLoading(true);
    await AddEmployee(form);
    showToast("success", "Berhasil tambah Employee");

    // ✅ reset form biar bersih
    setForm({
      username: "",
      password: "",
      email: "",
      phone: 0,
      role: "E",
      division_key: [],
      status: "P",
    });

    onClose();
    onSuccess(); // refresh employee list di main page
  } catch (err: any) {
    showToast("error", err.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white text-gray-500 rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-lg font-semibold mb-4">Tambah Employee</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full border rounded-lg p-2 mb-3"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border rounded-lg p-2 mb-3 pr-10" // kasih padding kanan biar ga ketimpa tombol
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-5 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
        </div>


        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg p-2 mb-3"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="number"
          placeholder="Phone"
          className="w-full border rounded-lg p-2 mb-3"
          value={form.phone || ""}
          onChange={(e) => setForm({ ...form, phone: Number(e.target.value) })}
        />

        {/* Division pilihan */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-2">Pilih Division</label>
          <div className="grid grid-cols-2 gap-2">
            {divisions.map((r) => (
              <label
                key={r._id}
                className={`flex items-center space-x-2 border rounded-lg p-2 cursor-pointer ${
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
                  Division {r.code} {!r.status && "( Ditutup )"}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Role */}
        <select
          className="w-full border rounded-lg p-2 mb-3"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value as Employee["role"] })}
        >
          <option value={"E"}>Pegawai</option>
          <option value={"H1"}>Kepala Bagian 1</option>
          <option value={"H2"}>Kepala Bagian 2</option>
        </select>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-50 rounded-lg border">
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-white ${
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
