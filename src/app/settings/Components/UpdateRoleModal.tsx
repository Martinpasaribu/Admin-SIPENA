/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import BaseModal from "./BaseModal";
import { useState, useEffect } from "react";
import ConfirmDeleteModal from "@/components/ConfirmDeletedModal";

interface UpdateRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  admin: any | null;
  onUpdate: (id: string, role: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>; 
}

export default function UpdateRoleModal({
  isOpen,
  onClose,
  admin,
  onUpdate,
  onDelete
}: UpdateRoleModalProps) {

  const [role, setRole] = useState(admin?.role || "");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (admin) {
      setRole(admin.role);
    }
  }, [admin]);

  const handleSubmit = async () => {
    if (!admin?._id) return;
    await onUpdate(admin._id, role);
    onClose();
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    await onDelete(deleteId);
    setDeleteId(null);
    onClose();
  };

  return (
    <BaseModal title="Update Role Admin" isOpen={isOpen} onClose={onClose}>
      {admin && (
        <div>
          <p className="mb-2 text-sm">
            Update role untuk:{" "}
            <span className="font-semibold text-blue-600">{admin.username}</span>
          </p>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border rounded-lg p-2 mb-4"
          >
            <option value="">Pilih Role</option>
            <option value="A">Admin</option>
            <option value="CA">Co Admin</option>
            <option value="SA">Super Admin</option>
          </select>

          <div className="flex gap-2 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 text-sm hover:bg-gray-300"
            >
              Batal
            </button>

            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
            >
              Update
            </button>

            <button
              onClick={() => setDeleteId(admin._id)}
              className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700"
            >
              Hapus
            </button>
          </div>

          {/* 🔹 Modal Konfirmasi Hapus */}
          <ConfirmDeleteModal
            isOpen={!!deleteId}
            onConfirm={handleConfirmDelete}
            onCancel={() => setDeleteId(null)}
            message="Yakin ingin menghapus admin ini?"
          />
        </div>
      )}
    </BaseModal>
  );
}
