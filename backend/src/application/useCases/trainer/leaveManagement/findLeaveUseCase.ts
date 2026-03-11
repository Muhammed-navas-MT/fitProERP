import { LeaveError } from "../../../../presentation/shared/constants/messages/leaveMessages";
import { NOtFoundException } from "../../../constants/exceptions";
import { FindLeaveResponseDto } from "../../../dtos/shared/leaveDto";
import { ILeaveRepository } from "../../../interfaces/repository/shared/leaveRepoInterface";
import { IFindLeaveUseCase } from "../../../interfaces/useCase/trainer/leaveManagement/findLeaveUseCaseInterface";
import { LeaveMapper } from "../../../mappers/trainer/leaveMapper";

export class FindLeaveUseCase implements IFindLeaveUseCase {
  constructor(private _leaveRepository: ILeaveRepository) {}
  async execute(id: string): Promise<FindLeaveResponseDto> {
    const leave = await this._leaveRepository.findById(id);
    if (!leave) {
      throw new NOtFoundException(LeaveError.NOT_FOUND);
    }
    const response = LeaveMapper.toLeaveReponseDto(leave);
    return response;
  }
}
