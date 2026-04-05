import { MemberLoginResponseDTO } from "../../../dtos/auth/loginDto";

export interface IGoogleLoginUseCase {
  execute(token: string): Promise<MemberLoginResponseDTO>;
}
