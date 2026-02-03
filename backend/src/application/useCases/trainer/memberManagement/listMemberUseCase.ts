import {
  NOtFoundException,
  ForbiddenException,
} from "../../../constants/exceptions";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { IGymAdminRepository } from "../../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { ITrainerRepository } from "../../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { Status } from "../../../../domain/enums/status";
import {
  IListMemberRequestDTO,
  IListMemberResponseDTO,
} from "../../../dtos/memberDto/listAllMembersDto";
import { GymAdminAuthError } from "../../../../presentation/shared/constants/errorMessage/gymAdminAuthError";
import { TrainerError } from "../../../../presentation/shared/constants/errorMessage/trainerMessage";
import { MemberMapper } from "../../../mappers/memeberMapper";
import { IListMemberUseCase } from "../../../interfaces/useCase/trainer/memberManagement/listMemberUseCaseInterface";

export class ListAllMembers implements IListMemberUseCase {
  private _memberRepository: IMemberRepository;
  private _trainerRepository: ITrainerRepository;
  private _gymAdminRepository: IGymAdminRepository;

  constructor(
    memberRepository: IMemberRepository,
    gymAdminRepository: IGymAdminRepository,
    trainerRepository: ITrainerRepository
  ) {
    this._memberRepository = memberRepository;
    this._gymAdminRepository = gymAdminRepository;
    this._trainerRepository = trainerRepository;
  }

  async listAllMembers(
    params: IListMemberRequestDTO
  ): Promise<IListMemberResponseDTO | null> {
    try {
      const findTrainer = await this._trainerRepository.findById( params.trainerId );
      if (!findTrainer) {
        throw new NOtFoundException(TrainerError.TRAINER_NOT_FOUND);
      }
      if (findTrainer.status === Status.IN_ACTIVE) {
        throw new ForbiddenException(GymAdminAuthError.GYM_NOT_ACTIVE);
      }
      const findGym = await this._gymAdminRepository.findById(
        findTrainer.gymId
      );
      if (!findGym) {
        throw new NOtFoundException(GymAdminAuthError.GYM_NOT_FOUND);
      }
      if (findGym.status !== Status.ACTIVE) {
        throw new ForbiddenException(GymAdminAuthError.GYM_NOT_ACTIVE);
      }
      if (!findGym._id) {
        throw new NOtFoundException(GymAdminAuthError.GYM_NOT_FOUND);
      }

      const { members, total,assignMemberCount,activeMembersCount } = await this._memberRepository.listAllMembersByBranchId( params,findTrainer.branchId as string,params.trainerId );

      const response = MemberMapper.toListMemebersResponse(members,total,params,activeMembersCount,assignMemberCount);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
