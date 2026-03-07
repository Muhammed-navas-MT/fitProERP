import { IListRevenueRequestDTO, IListRevenueResponseDTO } from "../../../dtos/gymAdminDto/revenueDto";
import { IGymAdminRevenueRepository } from "../../../interfaces/repository/gymAdmin/revenueRepoInterface";
import { IListRevenueUseCase } from "../../../interfaces/useCase/gymAdmin/revenueManagement/listRevenueUseCaseInterfance";
import { RevenueMapper } from "../../../mappers/gymAdmin/revenueMapper";

export class ListRevenueUseCase implements IListRevenueUseCase {
    constructor(
        private _revenueRepository:IGymAdminRevenueRepository,
    ){}
    async execute(params: IListRevenueRequestDTO): Promise<IListRevenueResponseDTO> {
        const {revenues,total,grandTotalAmount,summary} = await this._revenueRepository.findAllRevenues(params);
        const response = RevenueMapper.toRevenueListResponse(revenues,params,total,summary,grandTotalAmount);
        return response;
    }
}