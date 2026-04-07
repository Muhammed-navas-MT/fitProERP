import { ProgressEntity } from "../../../../domain/entities/member/progressEntity";
import { IListProgressRequestDto } from "../../../dtos/memberDto/progressDto";
import { IBaseRepository } from "../base/baseRepo";

export interface IProgressRepository extends IBaseRepository<ProgressEntity> {
  listAllProgress(
    params: IListProgressRequestDto,
  ): Promise<{ progress: ProgressEntity[]; total: number }>;
  findProgressByMemberId(memberId: string): Promise<ProgressEntity[]>;
}
