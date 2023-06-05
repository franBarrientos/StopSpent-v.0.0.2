export interface UserData {
    id:number;
    name: string;
    surname:string;
    spents: Spent[];
    salary:number;
    email?:string
    password?:string
  }
  
export interface Spent {
    id?:number;
    name:string;
    isActive?:boolean;
    precio:number;
    description?:string
  }

