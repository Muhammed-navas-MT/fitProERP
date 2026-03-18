import {
  ListAllSessionsRequestDto,
  ListAllSessionsResponseDto,
} from "../../../../dtos/memberDto/slotAndBookingDto";

export interface IListAllSessionsUseCase {
  execute(
    params: ListAllSessionsRequestDto,
  ): Promise<ListAllSessionsResponseDto>;
}
