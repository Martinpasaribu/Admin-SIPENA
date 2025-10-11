// src/components/ReviewDetailModal.tsx (RESPONSIVE)

import React from 'react';
import { X, Star, MessageSquare } from 'lucide-react';

// Interface Review harus diimpor atau didefinisikan ulang
export interface ReportReview {
  stars: number;
  message: string;
}

interface ReviewDetailModalProps {
  show: boolean;
  onClose: () => void;
  review: ReportReview | null;
}

const ReviewDetailModal: React.FC<ReviewDetailModalProps> = ({ show, onClose, review }) => {
  if (!show || !review) return null;

  // Tingkatan Nama Berdasarkan Bintang
  const getRatingName = (s: number) => {
    switch (s) {
      case 1: return { label: 'Sangat Buruk', color: 'text-red-600' };
      case 2: return { label: 'Kurang Baik', color: 'text-orange-600' };
      case 3: return { label: 'Cukup Baik', color: 'text-yellow-600' };
      case 4: return { label: 'Baik Sekali', color: 'text-lime-600' };
      case 5: return { label: 'Luar Biasa!', color: 'text-green-600' }; 
      default: return { label: 'Tanpa Rating', color: 'text-gray-500' };
    }
  };

  const ratingStatus = getRatingName(review.stars);

  return (
    // Backdrop
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-gray-900/80 backdrop-blur-sm transition-opacity duration-300 p-4 sm:p-0">
      <div 
        // Container Modal: Margin lebih kecil di HP (p-4)
        className="bg-white rounded-2xl shadow-2xl p-5 sm:p-8 w-full max-w-lg m-0 sm:m-4 transform transition-all duration-300 scale-100"
      >
        {/* HEADER MODAL */}
        <div className="flex justify-between items-start border-b border-gray-100 pb-3 sm:pb-4 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-2xl font-extrabold text-slate-800 flex items-center">
            {/* Ukuran ikon lebih kecil di HP (size={20}) */}
            <MessageSquare size={20} className="mr-2 text-green-600 sm:size-26" />
            Detail Ulasan Layanan
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 p-1 sm:p-2 rounded-full hover:bg-gray-100 hover:text-gray-700 transition"
          >
            <X size={20} className="sm:size-24" />
          </button>
        </div>

        {/* BODY MODAL */}
        <div className="space-y-5 sm:space-y-6">
          
          {/* Rating Section */}
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-4 sm:p-6 rounded-xl border border-yellow-300 text-center shadow-md">
            <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3 uppercase tracking-wider">Penilaian Pelapor</p>
            
            <div className="flex justify-center space-x-0.5 sm:space-x-1">
              {[1, 2, 3, 4, 5].map((starValue) => (
                <Star
                  key={starValue}
                  // Ukuran bintang disesuaikan untuk HP
                  className='h-6 w-6 sm:h-9 sm:w-9 transition-colors duration-300'
                  style={{ color: starValue <= review.stars ? '#FACC15' : '#D1D5DB' }}
                  fill={starValue <= review.stars ? 'currentColor' : 'none'}
                />
              ))}
            </div>
            
            {/* Label Status Bintang */}
            <span className={`block text-lg sm:text-2xl font-extrabold mt-3 sm:mt-4 ${ratingStatus.color} transition-colors duration-300`}>
              {ratingStatus.label}
            </span>
          </div>

          {/* Message Section */}
          <div>
            <p className="text-xs sm:text-sm font-bold text-slate-700 mb-1.5 sm:mb-2 uppercase tracking-wider">Komentar Ulasan</p>
            <div
              // Padding lebih kecil di HP (p-3)
              className="w-full text-gray-800 bg-gray-50 p-3 sm:p-4 border border-gray-200 rounded-lg text-sm sm:text-base shadow-inner min-h-[100px] leading-relaxed"
            >
                {review.message}
            </div>
          </div>
        </div>

        {/* FOOTER BUTTONS */}
        <div className="mt-6 sm:mt-8 flex justify-end">
          <button
            onClick={onClose}
            // Ukuran tombol disesuaikan untuk HP
            className="px-6 py-2 text-white font-semibold bg-green-600 rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-500/50 active:scale-[0.98]"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetailModal;