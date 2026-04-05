import { ITrainerLeaveEntity } from "../../../domain/entities/gymAdmin/TrainerLeaveEntity";
import { LeaveStatus } from "../../../domain/enums/leaveStatus";
import {
  PopulateListTrainerLeaves,
  PopulateTrainerLeave,
} from "../../../infrastructure/repository/databaseConfigs/types/populateLeaveType";
import {
  CreateLeaveRequestDto,
  FindLeaveResponseDto,
  FindTrainerLeaveResponseDto,
  ListLeavesRequestDto,
  ListLeavesResponseDto,
  ListTrainerLeavesResponseDto,
  ListTrainersLeavesRequestDto,
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
      leaveCount: calculateLeaveDays(data.startDate, data.endDate),
      reason: data.reason,
      status: LeaveStatus.PENDING,
    };
  }
  static toLeaveReponseDto(data: ITrainerLeaveEntity): FindLeaveResponseDto {
    return {
      id: data._id?.toString() as string,
      startDate: data.startDate,
      endDate: data.endDate,
      leaveCount: data.leaveCount,
      appliedDate: data.appliedDate,
      reason: data.reason,
      status: data.status,
    };
  }

  static toListAllLeavesDto(
    params: ListLeavesRequestDto,
    leaves: ITrainerLeaveEntity[],
    total: number,
    isExided: boolean,
    summary: {
      allocatedLeavesThisMonth: number;
      usedLeavesThisMonth: number;
      extraLeavesTaken: number;
    },
    exidedmessage?: string,
  ): ListLeavesResponseDto {
    return {
      page: params.page,
      limit: params.limit,
      search: params.search,
      status: params.status,
      total,
      totalPages: Math.ceil(total / params.limit),
      isExided,
      exidedmessage,
      leaves: leaves.map((leave) => {
        return {
          id: leave._id?.toString() as string,
          startDate: leave.startDate,
          endDate: leave.endDate,
          leaveCount: leave.leaveCount,
          appliedDate: leave.appliedDate,
          reason: leave.reason,
          status: leave.status,
        };
      }),
      summary,
    };
  }

  static toTrainerLeaveDetailDto(
    leave: PopulateTrainerLeave,
    isExided: boolean,
    Exidedmessage?: string,
  ): FindTrainerLeaveResponseDto {
    return {
      id: leave._id.toString(),
      appliedDate: leave.appliedDate,
      branchDetail: {
        branchName: leave.branchDetail.branchName,
        city: leave.branchDetail.address.city,
        pincode: leave.branchDetail.address.pincode,
      },
      endDate: leave.endDate,
      leaveCount: leave.leaveCount,
      reason: leave.reason,
      startDate: leave.startDate,
      status: leave.status,
      trainerDetail: {
        email: leave.trainerDetail.email,
        name: leave.trainerDetail.name,
      },
      rejectionReason: leave.rejectionReason,
      isExided,
      Exidedmessage,
    };
  }

  static toListTrainerLeaves(
    params: ListTrainersLeavesRequestDto,
    leaves: PopulateListTrainerLeaves[],
    total: number,
  ): ListTrainerLeavesResponseDto {
    return {
      limit: params.limit,
      page: params.page,
      search: params.search,
      total,
      totalPages: Math.ceil(total / params.limit),
      leaves: leaves.map((leave) => {
        return {
          id: leave._id.toString(),
          appliedDate: leave.appliedDate,
          branchDetail: {
            branchName: leave.branchDetail.branchName,
            city: leave.branchDetail.address.city,
            pincode: leave.branchDetail.address.pincode,
          },
          endDate: leave.endDate,
          leaveCount: leave.leaveCount,
          reason: leave.reason,
          startDate: leave.startDate,
          status: leave.status,
          trainerDetail: {
            email: leave.trainerDetail.email,
            name: leave.trainerDetail.name,
          },
        };
      }),
    };
  }
}

export const calculateLeaveDays = (startDate: Date, endDate: Date): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const diffTime = end.getTime() - start.getTime();

  return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
};
