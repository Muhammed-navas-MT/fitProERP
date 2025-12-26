export interface IBaseRepository<T> {
    create(data:T):Promise<string>;
    blockById(id:string):Promise<boolean>;
    unBlockById(id:string):Promise<boolean>;
    findById(id:string):Promise<T | null>;
    update(data:Partial<T>,id:string):Promise<boolean>;
}