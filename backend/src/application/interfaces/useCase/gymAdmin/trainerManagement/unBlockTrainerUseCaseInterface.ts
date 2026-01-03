export interface IUnBlockTrainerUseCase {
    unBlockTrainer(trainerId:string):Promise<void>
}