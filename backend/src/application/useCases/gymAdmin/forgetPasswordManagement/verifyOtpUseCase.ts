import {
  InvalidOtpException,
  OtpExpiredException,
} from "../../../constants/exceptions";
import { ICacheService } from "../../../interfaces/service/cacheServiceInterface";
import { IVerifyGymAdminOtpUseCase } from "../../../interfaces/useCase/gymAdmin/forgetPasswordManagement/verifyOtpUseCaseInterface";

export class VerifyGymAdminOtpUseCase implements IVerifyGymAdminOtpUseCase {
  constructor(private cacheService: ICacheService) {}
  async execute(data: { email: string; otp: string }): Promise<void> {
    const cacheOtp = await this.cacheService.getData(data.email);
    if (!cacheOtp) {
      throw new OtpExpiredException("  Email data is missing from cache");
    }

    if (cacheOtp != data.otp) {
      throw new InvalidOtpException("Otp invalid");
    }
  }
}
