import {
  SaveBillingEmailDto,
  SaveBillingEmailResponseDto,
} from "../../../../dtos/trainerDto/salaryDtos";

export interface ISaveBillingEmailUseCase {
  execute(data: SaveBillingEmailDto): Promise<SaveBillingEmailResponseDto>;
}
