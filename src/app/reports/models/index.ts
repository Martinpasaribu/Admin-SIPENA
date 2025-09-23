import { Division } from "@/app/division/models";
import { Facility } from "@/app/facility/models";

export interface Room {
  _id: string;
  code: string;
  floor?: number;
  username: string
}


export interface duration {
  days: number,
  hour: number,
  text: string
}

export interface IRepair {
    price : number,
    note: string,
    createdAt: Date
}


export interface Customer {
  _id: string;
  username: string
  room_key?: string | Room; // bisa ObjectId (string) atau populated Room
}

export interface Report {
  _id: string | null | undefined;
  report_code: string;
  employee_key?:  Customer; // bisa ObjectId (string) atau populated Customer
  division_key?:  Division; // bisa ObjectId (string) atau populated Customer
  facility_key?: Facility;
  report_type:  "BK" | "M" | "BL" | "K";
  broken_type:  "R" | "S" | "B";
  progress: "A" | "P" | "S" | "T" | "RU";
  progress_end: Date,
  repair: IRepair,
  duration: duration,
  complain_des: string;
  broken_des: string;
  status: boolean;
  admin_note: string;
  image: string;
  totalPrice?: number;
  createdAt?:  Date;
}

export interface ReportFilterMapping {
  _id: string | null | undefined;
  report_code: string;
  employee_key?:  Customer; // bisa ObjectId (string) atau populated Customer
  division_key?:  Division; // bisa ObjectId (string) atau populated Customer
  facility_key?:  Facility; // bisa ObjectId (string) atau populated Customer
  report_type:  "BK" | "M" | "BL" | "K";
  broken_type:  "R" | "S" | "B";
  progress: "A" | "P" | "S" | "T" | "RU";
  progress_end: Date,
  repair: IRepair,
  duration: duration,
  complain_des: string;
  broken_des: string;
  status: boolean;
  admin_note: string;
  image: string;
  totalPrice?: number;
  createdAt?:  Date;
}
