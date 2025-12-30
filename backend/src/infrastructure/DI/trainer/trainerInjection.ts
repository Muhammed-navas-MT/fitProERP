import { EmailService } from "../../services/IEmail/emailService";
import { TrainerRepository } from "../../repository/trainer/trainerRepo";
import { trainerModel } from "../../repository/databaseConfigs/models/trainerModel";
import { HashPassword } from "../../services/hashService";
import { AddMemberController } from "../../../presentation/controller/trainer/addMemberController";
import { AddMemberUseCase } from "../../../application/useCases/trainer/addMemberUseCase";
import { MemberRepository } from "../../repository/member/memberRepo";
import { memberModel } from "../../repository/databaseConfigs/models/memberModel";
import { PasswordGenerator } from "../../services/passwordGenerater";
import { SendPasswordEmailContentGenerator } from "../../services/IEmail/sendPasswordContentGenerator";
import { GymAdminRepository } from "../../repository/gymAdmin/gymAdminRepo";
import { gymAdminModel } from "../../repository/databaseConfigs/models/gymAdminModel";
import { TrainerLoginController } from "../../../presentation/controller/trainer/trainerLoginController";
import { TrainerLoginUseCase } from "../../../application/useCases/trainer/trainerLoginUseCase";
import { JwtService } from "../../services/jwtService";

const emailService = new EmailService()
const hashService = new HashPassword();
const sendPasswordEmailContentGenerator = new SendPasswordEmailContentGenerator();
const trainerRepository = new TrainerRepository(trainerModel)
const gymAdminRepository = new GymAdminRepository(gymAdminModel);
const loginUseCase = new TrainerLoginUseCase(trainerRepository,hashService,gymAdminRepository);
const jwtService = new JwtService();
export const injectedTrainerLoginController = new TrainerLoginController(loginUseCase,jwtService);

// add member
const memberRepository = new MemberRepository(memberModel)
const generatePassword = new PasswordGenerator();
const addMemberUseCase = new AddMemberUseCase(memberRepository,hashService,emailService,generatePassword,sendPasswordEmailContentGenerator,gymAdminRepository,trainerRepository);
export const injectedAddMemberController = new AddMemberController(addMemberUseCase)