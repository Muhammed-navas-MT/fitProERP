export interface IBlockMemberUseCase {
    blockMember(memberId:string):Promise<void>
}