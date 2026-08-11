import { IMemberRepository } from "../../interfaces/repository/member/addMemberRepoInterface";
import { IMemberPackageExpiryUseCase } from "../../interfaces/useCase/member/memberPackageExpiryUseCaseInterface";

export class MemberPackageExpiryUseCase implements IMemberPackageExpiryUseCase {
  constructor(private _memberRepository: IMemberRepository) {}
  async execute(): Promise<void> {
    await this._memberRepository.updateExpiredMembers(new Date());
  }
}
