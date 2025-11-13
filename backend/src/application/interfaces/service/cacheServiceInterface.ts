export interface ICacheService {
    setData(key:string,value:string,expireTime?:number):Promise<void>;
    getData(key:string):Promise<string|null>;
    deleteData(key:string):Promise<void>;
}