import {
  ListTrainersLeavesRequestDto,
  ListTrainerLeavesResponseDto,
} from "../../../dtos/shared/leaveDto";
import { ILeaveRepository } from "../../../interfaces/repository/shared/leaveRepoInterface";
import { IListAllTrainerLeaveUseCase } from "../../../interfaces/useCase/gymAdmin/TrainerLeaveManagement/listAllTrainerLeaveUseCaseInterface";
import { LeaveMapper } from "../../../mappers/trainer/leaveMapper";

export class ListAllTrainerLeaveUseCase implements IListAllTrainerLeaveUseCase {
  constructor(private _leaveRepository: ILeaveRepository) {}
  async execute(
    params: ListTrainersLeavesRequestDto,
    gymId: string,
  ): Promise<ListTrainerLeavesResponseDto> {
    const { leaves, total } = await this._leaveRepository.findAllLeavesByGymId(
      params,
      gymId,
    );
    const response = LeaveMapper.toListTrainerLeaves(params, leaves, total);
    return response;
  }
}
