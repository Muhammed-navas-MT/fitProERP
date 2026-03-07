import { RevenueResponseDto } from "../../../../dtos/gymAdminDto/revenueDto";

export interface IFindRevenueUseCase {
    execute(id:string):Promise<RevenueResponseDto>;
}