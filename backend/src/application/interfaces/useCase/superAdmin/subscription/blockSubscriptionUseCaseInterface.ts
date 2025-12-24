export interface IBlockSubscriptionUseCase {
    blockSubscription(id:string):Promise<void>;
}