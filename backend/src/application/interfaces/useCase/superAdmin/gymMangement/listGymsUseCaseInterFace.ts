import { IListGymsRequestDTO, IListGymsResponseDTO } from "../../../../dtos/superAdminDto/gymManagementDtos";

export interface IListGymsUseCase {
    listAllGym(params:IListGymsRequestDTO):Promise<IListGymsResponseDTO | null>;
}