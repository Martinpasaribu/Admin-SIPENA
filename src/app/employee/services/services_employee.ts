/* eslint-disable @typescript-eslint/no-explicit-any */
// services/customerService.ts

import http from "@/utils/http";

export async function GetEmployee() {
  const res = await http.get("/employee");
  return res.data.data;
}


export async function AddEmployee(payload: any) {
  try {
  const res = await http.post("/employee", payload);
    return res.data;
  } catch (error: any) {
    // Kalau pakai axios, biasanya response error ada di error.response.data
    const message =
      error.response?.data?.message ||
      error.message ||
      "Gagal update employee";

    // Lempar error biar ditangkap di handleSubmit
    throw new Error(message);
  }
}

export async function DeletedEmployee(_id: string) {
  try {
  const res = await http.delete(`/employee/${_id}`);
    return res.data;
  } catch (error: any) {
    // Kalau pakai axios, biasanya response error ada di error.response.data
    const message =
      error.response?.data?.message ||
      error.message ||
      "Gagal deleted employee";

    // Lempar error biar ditangkap di handleSubmit
    throw new Error(message);
  }
}



export async function UpdateEmployee(id: string, payload: any) {
  try {
    const res = await http.put(`/employee/${id}`, payload);
    return res.data;
  } catch (error: any) {
    // Kalau pakai axios, biasanya response error ada di error.response.data
    const message =
      error.response?.data?.message ||
      error.message ||
      "Gagal update employee";

    // Lempar error biar ditangkap di handleSubmit
    throw new Error(message);
  }
}


export async function UpdateStatusEmployee(_id: string, status: any) {
  try {
  const res = await http.put(`/employee/status/${_id}`, { status });
    return res.data;
  } catch (error: any) {
    // Kalau pakai axios, biasanya response error ada di error.response.data
    const message =
      error.response?.data?.message ||
      error.message ||
      "Gagal update employee";

    // Lempar error biar ditangkap di handleSubmit
    throw new Error(message);
  }
}




/**
 * Hapus 1 gambar dari gallery
 */
export async function deleteFacilityGalleryImage(code: string, images: string) {
  const res = await http.delete(`/room/${code}/del/images`, {
    data: { images }, // axios delete bisa kirim body lewat "data"
  });

  return res.data.data; // samain struktur return seperti fungsi lain
}
