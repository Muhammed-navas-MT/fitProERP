import { FindLeaveResponseDto } from "../../../../dtos/shared/leaveDto";

export interface IFindLeaveUseCase {
  execute(id: string): Promise<FindLeaveResponseDto>;
}
