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
import { ItemsModel } from "./item/[_id]/models";
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
  const [selectedItem, setSelectedItem] = useState< any | null>(null);
    

  const GotoNavigate = ItemNavigate()

  const { showToast } = useToast();

  const refetchFacilitys = useCallback(async () => {
    setLoading(true);
    try {
      const data = await GetFacility();
      setFacility(data || []); // 🔹 Pastikan selalu array
      setError(null);
    } catch (err) {
      console.error("Error fetching Facility:", err);
      showToast("error", "Gagal memuat data divison");
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
      const updated = await UpdateStatusFacility(code, newStatus);
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
  
        // 🔹 Ambil ulang data setelah berhasil menghapus
        const data = await GetFacility();
        setFacility(data || []); // 🔹 Pastikan selalu array
    
        setDeleteId(null);
      } catch (err: any) {
        showToast("error", err.response?.data?.message || err.message);
        setDeleteId(null);
      }
    };
    

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">Daftar Facility</h1>
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
          {/* <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-indigo-600"></div> */}

          <LoadingSpinner />
          
        </div>
      ) : error ? (
        <p className="text-center py-4 text-red-600">{error}</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow mt-10">
          <div className="overflow-auto-x bg-white rounded-lg shadow-md">

            <div className="overflow-auto-x text-gray-600 bg-white rounded-lg shadow-md">
              
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Kode
                    </th>
                    
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Nama
                    </th>

                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Satuan
                    </th>

                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Kategori
                    </th>

                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      QTY
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider ">
                      Data Before
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Data After
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Desc
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
                  {Facility && Facility.length === 0 ? (
                    <tr className="t">
                      <td colSpan={4} className="text-center py-12 text-gray-500">
                        <div className="flex flex-col items-center justify-center p-8">

                          <p className="mt-4 text-lg font-medium text-gray-600">
                            Belum ada item  yang ditambahkan.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    Facility.map((f) => (
                      <tr
                        key={f.code}
                        className="group hover:bg-gray-50 transition-colors duration-200 ease-in-out"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">{f.code}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{f.name}</td>

                        <td className={`px-6 py-4 whitespace-nowrap m-2 p-1`}>
                          <h1 className={`text-center px-2 py-1 rounded-md `}>{UnitFacility(f.unit).label}</h1>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <h1 className={`text-center px-2 py-1 rounded-md `}>{CategoryFacility(f.category).label}</h1>
                        </td>

                        <td onClick={() => GotoNavigate(f._id, f.name)} className="cursor-pointer px-6 py-4 whitespace-nowrap">
                          <p className="bg-gray-700 text-white px-2 py-1 rounded-md">ITEM {f.qty}</p>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                            <ul className="flex justify-around gap-2 w-[8rem]">
                              {/* <li>{f.data_after.date}</li> */}
                              <li >{f.data_before.qty}</li>
                              <li>{f.data_before.price}</li>
                            </ul>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                             <ul className="flex justify-around gap-2 w-[8rem]">
                              {/* <li>{f.data_after.date}</li> */}
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
                          {/* 🔹 Tombol Status yang tidak diubah */}
                          <select
                            value={String(f.status)}
                            onChange={(e) => {
                              const newStatus = e.target.value as FacilityClient['status'];
                              handleUpdateStatus(f._id, newStatus);
                            }}
                            className={`border rounded p-1 ${StatusFacility(f.status).className}`}
                          >
                            <option value="A">Aktif</option>
                            <option value="R">Sedang Di Perbaiki</option>
                            <option value="B">Rusak</option>
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
        onConfirm={handleDeleteFacility}
        onCancel={() => setDeleteId(null)}
        message="Yakin ingin menghapus divisi ini?"
      />
      
      <AddFacilityModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={() => {
          setShowAddModal(false);
          refetchFacilitys();
        }}
      />


      <ItemDescModal
        show={showDescModal}
        name={selectedItem?.name || ""}
        desc={selectedItem?.desc || ""}
        onClose={() => setShowDescModal(false)}
      />
      

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