import { Status } from "../../../../domain/enums/status";
import { EmailPayloadType } from "../../../../domain/type/emailPayload";
import { MemberError, MemberSuccess } from "../../../../presentation/shared/constants/errorMessage/memberMessage";
import { TrainerError } from "../../../../presentation/shared/constants/errorMessage/trainerMessage";
import { AlreadyExistException, ForbiddenException, NOtFoundException } from "../../../constants/exceptions";
import { IAddMemberDTO } from "../../../dtos/auth/memberDto";
import { IGymAdminRepository } from "../../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { IBranchRepository } from "../../../interfaces/repository/gymAdmin/branchRepoInterface";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { ITrainerRepository } from "../../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { IHashService } from "../../../interfaces/service/hashServiceInterface";
import { IEmailService } from "../../../interfaces/service/IEmail/emailServiceInterface";
import { ISendPasswordEmailContentGenerator } from "../../../interfaces/service/IEmail/sendPasswordEmailContentGenerator";
import { IPasswordGenerator } from "../../../interfaces/service/passwordGenerator";
import { ICreateMemberUseCase } from "../../../interfaces/useCase/gymAdmin/memberManagement/createMemberUseCaseInterface";
import { MemberMapper } from "../../../mappers/memeberMapper";
import { BranchStatus } from "../../../../domain/enums/branchStatus";

export class CreateMemberUseCase implements ICreateMemberUseCase {
  private _hashService: IHashService;
  private _memberRepository: IMemberRepository;
  private _emailService: IEmailService;
  private _generatePassword: IPasswordGenerator;
  private _sendPasswordTemplateGenerator: ISendPasswordEmailContentGenerator;
  private _trainerRepository: ITrainerRepository;
  private _gymAdminRepository: IGymAdminRepository;
  private _branchRepository: IBranchRepository; 

  constructor(
    memberRepository: IMemberRepository,
    hashService: IHashService,
    emailService: IEmailService,
    generatePassword: IPasswordGenerator,
    sendPasswordTemplateGenerator: ISendPasswordEmailContentGenerator,
    gymAdminRepository: IGymAdminRepository,
    trainerRepository: ITrainerRepository,
    branchRepository: IBranchRepository 
  ) {
    this._hashService = hashService;
    this._memberRepository = memberRepository;
    this._emailService = emailService;
    this._generatePassword = generatePassword;
    this._sendPasswordTemplateGenerator = sendPasswordTemplateGenerator;
    this._gymAdminRepository = gymAdminRepository;
    this._trainerRepository = trainerRepository;
    this._branchRepository = branchRepository;
  }

  async createMember(data: IAddMemberDTO): Promise<void> {
    try {
      const findMember = await this._memberRepository.findByEmail(data.email);
      if (findMember) {
        throw new AlreadyExistException(MemberError.EMAIL_ALREADY_EXISTS);
      }

      const trainer = await this._trainerRepository.findById(data.trainerId);
      if (!trainer) {
        throw new NOtFoundException(MemberError.TRAINER_NOT_FOUND);
      }
      if (trainer.status !== Status.ACTIVE) {
        throw new ForbiddenException(TrainerError.ACCOUNT_BLOCKED);
      }

      const gym = await this._gymAdminRepository.findById(trainer.gymId);
      if (!gym) {
        throw new NOtFoundException(MemberError.GYM_NOT_FOUND);
      }
      if (gym.status !== Status.ACTIVE) {
        throw new ForbiddenException(MemberError.GYM_NOT_ACTIVE);
      }

      if (data.branchId) {
        const branch = await this._branchRepository.findById(data.branchId);
        if (!branch || branch.gymId.toString() !== gym._id?.toString()) {
          throw new NOtFoundException(MemberError.BRANCH_NOT_FOUND);
        }
        if (branch.status !== BranchStatus.ACTIVE) {
          throw new ForbiddenException(MemberError.BRANCH_BLOCK);
        }
      }

      const password = await this._generatePassword.generate();
      console.log(password)
      const hashPassword = await this._hashService.hash(password);

      const newMember = MemberMapper.toMemberEntity(
        data,
        trainer.gymId,
        hashPassword,
        data.branchId
      );

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
}
