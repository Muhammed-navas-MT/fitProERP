export interface IUnBlockGymUseCase {
    unBlockGym(id:string):Promise<void>;
}