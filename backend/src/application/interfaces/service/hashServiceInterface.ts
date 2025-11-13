export interface IHashService {
    hash(value:string):Promise<string>;
    compare(value:string,hash:string):Promise<boolean>;
}