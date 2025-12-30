export interface IUnBlockBranchUseCase {
    unBlockBranch(id:string):Promise<void>;
}