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

// --- Helpers ---
function pickDivisionId(d: any): string {
  if (!d) return "";
  if (typeof d === "string") return d;
  if (typeof d._id === "string") return d._id;
  if (d._id && typeof d._id._id === "string") return d._id._id;
  if (typeof d.id === "string") return d.id;
  return "";
}

function getDivisionLabel(divisions: Division[], id: string) {
  const found = divisions.find((x) => x._id === id);
  return found?.code || id?.slice(0, 6) + "…";
}

export default function EditEmployeeModal({
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
  const [divisionKeys, setDivisionKeys] = useState<string[]>([]);

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
  }, [employee]);

  
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
        division_key: divisionKeys.map((_id) => ({ _id })),
      };
      if (password.trim()) payload.password = password;

      await UpdateEmployee(employee._id, payload);
      showToast("success", "Employee berhasil diperbarui ✅");
      onUpdated();
      onClose();
    } catch (error: any) {
      showToast("error", error?.message || "Gagal update employee ❌");
    }
  };

  const handleClose = () => {
      setUsername(employee.username);
      setEmail(employee.email);
      setPhone(employee.phone || 0);
      setPassword("");
      setRole(employee.role);
      setDivisionKeys( Array.isArray(employee.division_key)
          ? employee.division_key.map(pickDivisionId).filter(Boolean)
          : []);
      setShowPassword(false);
      onClose();
  };


  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white text-gray-700 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative shadow-lg">
        {/* Tombol close */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-5 text-gray-900">Edit Employee</h2>

        {/* Username */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            className="w-full border rounded-lg p-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>

        {/* Password */}
        <div className="mb-3 relative">
          <label className="block text-sm font-medium mb-1">Password Baru (opsional)</label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border rounded-lg p-2 pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Kosongkan jika tidak diganti"
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
            className="w-full border rounded-lg p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nomor Telepon</label>
          <input
            type="number"
            className="w-full border rounded-lg p-2"
            value={phone}
            onChange={(e) => setPhone(Number(e.target.value))}
            placeholder="Nomor telepon"
          />
        </div>

        {/* Division */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">Divisi</label>
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

          <ul className="space-y-1">
            {divisionKeys.map((id) => (
              <li
                key={id}
                className="flex justify-between items-center border p-2 rounded text-sm"
              >
                <span className="text-gray-800 font-medium">
                  Division {getDivisionLabel(division, id)}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveDivision(id)}
                  className="p-2 bg-gray-400 rounded-lg shadow hover:bg-gray-500 text-white transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Role */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-1">Peran</label>
          <select
            className="w-full border rounded-lg p-2"
            value={role}
            onChange={(e) => setRole(e.target.value as Employee["role"])}
          >
            <option value="E">Pegawai</option>
            <option value="H1">Kepala Bagian 1</option>
            <option value="H2">Kepala Bagian 2</option>
          </select>
        </div>

        {/* Tombol aksi */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
          <button
            onClick={handleClose}
            className="w-full sm:w-auto px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="w-full sm:w-auto px-4 py-2 rounded-lg text-white bg-green-700 hover:bg-green-800"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
