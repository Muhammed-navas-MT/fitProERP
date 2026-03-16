import { DietPlanEntity } from "../../../../domain/entities/member/dietEntity";
import { IBaseRepository } from "../base/baseRepo";

export interface IDietPlanRepository extends IBaseRepository<DietPlanEntity> {
  findByMemberId(memberId: string): Promise<string>;
  findDiet(memberId: string): Promise<DietPlanEntity | null>;
}
