import { MemberDTO } from "../../../../dtos/memberDto/listAllMembersDto";

export interface IViewProfileUseCase {
  execute(memberId: string): Promise<MemberDTO>;
}