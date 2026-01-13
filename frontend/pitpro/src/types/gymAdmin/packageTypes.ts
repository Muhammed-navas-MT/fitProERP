export interface ICreatePackageType {
  branchId:string;  
  name: string;
  price: number;
  durationInDays:number;
  features:string[];
  isDailySession:boolean;
}
export interface IUpdatePackageType {
  branchId:string;  
  name: string;
  price: number;
  durationInDays:number;
  features:string[];
  isDailySession:boolean;
}

export interface IViewPackageType {
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


export interface IListPackageItemType {
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

export interface IListPackagesType {
  total: number
  page: number
  limit: number
  totalPages: number
  search?: string
  data: IListPackageItemType[]
}
