import { Status } from "../../../domain/enums/status";
import { MemberError } from "../../../presentation/shared/constants/errorMessage/memberMessage";
import { ForbiddenException, NOtFoundException, } from "../../constants/exceptions";
import { LoginRequestDTO, MemberLoginResponseDTO, } from "../../dtos/auth/loginDto";
import { IMemberRepository } from "../../interfaces/repository/member/addMemberRepoInterface";
import { IHashService } from "../../interfaces/service/hashServiceInterface";
import { IMemberLoginUseCase } from "../../interfaces/useCase/member/memberLoginUseCaseInterface";
import { IGymAdminRepository } from "../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { LoginMapper } from "../../mappers/loginMapper";

export class MemberLoginUseCase implements IMemberLoginUseCase {
  private _memberRepository: IMemberRepository;
  private _hashService: IHashService;
  private _gymAdminRepository: IGymAdminRepository;

  constructor(
    memberRepository: IMemberRepository,
    hashService: IHashService,
    gymAdminRepository: IGymAdminRepository
  ) {
    this._memberRepository = memberRepository;
    this._hashService = hashService;
    this._gymAdminRepository = gymAdminRepository;
  }

  async login(data: LoginRequestDTO): Promise<MemberLoginResponseDTO> {
    try {
      const member = await this._memberRepository.findByEmail(data.email);
      if (!member) {
        throw new NOtFoundException(MemberError.MEMBER_NOT_FOUND);
      }
      const gym = await this._gymAdminRepository.findById(member.gymId);
      if (!gym) {
        throw new NOtFoundException(MemberError.GYM_NOT_FOUND);
      }
      const isPasswordValid = this._hashService.compare(
        data.password,
        member.password || ""
      );
      if (!isPasswordValid) {
        throw new ForbiddenException(MemberError.INVALID_CREDENTIALS);
      }
      if (gym.status !== Status.ACTIVE) {
        throw new ForbiddenException(MemberError.GYM_NOT_ACTIVE);
      }
      if (member.status === Status.BLOCKED) {
        throw new ForbiddenException(MemberError.MEMBER_BLOCKED);
      }
      if (member.status !== Status.ACTIVE) {
        throw new ForbiddenException(MemberError.MEMBER_BLOCKED);
      }
      const response = LoginMapper.memberLoginMapper(member,gym.subdomain);

      return response;
    } catch (error) {
      throw error;
    }
  }
}
