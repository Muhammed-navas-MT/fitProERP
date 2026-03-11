import {
  ListLeavesRequestDto,
  ListLeavesResponseDto,
} from "../../../dtos/shared/leaveDto";
import { ILeaveRepository } from "../../../interfaces/repository/shared/leaveRepoInterface";
import { IListAllLeavesUseCase } from "../../../interfaces/useCase/trainer/leaveManagement/listAllLeavesUseCaseInterface";
import { LeaveMapper } from "../../../mappers/trainer/leaveMapper";

export class ListAllLeaveUseCase implements IListAllLeavesUseCase {
  constructor(private _leaveRepository: ILeaveRepository) {}
  async execute(
    params: ListLeavesRequestDto,
    trainerId: string,
  ): Promise<ListLeavesResponseDto> {
    const { leaves, total } =
      await this._leaveRepository.findAllLeavesByTrainerId(params, trainerId);

    const response = LeaveMapper.toListAllLeavesDto(params, leaves, total);

    return response;
  }
}
