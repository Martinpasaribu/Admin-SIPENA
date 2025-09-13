import { Division } from "@/app/division/models";


export interface ItemsModel {
  
  _id: string;
  facility_key: string;
  name: string;
  nup: string;
  qty: number;
  desc: string;
  division_key: Division;
  status: string;  // "A" | "R" | "B" ; // A ; available, R : Repair, T : tidak digunakan

}
  

export interface ItemsMappingAdd {
  _id: string
  facility_key: string;
  name: string;
  nup: string;
  qty: number;
  desc: string;
  division_key: string;
  status: string ; // A ; available, R : Repair, T : tidak digunakan

}

export interface ItemsMappingUpdate {
  _id: string
  facility_key: string;
  name: string;
  nup: string;
  qty: number;
  desc: string;
  division_key: Division;
  status: string ; // A ; available, R : Repair, T : tidak digunakan

}

export interface ItemsModelFromClient {
  // _id: string
  // facility_key: string;
  name: string;
  nup: string;
  qty: number;
  desc: string;
  division_key: string;
  status: string ; // A ; available, R : Repair, T : tidak digunakan

}