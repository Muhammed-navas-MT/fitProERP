export interface IUnBlockSubscriptionUseCase {
    unBlockSubscription(id:string):Promise<void>;
}