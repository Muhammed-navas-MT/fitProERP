import { Model } from "mongoose";
import { BaseRepository } from "../base/baseRepo";
import { ISuperAdminPaymentModel } from "../databaseConfigs/models/superAdminPaymentModel";
import { ISuperAdminPaymentRepository } from "../../../application/interfaces/repository/superAdmin/paymentRepoInterface";
import { IListPaymentRequestDTO } from "../../../application/dtos/superAdminDto/paymentDto";
import { IPopulatedPayment } from "../databaseConfigs/types/populatedPaymentType";

export class SuperAdminPaymentRepository
  extends BaseRepository<ISuperAdminPaymentModel>
  implements ISuperAdminPaymentRepository
{
  constructor(model: Model<ISuperAdminPaymentModel>) {
    super(model);
  }
  async existsBySessionId(sessionId: string): Promise<boolean> {
    return !!(await this._model.findOne({ stripeSessionId: sessionId }));
  }

  async findAllPayments(
    params: IListPaymentRequestDTO,
  ): Promise<{ payments: IPopulatedPayment[]; total: number }> {
    const { search, page, limit } = params;
    const skip = (page - 1) * limit;
    const matchStage = search
      ? {
          $match: {
            $or: [
              { "package.planName": { $regex: search, $options: "i" } },
              { "gym.gymName": { $regex: search, $options: "i" } },
            ],
          },
        }
      : { $match: {} };

    const result = await this._model.aggregate([
      {
        $lookup: {
          from: "gymadmins",
          localField: "gymId",
          foreignField: "_id",
          as: "gym",
        },
      },
      { $unwind: "$gym" },

      {
        $lookup: {
          from: "subscriptions",
          localField: "packageId",
          foreignField: "_id",
          as: "package",
        },
      },
      { $unwind: "$package" },

      matchStage,

      {
        $facet: {
          payments: [
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
          ],
          totalCount: [{ $count: "total" }],
        },
      },
    ]);

    const payments = result[0].payments;
    const total = result[0].totalCount[0]?.total || 0;

    return { payments, total };
  }
}
