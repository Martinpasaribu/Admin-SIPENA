/* eslint-disable @typescript-eslint/no-explicit-any */
import { Facility, FacilityUpdate } from "@/app/facilitys/models";
import http from "@/utils/http";
import { Division, DivisionClient } from "../models";



export async function GetDivisionCodes() {
  try {
  const res = await http.get("/division/code");
    return res.data.data;
  } catch (error: any) {
    // Kalau pakai axios, biasanya response error ada di error.response.data
    const message =
      error.response?.data?.message ||
      error.message ||
      "Gagal fetch code division";

    // Lempar error biar ditangkap di handleSubmit
    throw new Error(message);
  }
}

export async function GetDivision() {
  try {
  const res = await http.get("/division");
    return res.data.data;
  } catch (error: any) {
    // Kalau pakai axios, biasanya response error ada di error.response.data
    const message =
      error.response?.data?.message ||
      error.message ||
      "Gagal fetch  division";

    // Lempar error biar ditangkap di handleSubmit
    throw new Error(message);
  }
}

export async function AddDivision(data: DivisionClient) {
  try {
  const res = await http.post("/division", data);
    return res.data.data;
  } catch (error: any) {
    // Kalau pakai axios, biasanya response error ada di error.response.data
    const message =
      error.response?.data?.message ||
      error.message ||
      "Gagal fetch  division";

    // Lempar error biar ditangkap di handleSubmit
    throw new Error(message);
  }
}

export async function UpdateDivision(_id: string, data: DivisionClient) {
  try {
  const res = await http.patch(`/division/${_id}`, data);
    return res.data.data;
  } catch (error: any) {
    // Kalau pakai axios, biasanya response error ada di error.response.data
    const message =
      error.response?.data?.message ||
      error.message ||
      "Gagal fetch  division";

    // Lempar error biar ditangkap di handleSubmit
    throw new Error(message);
  }
}

export async function DeletedDivision(_id: string) {
  try {
  const res = await http.delete(`/division/${_id}`);
    return res.data.data;
  } catch (error: any) {
    // Kalau pakai axios, biasanya response error ada di error.response.data
    const message =
      error.response?.data?.message ||
      error.message ||
      "Gagal deleted  division";

    // Lempar error biar ditangkap di handleSubmit
    throw new Error(message);
  }
}

export async function UpdateStatusDivision(_id: string, status: boolean) {
  try {
    const res = await http.put(`/division/status/${_id}`, { status });
    return res.data.data;
  } catch (error: any) {
    // Kalau pakai axios, biasanya response error ada di error.response.data
    const message =
      error.response?.data?.message ||
      error.message ||
      "Gagal update  division";

    // Lempar error biar ditangkap di handleSubmit
    throw new Error(message);
  }
}




