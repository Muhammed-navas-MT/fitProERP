import { FindTrainerLeaveResponseDto } from "../../../../dtos/shared/leaveDto";

export interface IFindTrainerLeaveUseCase {
  execute(leaveId: string): Promise<FindTrainerLeaveResponseDto>;
}
