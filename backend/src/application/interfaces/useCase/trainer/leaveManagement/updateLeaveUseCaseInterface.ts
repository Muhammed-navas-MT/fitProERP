import { UpdateLeaveRequestDto } from "../../../../dtos/shared/leaveDto";

export interface IUpdateLeaveUseCase {
  execute(data: UpdateLeaveRequestDto, leaveId: string): Promise<void>;
}
