import { stripe } from "../../../../infrastructure/services/stripeClient";
import { MemberError } from "../../../../presentation/shared/constants/errorMessage/memberMessage";
import { PackageErrorMessage } from "../../../../presentation/shared/constants/messages/packageMessages";
import { ForbiddenException, NOtFoundException } from "../../../constants/exceptions";
import { CreateMemberCheckoutSessionRequestDto } from "../../../dtos/memberDto/purchasePackageDto";
import { IPackageRespository } from "../../../interfaces/repository/gymAdmin/packageRepoInterface";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { ICreateMemberCheckoutSessionUseCase } from "../../../interfaces/useCase/member/packageAndPurchaseManagement/createMemberCheckoutUseCaseInterface";

export class CreateMemberCheckoutSessionUseCase implements ICreateMemberCheckoutSessionUseCase {
    constructor(
        private _packageRespository:IPackageRespository,
        private _memberRepository:IMemberRepository
    ){}
  async execute(data: CreateMemberCheckoutSessionRequestDto): Promise<string> {
    const pkg = await this._packageRespository.findById(data.planId);
    if(!pkg){
        throw new NOtFoundException(PackageErrorMessage.NOT_FOUND);
    };
    if(!pkg.isActive){
        throw new ForbiddenException(PackageErrorMessage.NOT_ACTIVE)
    }
    const member = await this._memberRepository.findById(data.userId);

    if(!member){
      throw new NOtFoundException(MemberError.MEMBER_NOT_FOUND);
    }

    const successUrl = `${process.env.CLIENT_PROTOCOL}://${data.subdomain}.${process.env.CLIENT_DOMAIN}:${process.env.CLIENT_PORT}/member/success`;
    const cancelUrl = `${process.env.CLIENT_PROTOCOL}://${data.subdomain}.${process.env.CLIENT_DOMAIN}:${process.env.CLIENT_PORT}/member/cancel`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: pkg.name },
            unit_amount: pkg.price * 100,
          },
          quantity: 1,
        },
      ],
      metadata: { planId: data.planId, userId: data.userId,role:member.role },
      success_url: successUrl,
      cancel_url:cancelUrl,
    });

    return session.url!;
  }
}
