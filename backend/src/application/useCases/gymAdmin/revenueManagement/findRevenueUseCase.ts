import { RevenueError } from "../../../../presentation/shared/constants/messages/revenueMessages";
import { NOtFoundException } from "../../../constants/exceptions";
import { RevenueResponseDto } from "../../../dtos/gymAdminDto/revenueDto";
import { IGymAdminRevenueRepository } from "../../../interfaces/repository/gymAdmin/revenueRepoInterface";
import { IFindRevenueUseCase } from "../../../interfaces/useCase/gymAdmin/revenueManagement/findRevenueUseCaseInterface";
import { RevenueMapper } from "../../../mappers/gymAdmin/revenueMapper";

export class FindRevenueDetailUseCase implements IFindRevenueUseCase{
    constructor(
        private _revenueRepository:IGymAdminRevenueRepository
    ){};
    async execute(id: string): Promise<RevenueResponseDto> {
        const revenue = await this._revenueRepository.findRevenueDetailById(id);
        if(!revenue){
            throw new NOtFoundException(RevenueError.NOT_FOUND);
        };
        const response = RevenueMapper.toRevenueDetailResponse(revenue);
        return response;
    }
}