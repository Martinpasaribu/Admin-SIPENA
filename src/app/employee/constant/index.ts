export const StatusBooking = (status: string) => {

  switch (status) {

    case "A":
      return {
        label: "Aktif",
        className: "bg-green-100 text-green-700",
      };
    case "B":
      return {
        label: "Di Blokir",
        className: "bg-red-100 text-red-700",
      };
    case "P":
      return {
        label: "Pending",
        className: "bg-yellow-100 text-yellow-700",
      };
    default:
      return {
        label: "-", // fallback ke kode aslinya
        className: "bg-gray-100 text-gray-700",
      };
  }
};