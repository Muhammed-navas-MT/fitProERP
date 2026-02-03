export interface IUpdateMemberUseCase {
    updateMember(memeber:{trainerId:string,branchId:string},memberId:string):Promise<boolean>
}