import { PurchaseSubscriptionDTO } from "../../../dtos/gymAdminDto/purchaseSubscriptionDto";

export interface IPurchaseSubscriptionUseCase {
  execute(data: PurchaseSubscriptionDTO): Promise<void>;
}
