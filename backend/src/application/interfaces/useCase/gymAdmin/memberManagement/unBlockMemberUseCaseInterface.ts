export interface IUnBlockMemberUseCase {
    unBlockMember(memberId:string):Promise<void>
}