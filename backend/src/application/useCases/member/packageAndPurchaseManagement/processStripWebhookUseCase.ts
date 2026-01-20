import Stripe from "stripe";
import { IMemberProcessStripeWebhookUseCase } from "../../../interfaces/useCase/member/packageAndPurchaseManagement/processStripeWebhookUseCaseInterface";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { IPackageRespository } from "../../../interfaces/repository/gymAdmin/packageRepoInterface";
import { ForbiddenException, NOtFoundException } from "../../../constants/exceptions";
import { PackageErrorMessage } from "../../../../presentation/shared/constants/messages/packageMessages";
import { Status } from "../../../../domain/enums/status";
import { mapPackageToMemberUpdate } from "../../../mappers/member/mapPackageToMemberUpdate";

export class MemberProcessStripeWebhookUseCase implements IMemberProcessStripeWebhookUseCase {
  constructor(
    // private _paymentRepository: ,
    private _memberRepository: IMemberRepository,
    private _packageRepository: IPackageRespository,
  ) {}

  async execute(event: Stripe.Event): Promise<void> {
    if (event.type !== "checkout.session.completed") return;

    const session = event.data.object;
    const userId = session?.metadata?.userId;
    const planId = session?.metadata?.planId;

    if (!userId || !planId) {
      throw new ForbiddenException("Stripe session metadata missing");
    }

    // const alreadyExists = await this._paymentRepository.existsBySessionId(
    //   session.id,
    // );
    // if (alreadyExists) return;

    const pkg = await this._packageRepository.findById(planId);
    if (!pkg) {
      throw new NOtFoundException(PackageErrorMessage.NOT_FOUND);
    }

    if (session.amount_total == null) {
      throw new ForbiddenException("Stripe session amount is missing");
    }

    // const payment: SuperAdminPaymentEntity = {
    //   gymId: userId,
    //   packageId: planId,
    //   stripeSessionId: session.id,
    //   amount: session.amount_total / 100,
    //   currency: session.currency as string,
    //   paymentMethod: PaymentMethod.ONLINE,
    //   status: PaymentStatus.PAID,
    //   createdAt: new Date(),
    // };

    const updatedMemberData = mapPackageToMemberUpdate(
      planId,
      pkg.price,
      pkg.durationInDays,
    );

    await this._memberRepository.update(
      { ...updatedMemberData, status: Status.ACTIVE},
      userId,
    );

    // await this._paymentRepository.create(payment);
  }
}
