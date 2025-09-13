/* eslint-disable @typescript-eslint/no-explicit-any */
import { Facility, FacilityUpdate } from "@/app/facilitys/models";
import http from "@/utils/http";
import {  FacilityClient } from "../models";



export async function GetDivisionCodes() {
  try {
  const res = await http.get("/facility/code");
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

export async function GetFacility() {
  try {
  const res = await http.get("/facility");
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

export async function AddFacility(data: FacilityClient) {
  try {
  const res = await http.post("/facility", data);
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

export async function UpdateFacility(_id: string, data: FacilityClient) {
  try {
  const res = await http.patch(`/facility/${_id}`, data);
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

export async function DeletedFacility(_id: string) {
  try {
  const res = await http.delete(`/facility/${_id}`);
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

export async function UpdateStatusFacility(_id: string, status: string) {
  try {
    const res = await http.put(`/facility/status/${_id}`, { status });
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




