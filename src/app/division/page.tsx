/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
import { Division } from "./models";
import { useToast } from "@/components/ToastContect";
import {
  DeletedDivision,
  GetDivision,
  UpdateStatusDivision,
} from "./services/service_division";
import EditDivisionModal from "./components/Update";
import AddDivisionModal from "./components/Add";
import ConfirmDeleteModal from "@/components/ConfirmDeletedModal";
import { StatusDivision } from "./constant";
import LoadingSpinner from "@/components/Loading";
import { PencilLine, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/auth";

export default function DivisionPage() {
  const [division, setDivision] = useState<Division[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState<Division | null>(null);
  const [deleteId, setDeleteId] = useState<{ _id: string } | null>(null);

  const router = useRouter();
  const { showToast } = useToast();

  const refetchDivisions = useCallback(async () => {
    setLoading(true);

    try {
      const isValid = await authService.checkSession();

      if (!isValid) {
        router.push("/login?session=expired");
        return;
      }

      const data = await GetDivision();
      setDivision(data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching division:", err);
      showToast("error", "Gagal memuat data divisi");
      setError("Gagal memuat data divisi");
      setDivision([]);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    refetchDivisions();
  }, [refetchDivisions]);

  const handleUpdateStatus = async (
    id: string,
    newStatus: Division["status"]
  ) => {
    try {
      await UpdateStatusDivision(id, newStatus);
      setDivision((prev) =>
        prev.map((f) => (f._id === id ? { ...f, status: newStatus } : f))
      );
      showToast("success", "Status berhasil diperbarui");
    } catch (err) {
      console.error("Gagal update status:", err);
      showToast("error", "Gagal update status");
    }
  };

  const handleDeleteDivision = async () => {
    if (!deleteId) return;
    try {
      await DeletedDivision(deleteId._id);
      showToast("success", "Berhasil menghapus divisi");

      const data = await GetDivision();
      setDivision(data || []);
      setDeleteId(null);
    } catch (err: any) {
      showToast("error", err.response?.data?.message || err.message);
      setDeleteId(null);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Daftar Divisi
        </h1>

        <button
          onClick={() => setShowAddModal(true)}
          className="w-full sm:w-auto px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors"
        >
          + Tambah Divisi
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <p className="text-center py-4 text-red-600">{error}</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow mt-6">
          <table className="min-w-[600px] w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Kode
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {division && division.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <svg
                        className="w-32 h-32 text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.172 16.172a4 4 0 015.656 0M10.586 11.586a1 1 0 11-1.414 1.414 1 1 0 011.414-1.414zM15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <p className="mt-3 text-base font-medium text-gray-600">
                        Belum ada divisi yang ditambahkan.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                division.map((f) => (
                  <tr
                    key={f.code}
                    className="group hover:bg-gray-50 transition-colors duration-200 ease-in-out"
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      {f.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      {f.code}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <select
                        value={String(f.status)}
                        onChange={(e) => {
                          const newStatus = e.target.value === "true";
                          handleUpdateStatus(f._id, newStatus);
                        }}
                        className={`border rounded-md px-2 py-1 text-sm focus:outline-none ${StatusDivision(f.status).className}`}
                      >
                        <option value="true">Aktif</option>
                        <option value="false">Non Aktif</option>
                      </select>
                    </td>

                    {/* Tombol Aksi */}
                    <td className="px-4 py-3 whitespace-nowrap text-center">
                      <div
                        className="
                          flex justify-center items-center gap-2
                          sm:opacity-0 sm:group-hover:opacity-100 sm:transition-opacity sm:duration-300
                        "
                      >
                        {/* Edit */}
                        <button
                          onClick={() => {
                            setEditData(f);
                            setShowEditModal(true);
                          }}
                          className="
                            flex items-center justify-center
                            p-2 rounded-lg border text-gray-700 bg-gray-50
                            hover:bg-gray-100 transition-colors
                            w-9 h-9 sm:w-auto sm:h-auto sm:px-3 sm:py-2
                          "
                          title="Edit"
                        >
                          <PencilLine size={16} />
                          <span className="hidden sm:inline ml-1 text-sm">
                            Edit
                          </span>
                        </button>

                        {/* Hapus */}
                        <button
                          onClick={() => setDeleteId({ _id: f._id })}
                          className="
                            flex items-center justify-center
                            p-2 rounded-lg text-white bg-gray-400
                            hover:bg-gray-500 transition-colors
                            w-9 h-9 sm:w-auto sm:h-auto sm:px-3 sm:py-2
                          "
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                          <span className="hidden sm:inline ml-1 text-sm">
                            Hapus
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      <ConfirmDeleteModal
        isOpen={!!deleteId}
        onConfirm={handleDeleteDivision}
        onCancel={() => setDeleteId(null)}
        message="Yakin ingin menghapus divisi ini?"
      />

      <AddDivisionModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={() => {
          setShowAddModal(false);
          refetchDivisions();
        }}
      />

      {editData && (
        <EditDivisionModal
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          division={editData}
          onSuccess={() => {
            setShowEditModal(false);
            refetchDivisions();
          }}
        />
      )}
    </div>
  );
}
