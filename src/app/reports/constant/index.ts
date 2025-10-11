export const Progress = (status: string) => {

  switch (status) {
    case "A":
      return {
        label: "Antrian",
        className: "bg-gray-200 text-gray-700 items-center px-2 py-0 rounded-full text-[10px] md:text-[12px] font-bold shadow-sm text-center flex justify-center ",
      };
    case "P":
      return {
        label: "Di Proses",
        className: "bg-yellow-100 text-yellow-700 items-center px-2 py-0 rounded-full text-[10px] md:text-[12px] font-bold shadow-sm  text-center flex justify-center",
      };
    case "S":
      return {
        label: "Selesai",
        className: "bg-green-100 text-green-700 items-center px-2 py-0 rounded-full text-[10px] md:text-[12px] font-bold shadow-sm  text-center flex justify-center",
      };
    case "T":
      return {
        label: "Ditolak",
        className: "bg-red-100 text-red-700 items-center px-2 py-0 rounded-full text-[10px] md:text-[12px] font-bold shadow-sm text-center flex justify-center",
      };
    case "RU":
      return {
        label: "Review Ulang",
        className: "bg-purple-100 text-purple-700 items-center px-2 py-0 rounded-full text-[10px] md:text-[12px] font-bold shadow-sm text-center flex justify-center",
      };
    default:
      return {
        label: status, // fallback ke kode aslinya
        className: "bg-gray-200 text-gray-700",
      };
  }
};

export const TypeBroken = (status: string) => {

  switch (status) {
    case "BL":
      return {
        label: "Bangunan Lainya",
      };
    case "M":
      return {
        label: "Mesin",
      };
    case "BK":
      return {
        label: "Bangunan Kantor",
      };
    case "K":
      return {
        label: "Komplain",
      };
    default:
      return {
        label: status, // fallback ke kode aslinya
      };
  }
};

export const StatusBroken = (status: string) => {


  switch (status) {

    case "R":
      return {
        label: "Ringan",
      };
      
    case "S":
      return {
        label: "Sedang",
      };

    case "B":
      return {
        label: "Berat",
      };

    default:
      return {
        label: status, // fallback ke kode aslinya
      };
  }
};

export const StatusRating = (stars: number) => {


    switch (stars) {
      case 1: return { label: 'Sangat Buruk', color: 'text-red-500 mr-2' };
      case 2: return { label: 'Kurang Baik', color: 'text-orange-500 mr-2' };
      case 3: return { label: 'Cukup Baik', color: 'text-yellow-500 mr-2' };
      case 4: return { label: 'Baik Sekali', color: 'text-lime-500 mr-2' };
      case 5: return { label: 'Luar Biasa!', color: 'text-green-600 mr-2' }; 
      default: return { label: 'No Rating ', color: 'text-gray-400 mr-2' };
    }
};

