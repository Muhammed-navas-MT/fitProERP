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
  id: string
  gymId: string
  branchId: string
  branchName: string
  name: string
  price: number
  durationInDays: number
  features: string[]
  isDailySession: boolean
  isActive: boolean
}


export interface IListPackageRequestDTO {
  search: string;
  page: number;
  limit: number;
  branchId:string
}

export interface IListPackageItemDTO {
  id: string
  gymId: string
  branchId: string
  branchName: string
  name: string
  price: number
  durationInDays: number
  features: string[]
  isDailySession: boolean
  isActive: boolean
}

export interface IListPackageResponseDTO {
  total: number
  page: number
  limit: number
  totalPages: number
  search?: string
  data: IListPackageItemDTO[]
}

export interface IListActivePackagesDTO {
  id:string;  
  name: string;
  durationInDays: number;
  price: number;
  features: string[];
  isDailySession: boolean;
  isActive?:boolean;
}
