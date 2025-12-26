import { IListGymsRequestDTO, IListGymsResponseDTO } from "../../../../dtos/gymAdminDto/gymManagementDtos";

export interface IListGymsUseCase {
    listAllGym(params:IListGymsRequestDTO):Promise<IListGymsResponseDTO | null>;
}