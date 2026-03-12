import { ITrainerLeaveEntity } from "../../../domain/entities/gymAdmin/TrainerLeaveEntity";
import { LeaveStatus } from "../../../domain/enums/leaveStatus";
import {
  CreateLeaveRequestDto,
  FindLeaveResponseDto,
  ListLeavesRequestDto,
  ListLeavesResponseDto,
} from "../../dtos/shared/leaveDto";

export class LeaveMapper {
  static toLeaveEntity(
    data: CreateLeaveRequestDto,
    gymId: string,
  ): ITrainerLeaveEntity {
    return {
      gymId,
      trainerId: data.trainerId,
      appliedDate: new Date(),
      startDate: data.startDate,
      endDate: data.endDate,
      reason: data.reason,
      status: LeaveStatus.PENDING,
    };
  }
  static toLeaveReponseDto(data: ITrainerLeaveEntity): FindLeaveResponseDto {
    return {
      id: data._id?.toString() as string,
      startDate: data.startDate,
      endDate: data.endDate,
      appliedDate: data.appliedDate,
      reason: data.reason,
      status: data.status,
    };
  }

  static toListAllLeavesDto(
    params: ListLeavesRequestDto,
    leaves: ITrainerLeaveEntity[],
    total: number,
  ): ListLeavesResponseDto {
    return {
      page: params.page,
      limit: params.limit,
      search: params.search,
      status: params.status,
      total,
      totalPages: Math.ceil(total / params.limit),
      leaves: leaves.map((leave) => {
        return {
          id: leave._id?.toString() as string,
          startDate: leave.startDate,
          endDate: leave.endDate,
          appliedDate: leave.appliedDate,
          reason: leave.reason,
          status: leave.status,
        };
      }),
    };
  }
}
