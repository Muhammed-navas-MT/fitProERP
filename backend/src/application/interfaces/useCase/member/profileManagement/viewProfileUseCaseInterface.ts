import { MemberDetailDto } from "../../../../dtos/memberDto/listAllMembersDto";

export interface IViewProfileUseCase {
  execute(memberId: string): Promise<MemberDetailDto>;
}
