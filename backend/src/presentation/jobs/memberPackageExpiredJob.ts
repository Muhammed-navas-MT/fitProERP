import { IMemberPackageExpiryUseCase } from "../../application/interfaces/useCase/member/memberPackageExpiryUseCaseInterface";

export class MemberPackageExpiryJob {
  constructor(
    private _memberPackageExpiryUseCase: IMemberPackageExpiryUseCase,
  ) {}

  async execute(): Promise<void> {
    await this._memberPackageExpiryUseCase.execute();
  }
}
