export interface IBlockBranchUseCase {
    blockBranch(id:string):Promise<void>;
}