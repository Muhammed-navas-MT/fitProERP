import { Status } from "../../../domain/enums/status";
import { MemberError } from "../../../presentation/shared/constants/errorMessage/memberMessage";
import {
  BadRequestException,
  ForbiddenException,
  NOtFoundException,
} from "../../constants/exceptions";
import { MemberLoginResponseDTO } from "../../dtos/auth/loginDto";
import { IMemberRepository } from "../../interfaces/repository/member/addMemberRepoInterface";
import { IGymAdminRepository } from "../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { IGoogleAuthService } from "../../interfaces/service/googleAuthServiceInterface";
import { IGoogleLoginUseCase } from "../../interfaces/useCase/member/googleLoginUseCaseInterface";
import { LoginMapper } from "../../mappers/loginMapper";

export class GoogleLoginUseCase implements IGoogleLoginUseCase {
  constructor(
    private readonly memberRepository: IMemberRepository,
    private readonly googleAuthService: IGoogleAuthService,
    private readonly gymAdminRepository: IGymAdminRepository,
  ) {}

  async execute(token: string): Promise<MemberLoginResponseDTO> {
    const googleUser = await this.googleAuthService.verifyToken(token);

    if (!googleUser.email) {
      throw new BadRequestException(MemberError.EMAIL_INVALID_TYPE);
    }

    if (!googleUser.emailVerified) {
      throw new BadRequestException("Google email is not verified");
    }

    const member = await this.memberRepository.findByEmail(googleUser.email);

    if (!member) {
      throw new NOtFoundException(MemberError.MEMBER_NOT_FOUND);
    }

    const gym = await this.gymAdminRepository.findById(member.gymId);

    if (!gym) {
      throw new NOtFoundException(MemberError.GYM_NOT_FOUND);
    }

    if (gym.status !== Status.ACTIVE) {
      throw new ForbiddenException(MemberError.GYM_NOT_ACTIVE);
    }

    if (member.status === Status.BLOCKED) {
      throw new ForbiddenException(MemberError.MEMBER_BLOCKED);
    }

    return LoginMapper.memberLoginMapper(member, gym.subdomain);
  }
}
