import { MemberError, MemberSuccess } from "../../../presentation/shared/constants/errorMessage/memberMessage";
import { AlreadyExistException,NOtFoundException,ForbiddenException } from "../../constants/exceptions";
import { IAddMemberDTO } from "../../dtos/auth/memberDto";
import { IMemberRepository } from "../../interfaces/repository/member/addMemberRepoInterface";
import { IHashService } from "../../interfaces/service/hashServiceInterface";
import { IEmailService } from "../../interfaces/service/IEmail/emailServiceInterface";
import { IPasswordGenerator } from "../../interfaces/service/passwordGenerator";
import { IAddMemberUseCase } from "../../interfaces/useCase/trainer/addMemberUseCaseInterface";
import { EmailPayloadType } from "../../../domain/type/emailPayload";
import { ISendPasswordEmailContentGenerator } from "../../interfaces/service/IEmail/sendPasswordEmailContentGenerator";
import { IGymAdminRepository } from "../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { ITrainerRepository } from "../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { Status } from "../../../domain/enums/status";

export class AddMemberUseCase implements IAddMemberUseCase {
    private _hashService:IHashService;
    private _memberRepository:IMemberRepository;
    private _emailService:IEmailService;
    private _generatePassword:IPasswordGenerator;
    private _sendPasswordTemplateGenerator:ISendPasswordEmailContentGenerator;
    private _trainerRepository:ITrainerRepository;
    private _gymAdminRepository:IGymAdminRepository;

    constructor(
        memberRepository:IMemberRepository,
        hashService:IHashService,
        emailService:IEmailService,
        generatePassword:IPasswordGenerator,
        sendPasswordTemplateGenerator:ISendPasswordEmailContentGenerator,
        gymAdminRepository: IGymAdminRepository,
        trainerRepository: ITrainerRepository,
    ) {
        this._hashService = hashService;
        this._memberRepository = memberRepository;
        this._emailService = emailService;
        this._generatePassword = generatePassword;
        this._sendPasswordTemplateGenerator = sendPasswordTemplateGenerator;
        this._gymAdminRepository = gymAdminRepository;
        this._trainerRepository = trainerRepository;
    };

    async signUp(data: IAddMemberDTO): Promise<void> {
       try {
        const findMember = await this._memberRepository.findByEmail(data.email);
        if(findMember){
            throw new AlreadyExistException(MemberError.EMAIL_ALREADY_EXISTS);
        };

        const gym = await this._gymAdminRepository.findById(data.gymId);
        if (!gym) {
            throw new NOtFoundException(MemberError.GYM_NOT_FOUND);
        };
        if (gym.status !== Status.ACTIVE) {
        throw new ForbiddenException(MemberError.GYM_NOT_ACTIVE);
        }

        const trainer = await this._trainerRepository.findById(data.trainerId);
        if (!trainer) {
            throw new NOtFoundException(MemberError.TRAINER_NOT_FOUND);
        };
        if (gym.status !== Status.ACTIVE) {
        throw new ForbiddenException(MemberError.TRAINER_NOT_ACTIVE);
        }

        const password = await this._generatePassword.generate();
        data.password = await this._hashService.hash(password);
        await this._memberRepository.create(data);

        const htmlContent = this._sendPasswordTemplateGenerator.generateHtml({loginUrl:`http://${gym.subdomain}.localhost:3000/member/login`,password,name:data.firstName,gymName:gym.gymName})
        const payload:EmailPayloadType = {
            recieverMailId:data.email,
            subject:MemberSuccess.PASSWORD_SENT_MESSAGE,
            content:htmlContent
        };
        await this._emailService.sendEmail(payload);

       } catch (error) {
        throw error
       }
    }
}