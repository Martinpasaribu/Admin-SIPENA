/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "@/utils/http";
import { ItemsModel, ItemsModelFromClient, ItemsMappingAdd } from "../models";


export async function AddItems(facility_key:string,data: ItemsMappingAdd) {

  try {

    const res = await http.post(`/items/${facility_key}`, data);
    return res.data.data;

  } catch (error: any) {
    // Kalau pakai axios, biasanya response error ada di error.response.data
    const message =
      error.response?.data?.message ||
      error.message ||
      "Gagal Add Items";

    // Lempar error biar ditangkap di handleSubmit
    throw new Error(message);
  }
}


export async function GetItems(_id: string) {
  try {
  const res = await http.get(`/items/${_id}`);
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

export async function GetDivisionCode() {
  try {
  const res = await http.get(`/division/code`);
    return res.data.data;
  } catch (error: any) {
    // Kalau pakai axios, biasanya response error ada di error.response.data
    const message =
      error.response?.data?.message ||
      error.message ||
      "Gagal fetch  division code";

    // Lempar error biar ditangkap di handleSubmit
    throw new Error(message);
  }
}

export async function UpdateStatusItems(_id: string, status: any) {
  try {
  const res = await http.put(`/items/status/${_id}`, { status });
    return res.data;
  } catch (error: any) {
    // Kalau pakai axios, biasanya response error ada di error.response.data
    const message =
      error.response?.data?.message ||
      error.message ||
      "Gagal update items";

    // Lempar error biar ditangkap di handleSubmit
    throw new Error(message);
  }
}

export async function UpdateItems(_id: string, data: ItemsModelFromClient) {
  try {
  const res = await http.patch(`/items/${_id}`, data);
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

export async function DeletedItems(_id: string) {
  try {
  const res = await http.delete(`/items/${_id}`);
    return res.data.data;
  } catch (error: any) {
    // Kalau pakai axios, biasanya response error ada di error.response.data
    const message =
      error.response?.data?.message ||
      error.message ||
      "Gagal deleted  items";

    // Lempar error biar ditangkap di handleSubmit
    throw new Error(message);
  }
}

