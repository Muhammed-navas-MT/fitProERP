import { IGymInfoRequestDTO } from "../../../dtos/auth/verifyOtpDto";

export interface IGymInformationUseCase {
  execute(data: IGymInfoRequestDTO): Promise<void>;
}
