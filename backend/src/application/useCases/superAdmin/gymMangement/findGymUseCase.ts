import { GymAdminAuthError } from "../../../../presentation/shared/constants/errorMessage/gymAdminAuthError";
import { ForbiddenException, NOtFoundException } from "../../../constants/exceptions";
import { IGymAdminDetailDTO } from "../../../dtos/superAdminDto/gymManagementDtos";
import { IGymAdminRepository } from "../../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { ISubscripctionRespoditery } from "../../../interfaces/repository/superAdmin/subscriptionRepoInterface";
import { ITrainerRepository } from "../../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { IFindGymUseCase } from "../../../interfaces/useCase/superAdmin/gymMangement/findGymUseCaseInterface";
import { GymAdminMapper } from "../../../mappers/gymAdminMapper";

export class FindGymUseCase implements IFindGymUseCase {
    constructor(
        private _memberRepository:IMemberRepository,
        private _gymAdminRepository:IGymAdminRepository,
        private _trainerRepository:ITrainerRepository,
        private _subscriptionRepository:ISubscripctionRespoditery
    ){}
    async findGym(id: string): Promise<IGymAdminDetailDTO | null> {
        try {
            const gymAdmin = await this._gymAdminRepository.findById(id);
            if(!gymAdmin){
                throw new NOtFoundException(GymAdminAuthError.GYM_NOT_FOUND);
            };

            const subscription = gymAdmin.packageId ? await this._subscriptionRepository.findById(gymAdmin.packageId) : null;
            if(!gymAdmin._id){
                throw new ForbiddenException("Gym ID is missing...")
            }
            const trainersCount = await this._trainerRepository.countTrainersByGymId(gymAdmin._id);
            const membersCount = await this._memberRepository.countMembersByGymId(gymAdmin._id);

            const response = GymAdminMapper.mapGymAdminToDetailDTO(gymAdmin,subscription,membersCount,trainersCount);
            return response;

        } catch (error) {
            throw error;
        }
    }
}