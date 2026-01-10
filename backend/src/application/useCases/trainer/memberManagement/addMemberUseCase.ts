import {
  MemberError,
  MemberSuccess,
} from "../../../../presentation/shared/constants/errorMessage/memberMessage";
import {
  AlreadyExistException,
  NOtFoundException,
  ForbiddenException,
} from "../../../constants/exceptions";
import { IAddMemberDTO } from "../../../dtos/auth/memberDto";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { IHashService } from "../../../interfaces/service/hashServiceInterface";
import { IEmailService } from "../../../interfaces/service/IEmail/emailServiceInterface";
import { IPasswordGenerator } from "../../../interfaces/service/passwordGenerator";
import { IAddMemberUseCase } from "../../../interfaces/useCase/trainer/addMemberUseCaseInterface";
import { EmailPayloadType } from "../../../../domain/type/emailPayload";
import { ISendPasswordEmailContentGenerator } from "../../../interfaces/service/IEmail/sendPasswordEmailContentGenerator";
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

export class AddMemberUseCase implements IAddMemberUseCase {
  private _hashService: IHashService;
  private _memberRepository: IMemberRepository;
  private _emailService: IEmailService;
  private _generatePassword: IPasswordGenerator;
  private _sendPasswordTemplateGenerator: ISendPasswordEmailContentGenerator;
  private _trainerRepository: ITrainerRepository;
  private _gymAdminRepository: IGymAdminRepository;

  constructor(
    memberRepository: IMemberRepository,
    hashService: IHashService,
    emailService: IEmailService,
    generatePassword: IPasswordGenerator,
    sendPasswordTemplateGenerator: ISendPasswordEmailContentGenerator,
    gymAdminRepository: IGymAdminRepository,
    trainerRepository: ITrainerRepository
  ) {
    this._hashService = hashService;
    this._memberRepository = memberRepository;
    this._emailService = emailService;
    this._generatePassword = generatePassword;
    this._sendPasswordTemplateGenerator = sendPasswordTemplateGenerator;
    this._gymAdminRepository = gymAdminRepository;
    this._trainerRepository = trainerRepository;
  }

  async signUp(data: IAddMemberDTO): Promise<void> {
    try {
      const findMember = await this._memberRepository.findByEmail(data.email);
      if (findMember) {
        throw new AlreadyExistException(MemberError.EMAIL_ALREADY_EXISTS);
      }

      const findTrainer = await this._trainerRepository.findById(data.trainerId);
      if(findTrainer?.status !== Status.ACTIVE){
        throw new ForbiddenException(TrainerError.ACCOUNT_BLOCKED)
      };

      const gym = await this._gymAdminRepository.findById(findTrainer.gymId);
      if (!gym) {
        throw new NOtFoundException(MemberError.GYM_NOT_FOUND);
      }
      if (gym.status !== Status.ACTIVE) {
        throw new ForbiddenException(MemberError.GYM_NOT_ACTIVE);
      }

      const trainer = await this._trainerRepository.findById(data.trainerId);
      if (!trainer) {
        throw new NOtFoundException(MemberError.TRAINER_NOT_FOUND);
      }
      if (gym.status !== Status.ACTIVE) {
        throw new ForbiddenException(MemberError.TRAINER_NOT_ACTIVE);
      }
      const password = await this._generatePassword.generate();
      console.log(password,"member")
      const hashPassword = await this._hashService.hash(password);
      const branchId = trainer.branchId || "";
      const newMember = MemberMapper.toMemberEntity(data,findTrainer.gymId,hashPassword,branchId)
      await this._memberRepository.create(newMember);

      const htmlContent = this._sendPasswordTemplateGenerator.generateHtml({
        loginUrl: `http://${gym.subdomain}.localhost:5173/member/login`,
        password,
        name: data.name,
        gymName: gym.gymName,
      });
      const payload: EmailPayloadType = {
        recieverMailId: data.email,
        subject: MemberSuccess.PASSWORD_SENT_MESSAGE,
        content: htmlContent,
      };
      await this._emailService.sendEmail(payload);
    } catch (error) {
      throw error;
    }
  }

  async listAllTrainers(
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

      const { members, total } = await this._memberRepository.listAllMembers( params,findGym._id );

      const response = MemberMapper.toListMemebersResponse(members,total,params);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
