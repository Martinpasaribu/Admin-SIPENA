/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
import { Division } from "./models";
import { useToast } from "@/components/ToastContect";
import { DeletedDivision, GetDivision, UpdateStatusDivision } from "./services/service_division";
import EditDivisionModal from "./components/Update";
import AddDivisionModal from "./components/Add";
import { PencilLine, Trash2 } from "lucide-react";
import ConfirmDeleteModal from "@/components/ConfirmDeletedModal";
import { StatusDivision } from "./constant";
import LoadingSpinner from "@/components/Loading";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/auth";

export default function FacilityPage() {

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
      setDivision(data || []); // 🔹 Pastikan selalu array
      setError(null);
    } catch (err) {
      console.error("Error fetching division:", err);
      showToast("error", "Gagal memuat data divison");
      setError("Gagal memuat data divison");
      setDivision([]);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    refetchDivisions();
  }, [refetchDivisions]);

  const handleUpdateStatus = async (code: string, newStatus: Division["status"]) => {
    try {
      const updated = await UpdateStatusDivision(code, newStatus);
      setDivision((prev) =>
        prev.map((f) => (f._id === code ? { ...f, status: newStatus } : f))
      );
      showToast("success", "Status berhasil diperbarui");
    } catch (err) {
      console.error("Gagal update status:", err);
      showToast("error", "Gagal update status");
    }
  };

  const handleDeleteReport = async () => {
      if (!deleteId) return;
      try {
        await DeletedDivision(deleteId._id);
        showToast("success", "Berhasil menghapus division");
  
        // 🔹 Ambil ulang data setelah berhasil menghapus
        const data = await GetDivision();
        setDivision(data || []); // 🔹 Pastikan selalu array
    
        setDeleteId(null);
      } catch (err: any) {
        showToast("error", err.response?.data?.message || err.message);
        setDeleteId(null);
      }
    };
    

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">Daftar Divisi</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
        >
          + Tambah
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          {/* Skeleton Loader berbasis CSS */}
            <LoadingSpinner />
        </div>
      ) : error ? (
        <p className="text-center py-4 text-red-600">{error}</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow mt-10">
          <div className="overflow-hidden bg-white rounded-lg shadow-md">

            <div className="overflow-hidden text-gray-600 bg-white rounded-lg shadow-md">
              
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Nama
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Kode
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* 🔹 Kondisi saat data kosong */}
                  {division && division.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-12 text-gray-500">
                        <div className="flex flex-col items-center justify-center p-8">
                          <svg
                            className="w-48 h-48 text-gray-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9.172 16.172a4 4 0 015.656 0M9.172 16.172a4 4 0 005.656 0M10.586 11.586a1 1 0 11-1.414 1.414 1 1 0 011.414-1.414zM15 13a3 3 0 11-6 0 3 3 0 016 0zM17 21a2 2 0 100-4 2 2 0 000 4zM20 18a2 2 0 11-4 0 2 2 0 014 0zM18 10a2 2 0 100-4 2 2 0 000 4z"
                            />
                          </svg>
                          <p className="mt-4 text-lg font-medium text-gray-600">
                            Belum ada fasilitas yang ditambahkan.
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
                        <td className="px-6 py-4 whitespace-nowrap">{f.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{f.code}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {/* 🔹 Tombol Status yang tidak diubah */}
                          <select
                            value={String(f.status)}
                            onChange={(e) => {
                              const newStatus = e.target.value === "true";
                              handleUpdateStatus(f._id, newStatus);
                            }}
                            className={`border rounded p-1 ${StatusDivision(f.status).className}`}
                          >
                            <option value="true">Aktif</option>
                            <option value="false">Non Aktif</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          
                          <div
                            className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          >
                            <button
                              onClick={() => {
                                setEditData(f);
                                setShowEditModal(true);
                              }}
                              className="flex gap-1 items-center px-2 py-2 text-gray-700 border-[1px] bg-gray-50 rounded-lg shadow hover:bg-gray-100 transition-colors"
                              title="Edit"
                            >
                              <PencilLine size={16} />
                            </button>
                             <button
                              onClick={() => setDeleteId({ _id: f._id })}
                              className="flex gap-1 items-center p-2 text-white bg-gray-400 rounded-lg shadow hover:bg-gray-500 transition-colors"
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
        </div>
      )}


      <ConfirmDeleteModal
        isOpen={!!deleteId}
        onConfirm={handleDeleteReport}
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