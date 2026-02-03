export interface IUnBlockMemberUseCase {
    unBlockMember(memberId:string):Promise<string>
}