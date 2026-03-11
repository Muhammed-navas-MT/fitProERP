import { ITrainerLeaveEntity } from "../../../../domain/entities/gymAdmin/TrainerLeaveEntity";
import { ListLeavesRequestDto } from "../../../dtos/shared/leaveDto";
import { IBaseRepository } from "../base/baseRepo";

export interface ILeaveRepository extends IBaseRepository<ITrainerLeaveEntity> {
  findOverlappingLeave(
    trainerId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<ITrainerLeaveEntity[]>;
  findAllLeavesByTrainerId(
    params: ListLeavesRequestDto,
    trainerId: string,
  ): Promise<{ leaves: ITrainerLeaveEntity[]; total: number }>;
}
