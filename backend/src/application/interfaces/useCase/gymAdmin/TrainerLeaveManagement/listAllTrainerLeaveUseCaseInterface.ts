import {
  ListTrainerLeavesResponseDto,
  ListTrainersLeavesRequestDto,
} from "../../../../dtos/shared/leaveDto";

export interface IListAllTrainerLeaveUseCase {
  execute(
    params: ListTrainersLeavesRequestDto,
    gymId: string,
  ): Promise<ListTrainerLeavesResponseDto>;
}
