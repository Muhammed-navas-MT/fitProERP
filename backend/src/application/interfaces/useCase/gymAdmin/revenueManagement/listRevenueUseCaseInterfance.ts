import {
  IListRevenueRequestDTO,
  IListRevenueResponseDTO,
} from "../../../../dtos/gymAdminDto/revenueDto";

export interface IListRevenueUseCase {
  execute(params: IListRevenueRequestDTO): Promise<IListRevenueResponseDTO>;
}