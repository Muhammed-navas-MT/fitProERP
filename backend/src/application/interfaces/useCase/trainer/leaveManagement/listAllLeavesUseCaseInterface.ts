import {
  ListLeavesRequestDto,
  ListLeavesResponseDto,
} from "../../../../dtos/shared/leaveDto";

export interface IListAllLeavesUseCase {
  execute(
    params: ListLeavesRequestDto,
    trainerId: string,
  ): Promise<ListLeavesResponseDto>;
}
