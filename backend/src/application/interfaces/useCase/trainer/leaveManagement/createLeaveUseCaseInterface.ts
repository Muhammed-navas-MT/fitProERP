import { CreateLeaveRequestDto } from "../../../../dtos/shared/leaveDto";

export interface ICreateLeaveUseCase {
  execute(data: CreateLeaveRequestDto): Promise<void>;
}
