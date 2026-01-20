import { IListActivePackagesDTO } from "../../../../dtos/gymAdminDto/packageDto";

export interface IListActivePackagesUseCase {
    execute(memberId:string):Promise<IListActivePackagesDTO[]>;
}