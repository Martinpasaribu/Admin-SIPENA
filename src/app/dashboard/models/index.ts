/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Report {

  id: number;
  report_type: string,
  user_id: string;
  room_no: string;
  status: string;
  damage_type: string,
  damage_desc: string,
  admin_note: string;

}


export interface Dashboard {

  amountEmployee? : number,
  amountReport? : number,
  amountFacility? : number,
  amountDivision? : number,
  amountRoom ?: number, 
  reportStats : ReportCharts []  
  itemDivision: DivisionItems []                     
  itemFacility: FacilityItems []                     
  reportDivision: DivisionCharts []                     
  pendingReports: ReportPriority []                     
  latestReports: any []                     

}

export interface ReportCharts {
  year: any;
  month: number;
  name? : string,
  laporanMasuk? : number,
  laporanSelesai? : number,

}

export interface DivisionCharts {
  year: any;
  month: number;
  code? : string,
  qty? : number,
}

export interface DivisionItems {

  name? : string,
  qty? : number,

}
export interface ReportPriority {

  _id: string
  report_code: string
  report_type? : string,
  createdAt? : Date,

}

export interface FacilityItems {

  name? : string,
  qty? : number,

}
