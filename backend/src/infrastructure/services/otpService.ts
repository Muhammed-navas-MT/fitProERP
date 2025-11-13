import { IOtpService } from "../../application/interfaces/service/otpServiceInterface";

export class OtpService implements IOtpService {
    generateOtp(): string {
        return Math.floor(Math.random()*900000+100000).toString();
    }
}