/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/components/ToastContect";
import { DeletedFacility, GetFacility, UpdateStatusFacility } from "./services/service_facility";
import EditFacilityModal from "./components/Update";
import AddFacilityModal from "./components/Add";
import { PencilLine, ScrollText, Trash2 } from "lucide-react";
import ConfirmDeleteModal from "@/components/ConfirmDeletedModal";
import { CategoryFacility, StatusFacility, UnitFacility } from "./constant";
import { Facility, FacilityClient } from "./models";
import { ItemNavigate } from "../function/NavigateRoute";
import LoadingSpinner from "@/components/Loading";
import ItemDescModal from "./components/ItemDescModal";

export default function FacilityPage() {
  const [Facility, setFacility] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState<Facility | null>(null);
  const [deleteId, setDeleteId] = useState<{ _id: string } | null>(null);
  const [showDescModal, setShowDescModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const GotoNavigate = ItemNavigate();
  const { showToast } = useToast();

  const refetchFacilitys = useCallback(async () => {
    setLoading(true);
    try {
      const data = await GetFacility();
      setFacility(data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching Facility:", err);
      showToast("error", "Gagal memuat data facility");
      setError("Gagal memuat data Facility");
      setFacility([]);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    refetchFacilitys();
  }, [refetchFacilitys]);

  const handleUpdateStatus = async (code: string, newStatus: Facility["status"]) => {
    try {
      await UpdateStatusFacility(code, newStatus);
      setFacility((prev) =>
        prev.map((f) => (f._id === code ? { ...f, status: newStatus } : f))
      );
      showToast("success", "Status berhasil diperbarui");
    } catch (err) {
      console.error("Gagal update status:", err);
      showToast("error", "Gagal update status");
    }
  };

  const handleDeleteFacility = async () => {
    if (!deleteId) return;
    try {
      await DeletedFacility(deleteId._id);
      showToast("success", "Berhasil menghapus Facility");

      const data = await GetFacility();
      setFacility(data || []);
      setDeleteId(null);
    } catch (err: any) {
      showToast("error", err.response?.data?.message || err.message);
      setDeleteId(null);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* 🔹 Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">Daftar Facility</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
        >
          + Tambah
        </button>
      </div>

      {/* 🔹 Loading / Error / Table */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <p className="text-center py-4 text-red-600">{error}</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow mt-10">
          <table className="min-w-full divide-y divide-gray-200 text-gray-600">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Kode</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Nama</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Satuan</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Kategori</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider">Data Before</th>
                <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider">Data After</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Desc</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {Facility.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-12 text-gray-500">
                    Belum ada facility yang ditambahkan.
                  </td>
                </tr>
              ) : (
                Facility.map((f) => (
                  <tr
                    key={f._id}
                    className="group hover:bg-gray-50 transition-colors duration-200 ease-in-out"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">{f.code}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{f.name}</td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <h1 className="text-center px-2 py-1 rounded-md">
                        {UnitFacility(f.unit).label}
                      </h1>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <h1 className="text-center px-2 py-1 rounded-md">
                        {CategoryFacility(f.category).label}
                      </h1>
                    </td>
                    <td
                      onClick={() => GotoNavigate(f._id, f.name)}
                      // Tambahkan kelas untuk efek hover pada cursor
                      className="cursor-pointer px-6 py-4 whitespace-nowrap"
                    >
                      <p
                        className="
                          inline-block
                          // Desain baru: Biru cerah (Aksen), Padding lebih nyaman
                          bg-blue-500 text-white 
                          px-3 py-1.5 rounded-lg text-sm font-semibold text-center 
                          
                          // Efek interaktif: Shadow dan Hover
                          shadow-md 
                          transition duration-300 ease-in-out
                          hover:bg-blue-600 hover:shadow-lg
                        "
                      >
                        ITEM { f.qty }
                      </p>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <ul className="flex justify-around gap-2 w-[8rem]">
                        <li>{f.data_before.qty}</li>
                        <li>{f.data_before.price}</li>
                      </ul>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <ul className="flex justify-around gap-2 w-[8rem]">
                        <li>{f.data_after.qty}</li>
                        <li>{f.data_after.price}</li>
                      </ul>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <ScrollText
                        className="text-gray-400 cursor-pointer hover:text-gray-600"
                        onClick={() => {
                          setSelectedItem(f);
                          setShowDescModal(true);
                        }}
                      />
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={String(f.status)}
                        onChange={(e) =>
                          handleUpdateStatus(f._id, e.target.value as FacilityClient["status"])
                        }
                        className={`border rounded p-1 ${StatusFacility(f.status).className}`}
                      >
                        <option value="A">Aktif</option>
                        <option value="R">Sedang Diperbaiki</option>
                        <option value="B">Rusak</option>
                      </select>
                    </td>

                    {/* 🔹 Tombol aksi responsif */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className="
                          flex items-center space-x-2
                          transition-opacity duration-300
                          opacity-100 md:opacity-0 md:group-hover:opacity-100
                        "
                      >
                        <button
                          onClick={() => {
                            setEditData(f);
                            setShowEditModal(true);
                          }}
                          className="flex items-center p-2 text-gray-700 border bg-gray-50 rounded-lg shadow hover:bg-gray-100"
                          title="Edit"
                        >
                          <PencilLine size={16} />
                        </button>

                        <button
                          onClick={() => setDeleteId({ _id: f._id })}
                          className="flex items-center p-2 text-white bg-gray-400 rounded-lg shadow hover:bg-gray-500"
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
      )}

      {/* 🔹 Modal Konfirmasi Hapus */}
      <ConfirmDeleteModal
        isOpen={!!deleteId}
        onConfirm={handleDeleteFacility}
        onCancel={() => setDeleteId(null)}
        message="Yakin ingin menghapus facility ini?"
      />

      {/* 🔹 Modal Tambah */}
      <AddFacilityModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={() => {
          setShowAddModal(false);
          refetchFacilitys();
        }}
      />

      {/* 🔹 Modal Deskripsi */}
      <ItemDescModal
        show={showDescModal}
        name={selectedItem?.name || ""}
        desc={selectedItem?.desc || ""}
        onClose={() => setShowDescModal(false)}
      />

      {/* 🔹 Modal Edit */}
      {editData && (
        <EditFacilityModal
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          facility={editData}
          onSuccess={() => {
            setShowEditModal(false);
            refetchFacilitys();
          }}
        />
      )}
    </div>
  );
}
