import { AssignedTrainerResponseDto } from "../../../../dtos/auth/trainerDto";

export interface IFindAssignedTrainerUseCase {
  execute(memberId: string): Promise<AssignedTrainerResponseDto>;
}
