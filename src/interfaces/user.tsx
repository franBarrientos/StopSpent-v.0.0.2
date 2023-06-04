export interface UserData {
    id:number;
    name: string;
    surname:string;
    spents: Spent[];
    salary:number;

  }
  
export interface Spent {
    id?:number;
    name:string;
    isActive?:boolean;
    precio:number;
    description?:string
  }

