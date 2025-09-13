import { Division } from "@/app/division/models";


export interface Employee  {

    _id: string;
    status: 'A' | 'B' | 'P';
    division_key: Division[] | [];
    user_id : string
    username : string;
    password: string;
    email : string;
    phone : number;
    role: 'E' | 'H1' | 'H2';
    refresh_token: string;
    createAt : number;
    creatorId: string;    
    
}

export interface EmployeeClient  {

    status: 'A' | 'B' | 'P';
    division_key: string[]; 
    // user_id : string
    username : string;
    password: string;
    email : string;
    phone : number;
    role: 'E' | 'H1' | 'H2';
    // refresh_token: string;
    // createAt : number;
    // creatorId: string;    
    
}


