export const Progress = (status: string) => {

  switch (status) {
    case "A":
      return {
        label: "Antrian",
        className: "-gray-100 text-gray-700 ",
      };
    case "P":
      return {
        label: "Di Proses",
        className: "-yellow-100 text-yellow-700",
      };
    case "S":
      return {
        label: "Selesai",
        className: "-green-100 text-green-700",
      };
    case "T":
      return {
        label: "Ditolak",
        className: "-red-100 text-red-700 ",
      };
    case "RU":
      return {
        label: "Review Ulang",
        className: "-purple-100 text-purple-700",
      };
    default:
      return {
        label: status, // fallback ke kode aslinya
        className: "-gray-100 text-gray-700",
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