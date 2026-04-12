import {
  SavePaymentMethodDto,
  SavePaymentMethodResponseDto,
} from "../../../../dtos/trainerDto/salaryDtos";

export interface ISaveBillingPaymentMethodUseCase {
  execute(data: SavePaymentMethodDto): Promise<SavePaymentMethodResponseDto>;
}
