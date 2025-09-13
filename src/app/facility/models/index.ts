

export interface CategoryFacility {
  name: string,
  code: string;
}


interface Data1 {
  date?: Date | null,
  qty: number;
  price: number;
}

interface Data2 {
  date?: Date | null,
  qty: number;
  price: number;
}

interface Data1Map02 {
  date: Date ,
  qty: number;
  price: number;
}

interface Data2Map02 {
  date: Date ,
  qty: number;
  price: number;
}


interface Item {
  _id: string
}

export interface Facility {
    _id:string
    code: string;
    name: string;
    desc: string;
    qty: number;
    items_key: Item[];
    status: string ; // A ; available, R : Repair, B : tidak digunakan
    unit: string ; // D : dummy, U ; unit, B : buah
    data_before : Data1Map02; 
    data_after : Data2Map02; 
    category: "BK" | "M" | "BL" | "" ;
    isDeleted: boolean;   
}

export interface FacilityClient {
    // _id:string
    code: string;
    name: string;
    desc: string;
    qty: number;
    status: string
    // items_key: Item[];
    // status: "A" | "R" | "B" ; // A ; available, R : Repair, T : tidak digunakan
    unit: string // D : dummy, U ; unit, B : buah
    data_before : Data1; 
    data_after : Data2; 
    category: "BK" | "M" | "BL" | "";
    // isDeleted: boolean;      
}
