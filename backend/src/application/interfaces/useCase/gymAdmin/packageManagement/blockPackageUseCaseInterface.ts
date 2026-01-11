export interface IBlockPackageUseCase {
    execute(id:string):Promise<void>;
}