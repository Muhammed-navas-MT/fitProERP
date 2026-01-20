import { MemberError } from "../../../../presentation/shared/constants/errorMessage/memberMessage";
import { NOtFoundException } from "../../../constants/exceptions";
import { IListActivePackagesDTO } from "../../../dtos/gymAdminDto/packageDto";
import { IPackageRespository } from "../../../interfaces/repository/gymAdmin/packageRepoInterface";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { IListActivePackagesUseCase } from "../../../interfaces/useCase/member/packageAndPurchaseManagement/listAcitvePackagesUseCaseInterface";
import { PackageMapper } from "../../../mappers/gymAdmin/packageMapper";

export class ListActivePackagesUseCase implements IListActivePackagesUseCase{
    constructor(
        private _memberRepository:IMemberRepository,
        private _packageRepository:IPackageRespository
    ){}
    async execute(memberId: string): Promise<IListActivePackagesDTO[]> {
        const member = await this._memberRepository.findById(memberId);

        if(!member){
            throw new NOtFoundException(MemberError.MEMBER_NOT_FOUND);
        };

        const packages = await this._packageRepository.findActivePackageByBranchIdAndGymId(member.branchId as string,member.gymId);
        return PackageMapper.toListActivePackageResponse(packages);
    }
}