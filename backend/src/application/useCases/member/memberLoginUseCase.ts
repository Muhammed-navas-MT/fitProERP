import { Status } from "../../../domain/enums/status";
import { MemberError } from "../../../presentation/shared/constants/errorMessage/memberMessage";
import { ForbiddenException, NOtFoundException } from "../../constants/exceptions";
import {
  LoginRequestDTO,
  MemberLoginResponseDTO,
} from "../../dtos/auth/loginDto";
import { IMemberRepository } from "../../interfaces/repository/member/addMemberRepoInterface";
import { IHashService } from "../../interfaces/service/hashServiceInterface";
import { IMemberLoginUseCase } from "../../interfaces/useCase/member/memberLoginUseCaseInterface";
import { IGymAdminRepository } from "../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { LoginMapper } from "../../mappers/loginMapper";

export class MemberLoginUseCase implements IMemberLoginUseCase {
  constructor(
    private readonly memberRepository: IMemberRepository,
    private readonly hashService: IHashService,
    private readonly gymAdminRepository: IGymAdminRepository
  ) {}

  async login(
    data: LoginRequestDTO
  ): Promise<MemberLoginResponseDTO> {
    const member = await this.memberRepository.findByEmail(data.email);

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

    const isPasswordValid = await this.hashService.compare(
      data.password,
      member.password
    );

    if (!isPasswordValid) {
      throw new ForbiddenException(MemberError.INVALID_CREDENTIALS);
    }

    if (member.status !== Status.ACTIVE) {
      throw new ForbiddenException(MemberError.MEMBER_BLOCKED);
    }

    return LoginMapper.memberLoginMapper(
      member,
      gym.subdomain
    );
  }
}
