export const StatusFacility = (status: string) => {

  switch (status ) {

    case  'A':
      return {
        label: "Tersedia",
        className: "bg-green-100 text-green-700",
      };
    case  'R':
      return {
        label: "Di Perbaiki",
        className: "bg-yellow-100 text-yellow-700",
      };
    case  'B':
      return {
        label: "Sedang Rusak",
        className: "bg-red-100 text-red-700",
      };

    default:
      return {
        label: "-", // fallback ke kode aslinya
        className: "bg-gray-100 text-gray-700",
      };
  }
};

export const UnitFacility = (status: string) => {

  switch (status ) {

    case  'B':
      return {
        label: "BUAH",
        className: "bg-green-100 text-green-700",
      };

    case  'U':
      return {
        label: "UNIT",
        className: "bg-yellow-100 text-yellow-700",
      };
      
    case  'D':
      return {
        label: "DUMMY",
        className: "bg-blue-100 text-blue-700",
      };

    default:
      return {
        label: "-", // fallback ke kode aslinya
        className: "bg-gray-100 text-gray-700",
      };
  }
};

export const CategoryFacility = (status: string) => {

  switch (status ) {

    case  'BK':
      return {
        label: "Bangunan Kantor",
        className: "bg-green-100 text-green-700",
      };

    case  'M':
      return {
        label: "Mesin",
        className: "bg-yellow-100 text-yellow-700",
      };

    case  'BL':
      return {
        label: "Bangunan Lainnya",
        className: "bg-blue-100 text-blue-700",
      };

    default:
      return {
        label: "-", // fallback ke kode aslinya
        className: "bg-gray-100 text-gray-700",
      };
  }
};