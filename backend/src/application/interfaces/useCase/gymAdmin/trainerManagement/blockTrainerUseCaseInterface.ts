export interface IBlockTrainerUseCase {
    blockTrainer(trainerId:string):Promise<void>
}