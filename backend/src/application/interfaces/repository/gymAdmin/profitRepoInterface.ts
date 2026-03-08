import { IGymAdminProfitEntity } from "../../../../domain/entities/gymAdmin/profitEntiry";
import { IFindProfitRequestDto } from "../../../dtos/gymAdminDto/profitDto";
import { IBaseRepository } from "../base/baseRepo";

export interface IProfitRepository extends IBaseRepository<IGymAdminProfitEntity> {
  findProfitByPeriod(
    params: IFindProfitRequestDto,
  ): Promise<IGymAdminProfitEntity | null>;
}
