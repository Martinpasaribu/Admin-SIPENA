/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import AddCustomerModal from "./components/AddEmployee";
import EditCustomerModal from "./components/Update";
import { DeletedEmployee, GetEmployee, UpdateStatusEmployee } from "./services/services_employee";
import { StatusBooking } from "./constant";
import { useToast } from "@/components/ToastContect";
import { Employee, EmployeeClient } from "./models";
import { GetDivisionCodes } from "../division/services/service_division";
import { Division } from "../division/models";
import LoadingSpinner from "@/components/Loading";
import ConfirmDeleteModal from "@/components/ConfirmDeletedModal";
import { Trash2, PencilLine } from "lucide-react";
import { div, p } from "framer-motion/client";

export default function EmployeePage() {
  const [division, setDivision] = useState<Division[]>([]);
  const [employee, setEmployee] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState<Employee | null>(null);
  const [deleteId, setDeleteId] = useState<{ _id: string } | null>(null);

  const { showToast } = useToast();

  useEffect(() => {
    fetchDivisions();
    fetchEmployee();
  }, []);

  const fetchDivisions = async () => {
    try {
      const data = await GetDivisionCodes();
      setDivision(data);
    } catch (err) {
      console.error("Gagal mengambil division code", err);
    }
  };

  const fetchEmployee = async () => {
    setLoading(true);
    try {
      const data = await GetEmployee();
      setEmployee(data);
    } catch (err) {
      console.error("Gagal mengambil Employee", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (code: string, newStatus: EmployeeClient["status"]) => {
    try {
      await UpdateStatusEmployee(code, newStatus);
      setEmployee((prev) =>
        prev.map((f) => (f._id === code ? { ...f, status: newStatus } : f))
      );
      showToast("success", "Status employee dirubah");
    } catch (err: any) {
      console.error("Gagal update status:", err);
      showToast("error", err.message);
    }
  };

  const handleDeleteEmployee = async () => {
    if (!deleteId) return;
    try {
      await DeletedEmployee(deleteId._id);
      showToast("success", "Berhasil menghapus employee");
      setEmployee((prev) => prev.filter((c) => c._id !== deleteId._id));
      setDeleteId(null);
    } catch (err: any) {
      showToast("error", err.response?.data?.message || err.message);
      setDeleteId(null);
    }
  };

  return (

    <div className="min-h-screen p-6">
      {/* hehe */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">Daftar Employee</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
        >
          + Tambah 

        </button>
      </div>

      <div className="w-full overflow-x-auto bg-white rounded-lg shadow-md mt-10">
        <div className="min-w-max">
          <table className="w-full text-sm text-left text-gray-500">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase">User ID</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Username</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Division</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Aksi</th>
                  </tr>
                </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-6">
                      <LoadingSpinner />
                    </td>
                  </tr>
                ) : employee.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-gray-500">
                      Belum ada employee.
                    </td>
                  </tr>
                ) : (
                  employee.map((c) => (
                    <tr
                      key={c._id}
                      className="group hover:bg-gray-50 transition duration-200"
                    >
                      {/* User ID */}
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {c.user_id}
                      </td>

                      {/* Username */}
                      <td className="px-6 py-4 text-sm text-gray-800">{c.username}</td>

                      {/* Email */}
                      <td className="px-6 py-4 text-sm text-gray-700">{c.email}</td>

                      {/* Phone */}
                      <td className="px-6 py-4 text-sm text-gray-700">{c.phone}</td>

                      {/* Division */}
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {c.division_key.map((item: any, index: number) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md border border-gray-200"
                            >
                              {item?.code || "-"}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <select
                          value={c.status}
                          onChange={(e) =>
                            handleUpdateStatus(c._id, e.target.value as EmployeeClient["status"])
                          }
                          className={`border rounded p-1 text-sm ${StatusBooking(c.status).className}`}
                        >
                          <option value="A">Aktif</option>
                          <option value="B">Blokir</option>
                          <option value="P">Pending</option>
                        </select>
                      </td>

                      {/* Aksi */}
                      <td className="px-6 py-4 text-center align-middle">
                        <div
                          className={`
                            flex justify-center items-center gap-2
                            opacity-100 sm:opacity-0 sm:group-hover:opacity-100
                            transition-opacity duration-300
                          `}
                        >
                          <button
                            onClick={() => {
                              setEditData(c);
                              setShowEditModal(true);
                            }}
                            className="p-2 text-gray-400 border rounded-lg shadow hover:text-blue-500 transition"
                            title="Edit"
                          >
                            <PencilLine size={16} />
                          </button>

                          <button
                            onClick={() => setDeleteId({ _id: c._id })}
                            className="p-2 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500 transition"
                            title="Hapus"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>


              </table>
          </div>
      </div>

      {/* Modal Hapus */}
      <ConfirmDeleteModal
        isOpen={!!deleteId}
        onConfirm={handleDeleteEmployee}
        onCancel={() => setDeleteId(null)}
        message="Yakin ingin menghapus employee ini?"
      />

      {/* Modal Tambah */}
      <AddCustomerModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={fetchEmployee} // refresh list setelah tambah
        division={division}
      />

      {/* Modal Edit */}
      {editData && (
        <EditCustomerModal
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          onUpdated={() => {
            fetchEmployee();
            setShowEditModal(false);
          }}
          employee={editData}
          division={division}
        />
      )}
    </div>
  );
}
