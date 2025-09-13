/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/ToastContect";
import { Employee } from "../models";
import { UpdateEmployee } from "../services/services_employee";
import { Eye, EyeOff, Trash2 } from "lucide-react";

interface Division {
  status: any;
  _id: string;
  code: string;
}

interface Props {
  show: boolean;
  onClose: () => void;
  employee: Employee;
  division: Division[];
  onUpdated: () => void;
}

// --- helpers ---
function pickDivisionId(d: any): string {
  // Bentuk yang mungkin:
  // "64f..." | { _id: "64f..." } | { _id: { _id: "64f...", code, ... } } | { id: "64f..." }
  if (!d) return "";
  if (typeof d === "string") return d;
  if (typeof d._id === "string") return d._id;
  if (d._id && typeof d._id._id === "string") return d._id._id;
  if (typeof d.id === "string") return d.id;
  return "";
}

function getDivisionLabel(divisions: Division[], id: string) {
  const found = divisions.find((x) => x._id === id);
  if (found?.code) return found.code;
  // fallback aman biar gak render object
  return id ? `${id.slice(0, 6)}…` : "-";
}

export default function EditCustomerModal({
  show,
  onClose,
  employee,
  division,
  onUpdated,
}: Props) {

  const { showToast } = useToast();

  const [username, setUsername] = useState(employee.username);
  const [email, setEmail] = useState(employee.email);
  const [phone, setPhone] = useState(employee.phone || 0);
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Employee["role"]>(employee.role);
  const [showPassword, setShowPassword] = useState(false);


      // ✅ Sync ulang state kalau `employee` berubah
  useEffect(() => {
    if (employee) {
      setUsername(employee.username);
      setEmail(employee.email);
      setPhone(employee.phone || 0);
      setPassword("");
      setRole(employee.role);

      setDivisionKeys(
        Array.isArray(employee.division_key)
          ? employee.division_key.map(pickDivisionId).filter(Boolean)
          : []
      );
    }
  }, [employee]); // <- jalan setiap employee baru dipilih

  // ⚡ normalize ke array of string ID
  const [divisionKeys, setDivisionKeys] = useState<string[]>(
    Array.isArray(employee.division_key)
      ? employee.division_key.map(pickDivisionId).filter(Boolean)
      : []
  );

  if (!show) return null;

  const handleAddDivision = (id: string) => {
    if (id && !divisionKeys.includes(id)) {
      setDivisionKeys((prev) => [...prev, id]);
    }
  };

  const handleRemoveDivision = (id: string) => {
    setDivisionKeys((prev) => prev.filter((x) => x !== id));
  };

  const handleSubmit = async () => {
    try {
      const payload: any = {
        username,
        email,
        phone,
        role,
        // kirim sebagai array of object {_id}
        division_key: divisionKeys.map((_id) => ({ _id })),
      };
      if (password.trim()) payload.password = password;

      await UpdateEmployee(employee._id, payload);
      showToast("success", "Employee berhasil diperbarui ");
      onUpdated();
      onClose();
    } catch (error: any) {
      showToast("error", error?.message || "Gagal update employee ❌");
    }
  };



  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white text-gray-600 rounded-lg p-6 w-full max-w-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Edit Employee</h2>

        {/* Username */}
        <input
          type="text"
          className="w-full border rounded-lg p-2 mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />

        <div className="relative">

          {/* Password (opsional) */}
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border rounded-lg p-2 mb-3"
            value={password}
            placeholder="Password baru (opsional)"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-5 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>

        </div>

          {/* Email */}
          <input
            type="email"
            className="w-full border rounded-lg p-2 mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />



        {/* Phone */}
        <input
          type="number"
          className="w-full border rounded-lg p-2 mb-3"
          value={phone}
          onChange={(e) => setPhone(Number(e.target.value))}
          placeholder="Nomor Telepon"
        />

        {/* Division Manager */}
        <label className="text-sm font-medium mb-1">Division</label>
        <div className="mb-4">
          {/* Tambah Division */}
          <div className="flex gap-2 mb-2">
            <select
              className="border rounded-lg p-2 flex-1"
              defaultValue=""
              onChange={(e) => {
                const val = e.target.value;
                if (val) {
                  handleAddDivision(val);
                  e.target.value = "";
                }
              }}
            >
              <option value="">-- Tambah Division --</option>
              {division
                .filter((d) => !divisionKeys.includes(d._id))
                .map((d) => (
                  <option key={d._id} value={d._id} disabled={!d.status}>
                    Division {d.code} {!d.status && "( Ditutup )"}
                  </option>
                ))}
            </select>
          </div>

          {/* List division terpilih */}
          <ul className="space-y-1">
            {divisionKeys.map((id) => (
              <li
                key={id}
                className="flex justify-between items-center border p-2 rounded"
              >
                <span>{getDivisionLabel(division, id)}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveDivision(id)}
                  className="p-2 bg-gray-400 rounded-lg shadow hover:bg-gray-500 text-white transition-colors duration-200 ease-in-out"
                >
                  <Trash2 size={16} />
                </button>

              </li>
            ))}
          </ul>
        </div>

        {/* Role */}
        <label className="text-sm font-medium mb-1">Role</label>
        <select
          className="w-full border rounded-lg p-2 mb-3"
          value={role}
          onChange={(e) => setRole(e.target.value as Employee["role"])}
        >
          <option value="E">Pegawai</option>
          <option value="H1">Kepala Bagian 1</option>
          <option value="H2">Kepala Bagian 2</option>
        </select>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-50 border rounded-lg"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-700 text-white rounded-lg"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
