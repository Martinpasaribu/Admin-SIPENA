import { Employee } from "@/app/employee/models";

export interface Division {

    _id:string
    name : string;
    code : string;
    desc: string;
    status: boolean
    refresh_token: string;
    createAt : number;
    creatorId: string;
    employee_key: Employee [];    
    
}

export interface DivisionClient {
    // _id:string
    name : string;
    code : string;
    desc: string;
    // status: boolean
    // refresh_token: string;
    // createAt : number;
    // creatorId: string;
    // employee_key: Employee [];    
}
