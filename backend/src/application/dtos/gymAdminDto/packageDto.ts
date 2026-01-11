export interface ICreatePackageRequestDTO {
  branchId:string;  
  name: string;
  price: number;
  durationInDays:number;
  features:string[];
  isDailySession:boolean;
}
export interface IUpdatePackageRequestDTO {
  branchId:string;  
  name: string;
  price: number;
  durationInDays:number;
  features:string[];
  isDailySession:boolean;
}

export interface IViewPackageResponseDTO {
  id: string;
  gymId:string;
  branchId:string;  
  name: string;
  price: number;
  durationInDays:number;
  features:string[];
  isDailySession:boolean;
  isActive:boolean
}

export interface IListPackageRequestDTO {
  search: string;
  page: number;
  limit: number;
  branchId:string
}

export interface IListPackageResponseDTO {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  search: string;
  data: Array<{
    id:string;
    gymId:string;
    branchId:string;  
    name: string;
    price: number;
    durationInDays:number;
    features:string[];
    isDailySession:boolean;
    isActive:boolean;
  }>;
}
