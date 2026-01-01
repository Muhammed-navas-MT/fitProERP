import { MemberLoginUseCase } from "../../../application/useCases/member/memberLoginUseCase";
import { MemberLoginController } from "../../../presentation/controller/member/memberLoginController";
import { gymAdminModel } from "../../repository/databaseConfigs/models/gymAdminModel";
import { memberModel } from "../../repository/databaseConfigs/models/memberModel";
import { GymAdminRepository } from "../../repository/gymAdmin/gymAdminRepo";
import { MemberRepository } from "../../repository/member/memberRepo";
import { HashPassword } from "../../services/hashService";
import { JwtService } from "../../services/jwtService";

const memberRepository = new MemberRepository(memberModel)
const gymAdminRepository = new GymAdminRepository(gymAdminModel)
const hashService = new  HashPassword()
const jwtService = new JwtService()
const loginUseCase = new MemberLoginUseCase(memberRepository,hashService,gymAdminRepository)
export const injectedMemberLoginController = new MemberLoginController(loginUseCase,jwtService)