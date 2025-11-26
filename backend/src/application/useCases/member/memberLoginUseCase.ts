import { Status } from "../../../domain/enums/status";
import { MemberError } from "../../../presentation/shared/constants/errorMessage/memberMessage";
import { ForbiddenException, NOtFoundException } from "../../constants/exceptions";
import { LoginRequestDTO, MemberLoginResponseDTO} from "../../dtos/auth/loginDto";
import { IMemberRepository } from "../../interfaces/repository/member/addMemberRepoInterface";
import { IHashService } from "../../interfaces/service/hashServiceInterface";
import { IMemberLoginUseCase } from "../../interfaces/useCase/member/memberLoginUseCaseInterface";
import { LoginMapper } from "../../mappers/loginMapper";

export class MemberLoginUseCase implements IMemberLoginUseCase {
    private _memberRepository:IMemberRepository;
    private _hashService:IHashService;
    constructor(
        memberRepository:IMemberRepository,
        hashService:IHashService,
    ){
        this._memberRepository = memberRepository;
        this._hashService = hashService;
    };

    async login(data: LoginRequestDTO): Promise<MemberLoginResponseDTO> {
        try {
            const member = await this._memberRepository.findByEmail(data.email);
            if(!member){
                throw new NOtFoundException(MemberError.MEMBER_NOT_FOUND);
            };

            const isPassswordValid = this._hashService.compare(data.password,member.password||"");
            if(!isPassswordValid){
                throw new NOtFoundException(MemberError.INVALID_CREDENTIALS);
            };

            if(member.status === Status.BLOCKED){
                throw new ForbiddenException(MemberError.MEMBER_BLOCKED);

            }else if(member.status === Status.ACTIVE){
                const response = LoginMapper.memberLoginMapper(member);
                return response;
            }else{
                throw new ForbiddenException(MemberError.INVALID_CREDENTIALS);
            }
        } catch (error) {
            throw error
        }
    }
}