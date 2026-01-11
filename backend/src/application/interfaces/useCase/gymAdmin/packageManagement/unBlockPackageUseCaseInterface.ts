export interface IUnBlockPackageUseCase {
    execute(id:string):Promise<void>;
}