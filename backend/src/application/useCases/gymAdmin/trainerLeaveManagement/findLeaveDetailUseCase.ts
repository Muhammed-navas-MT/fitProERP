import { LeaveError } from "../../../../presentation/shared/constants/messages/leaveMessages";
import { NOtFoundException } from "../../../constants/exceptions";
import { FindTrainerLeaveResponseDto } from "../../../dtos/shared/leaveDto";
import { ILeaveRepository } from "../../../interfaces/repository/shared/leaveRepoInterface";
import { IFindTrainerLeaveUseCase } from "../../../interfaces/useCase/gymAdmin/TrainerLeaveManagement/findLeaveDetailUseCaseInterface";
import { LeaveMapper } from "../../../mappers/trainer/leaveMapper";

export class FindTrainerLeaveUseCase implements IFindTrainerLeaveUseCase {
  constructor(private _leaveRepository: ILeaveRepository) {}

  async execute(leaveId: string): Promise<FindTrainerLeaveResponseDto> {
    const leave = await this._leaveRepository.findTrainerLeaveDetail(leaveId);
    if (!leave) {
      throw new NOtFoundException(LeaveError.NOT_FOUND);
    }
    const response = LeaveMapper.toTrainerLeaveDetailDto(leave);
    return response;
  }
}
