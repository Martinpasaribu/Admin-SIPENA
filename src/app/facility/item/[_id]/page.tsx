/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import AddItemsModal from "./components/AddItems";
import { useToast } from "@/components/ToastContect";
import { DeletedItems, GetItems, UpdateStatusItems } from "./services/service_Items";
import { ItemsModel } from "./models";
import { PencilLine, ScrollText, Trash2 } from "lucide-react";
import ItemDescModal from "../../components/ItemDescModal";
import { StatusItems } from "./constant";
import ConfirmDeleteModal from "@/components/ConfirmDeletedModal";
import EditItemsModal from "./components/UpdateItems";

const ItemPage = () => {
  const { _id } = useParams() as { _id: string };
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<ItemsModel[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [showDescModal, setShowDescModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemsModel | null>(null);
  
  const [showEditModal, setShowEditModal] = useState(false);
    const [editData, setEditData] = useState<any | null>(null);

    const [deleteId, setDeleteId] = useState<{ _id: string } | null>(null);

  const { showToast } = useToast();

  // 🔹 fetch pertama kali
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!_id) {
          setError("_id facility empty");
          return;
        }

        const res = await GetItems(_id);
        setItems(res || []);
        setError(null);
      } catch (error) {
        console.error("❌ Gagal fetch item:", error);
        setError("Gagal memuat data Items");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [_id, name]); // ✅ hapus "items" dari dependency

  // 🔹 fungsi untuk refetch data
  const refetchItems = useCallback(async () => {
    setLoading(true);
    try {
      if (!_id) {
        setError("_id facility empty");
        return;
      }

      const res = await GetItems(_id);
      setItems(res || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching Facility:", err);
      showToast("error", "Gagal memuat data divison");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [_id, showToast]); // ✅ tambahkan _id

  // 🔹 panggil refetch hanya saat _id berubah
  useEffect(() => {
    refetchItems();
  }, [refetchItems]);

  const handleUpdateStatus = async (_id: string, newStatus: ItemsModel["status"]) => {
    try {
      const updated = await UpdateStatusItems(_id, newStatus);
      setItems((prev) =>
        prev.map((f) => (f._id === _id ? { ...f, status: newStatus } : f))
      );
      showToast("success", "Status Item dirubah");
    } catch (err: any) {
      console.error("Gagal update status item:", err);
      showToast("error", err.message);
    }
  };

  const handleDeleteItems = async () => {
      if (!deleteId) return;
      try {
        
        await DeletedItems(deleteId._id);
        showToast("success", "Berhasil menghapus Items");
  
          await refetchItems();
    
        setDeleteId(null);
      } catch (err: any) {
        showToast("error", err.response?.data?.message || err.message);
        setDeleteId(null);
      }
  };
      

  return (
    <div className="p-6">


      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">
          Daftar Items {name}
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
        >
          + Tambah
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-indigo-600"></div>
        </div>
      ) : error ? (
        <p className="text-center py-4 text-red-600">{error}</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow mt-10">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  NUP
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Divisi
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  QTY
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Desc
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items && items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-500">
                    Belum ada Item {name} yang ditambahkan.
                  </td>
                </tr>
              ) : (
                items.map((f) => (
                  <tr
                    key={f.nup}
                    className="group text-slate-800 hover:bg-gray-50 transition-colors duration-200 ease-in-out"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">{f.nup}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{f.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        {
                          f.division_key && typeof f.division_key !== "string"
                            ? f.division_key.code || "-"
                          : "-"
                        }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{f.qty}</td>

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
                        value={f.status}
                        onChange={(e) =>
                          handleUpdateStatus(f._id, e.target.value as ItemsModel["status"])
                        }
                        className={`border rounded p-1 ${StatusItems(f.status).className}`}
                      >
                        <option value="A">Tersedia</option>
                        <option value="R">Perbaikan</option>
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
                          className="flex gap-1 items-center px-3 py-2 text-gray-700 border-[1px] bg-gray-50 rounded-lg shadow hover:bg-gray-100 transition-colors"
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
      )}


      <ConfirmDeleteModal
        isOpen={!!deleteId}
        onConfirm={handleDeleteItems}
        onCancel={() => setDeleteId(null)}
        message="Yakin ingin menghapus Items ini?"
      />
      
      <AddItemsModal
        show={showAddModal}
        facility_key={_id}
        onClose={() => setShowAddModal(false)}
        onSuccess={() => {
          setShowAddModal(false);
          refetchItems();
        }}
      />

      <ItemDescModal
        show={showDescModal}
        name={selectedItem?.name || ""}
        desc={selectedItem?.desc || ""}
        onClose={() => setShowDescModal(false)}
      />


      {editData && (
        <EditItemsModal
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          items={editData}
          onSuccess={() => {
            setShowEditModal(false);
            refetchItems();
          }}
        />
      )}

    </div>
  );
};

export default ItemPage;
