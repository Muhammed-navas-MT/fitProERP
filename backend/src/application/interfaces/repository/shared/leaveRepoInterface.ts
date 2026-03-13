import { ITrainerLeaveEntity } from "../../../../domain/entities/gymAdmin/TrainerLeaveEntity";
import {
  PopulateListTrainerLeaves,
  PopulateTrainerLeave,
} from "../../../../infrastructure/repository/databaseConfigs/types/populateLeaveType";
import {
  ListLeavesRequestDto,
  ListTrainersLeavesRequestDto,
} from "../../../dtos/shared/leaveDto";
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
  findAllLeavesByGymId(
    params: ListTrainersLeavesRequestDto,
    gymId: string,
  ): Promise<{ leaves: PopulateListTrainerLeaves[]; total: number }>;
  findTrainerLeaveDetail(leaveId: string): Promise<PopulateTrainerLeave>;
}
