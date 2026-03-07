import { PaymentError } from "../../../../presentation/shared/constants/messages/paymentMessages";
import { NOtFoundException } from "../../../constants/exceptions";
import { IPaymentDetailDTO } from "../../../dtos/superAdminDto/paymentDto";
import { IGymAdminRepository } from "../../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { ISuperAdminPaymentRepository } from "../../../interfaces/repository/superAdmin/paymentRepoInterface";
import { ISubscripctionRespoditery } from "../../../interfaces/repository/superAdmin/subscriptionRepoInterface";
import { IFindPaymentUseCase } from "../../../interfaces/useCase/superAdmin/paymentManagement/findPaymentUseCaseInterfance";
import { PaymentMapper } from "../../../mappers/superAdmin/paymentMapper";

export class FindPaymentUseCase implements IFindPaymentUseCase {
  constructor(
    private _paymentRepository: ISuperAdminPaymentRepository,
    private _gymAdminRepository: IGymAdminRepository,
    private _subscriptionRepository: ISubscripctionRespoditery
  ) {}

  async execute(id: string): Promise<IPaymentDetailDTO> {
    if (!id) {
      throw new NOtFoundException(PaymentError.ID_REQUIRED);
    }

    const payment = await this._paymentRepository.findById(id);

    if (!payment) {
      throw new NOtFoundException(PaymentError.NOT_FOUND);
    }

    const [gymAdmin, subscription] = await Promise.all([
      this._gymAdminRepository.findById(payment.gymId),
      this._subscriptionRepository.findById(payment.packageId),
    ]);

    if (!gymAdmin) {
      throw new NOtFoundException(PaymentError.GYM_NOT_FOUND);
    }

    if (!subscription) {
      throw new NOtFoundException(PaymentError.PACKAGE_NOT_FOUND);
    }
    const response = PaymentMapper.toPaymentDetailDto(payment,gymAdmin,subscription);
    return response;
  }
}