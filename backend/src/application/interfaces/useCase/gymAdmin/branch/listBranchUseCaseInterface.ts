import { IListBranchRequestDTO, IListBranchResponseDTO } from "../../../../dtos/gymAdminDto/BranchDto";

export interface IListBranchUseCase {
    listBranch(params:IListBranchRequestDTO):Promise<IListBranchResponseDTO|null>
}