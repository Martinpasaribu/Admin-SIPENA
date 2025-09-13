/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

interface Props {
  show: boolean;
  desc: string;
  name: string;
  onClose: () => void;
}

export default function ItemDescModal({ show, desc, name, onClose }: Props) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-lg p-6 relative border border-white/30">
        <h2 className="text-lg font-semibold text-green-700 mb-4">
          Deskripsi Item: {name}
        </h2>

        <div className="text-gray-800 whitespace-pre-line  rounded-lg p-4 bg-white/50 backdrop-blur-sm">
          {desc || "Tidak ada deskripsi"}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-white/60"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

