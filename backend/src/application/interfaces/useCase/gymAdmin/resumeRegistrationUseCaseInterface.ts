import { IRegistrationResponseDTO } from "../../../dtos/auth/verifyOtpDto";

export interface IResumeRegistrationUseCase {
  execute(signupId: string): Promise<IRegistrationResponseDTO>;
}
