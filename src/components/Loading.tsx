// src/components/LoadingSpinner.tsx
import React from 'react';

const LoadingSpinner = () => {
  return (
    // Latar belakang gelap dengan blur (untuk kontras yang lebih baik)
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity duration-300 ease-out">
      
      {/* Container utama: Bersih dan fokus */}
      <div 
        className="
          flex flex-col items-center p-6 bg-white rounded-xl shadow-2xl
        "
      >
        {/* Kontainer Titik Memantul */}
        <div className="flex space-x-2 justify-center items-center">
            {/* Dot 1 */}
            <div className="h-2 w-2 bg-green-600 rounded-full animate-bounce"></div>
            {/* Dot 2 - delay-150 */}
            <div className="h-2 w-2 bg-green-600 rounded-full animate-bounce delay-50"></div>
            {/* Dot 3 - delay-300 */}
            <div className="h-2 w-2 bg-green-600 rounded-full animate-bounce delay-150"></div>
        </div>
        
        {/* Teks Loading */}
        <p className="mt-4 text-green-700 text-sm font-medium tracking-wide">
          Memuat konten...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;