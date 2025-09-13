export const StatusDivision = (status: boolean) => {

  switch (status ) {

    case  true:
      return {
        label: "Dibuka",
        className: "bg-green-100 text-green-700",
      };
    case  false:
      return {
        label: "Di Tutup",
        className: "bg-red-100 text-red-700",
      };

    default:
      return {
        label: "-", // fallback ke kode aslinya
        className: "bg-gray-100 text-gray-700",
      };
  }
};