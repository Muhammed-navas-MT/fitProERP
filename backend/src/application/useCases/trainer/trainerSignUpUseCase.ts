import {
  AlreadyExistException,
  ForbiddenException,
  NOtFoundException,
} from "../../constants/exceptions";
import { IHashService } from "../../interfaces/service/hashServiceInterface";
import { ITrainerRepository } from "../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { ISingupTrainerUseCase } from "../../interfaces/useCase/trainer/signUpUseCaseInterface";
import { ITrainerSignUpRequestDTO } from "../../dtos/auth/trainerDto";
import { TrainerError } from "../../../presentation/shared/constants/errorMessage/trainerMessage";
import { IPasswordGenerator } from "../../interfaces/service/passwordGenerator";
import { IEmailService } from "../../interfaces/service/IEmail/emailServiceInterface";
import { EmailPayloadType } from "../../../domain/type/emailPayload";
import { ISendPasswordEmailContentGenerator } from "../../interfaces/service/IEmail/sendPasswordEmailContentGenerator";
import { IGymAdminRepository } from "../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { Status } from "../../../domain/enums/status";
import { IListTrainerRequestDTO, IListTrainerResponseDTO } from "../../dtos/trainerDto/listAllTrainerDto";
import { TrainerMapper } from "../../mappers/trainerMapper";

export class SingupTrainerUseCase implements ISingupTrainerUseCase {
  private _trainerRepository: ITrainerRepository;
  private _hashService: IHashService;
  private _passwordGenerator: IPasswordGenerator;
  private _emailService: IEmailService;
  private _sendPasswordEmailContentGenerator: ISendPasswordEmailContentGenerator;
  private _gymAdminRepository: IGymAdminRepository;

  constructor(
    trainerRepository: ITrainerRepository,
    hashService: IHashService,
    passwordGenerator: IPasswordGenerator,
    emailService: IEmailService,
    gymAdminRepository: IGymAdminRepository,
    sendPasswordEmailContentGenerator: ISendPasswordEmailContentGenerator
  ) {
    this._trainerRepository = trainerRepository;
    this._hashService = hashService;
    this._passwordGenerator = passwordGenerator;
    this._emailService = emailService;
    this._gymAdminRepository = gymAdminRepository;
    this._sendPasswordEmailContentGenerator = sendPasswordEmailContentGenerator;
  }
  async signUp(data: ITrainerSignUpRequestDTO): Promise<void> {
    try {
      const findTrainer = await this._trainerRepository.findByEmail(data.email);
      if (findTrainer) {
        throw new AlreadyExistException(TrainerError.EMAIL_ALREADY_EXISTS);
      }
      const gym = await this._gymAdminRepository.findById(data.gymId);
      if (!gym) {
        throw new NOtFoundException(TrainerError.GYM_NOT_FOUND);
      }
      if (gym.status !== Status.ACTIVE) {
        throw new ForbiddenException(TrainerError.GYM_NOT_ACTIVE);
      }

      const password = await this._passwordGenerator.generate();
      console.log(password, "fordsfsda");
      const hashPassword = await this._hashService.hash(password);
      await this._trainerRepository.create({ ...data, password: hashPassword });

      const htmlContent = this._sendPasswordEmailContentGenerator.generateHtml({
        loginUrl: `http://${gym.subdomain}.localhost:5173/trainer/login`,
        password,
        name: data.name,
        gymName: gym.gymName,
      });
      const payload: EmailPayloadType = {
        recieverMailId: data.email,
        subject: "Trainer Created Successfully",
        content: htmlContent,
      };
      await this._emailService.sendEmail(payload);
    } catch (error) {
      throw error;
    }
  }
  async listAllTrainers(params: IListTrainerRequestDTO): Promise<IListTrainerResponseDTO | null> {
      let {trainers,total} = await this._trainerRepository.listAllTrainers(params);
      const response:IListTrainerResponseDTO = TrainerMapper.toListTrainersResponse(trainers,total,params);
      return response;
  }
}
