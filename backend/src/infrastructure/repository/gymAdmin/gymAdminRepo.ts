import { IGymAdminRepository } from "../../../application/interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { IGymAdminModel } from "../databaseConfigs/models/gymAdminModel";
import { Model } from "mongoose";
import { BaseRepository } from "../base/baseRepo";
import { GymAdminEntity } from "../../../domain/entities/gymAdmin/gymAdminEntity";
import { IListGymsRequestDTO } from "../../../application/dtos/superAdminDto/gymManagementDtos";
import { Status } from "../../../domain/enums/status";
import { GymAdminProfileResponseDTO } from "../../../application/dtos/gymAdminDto/gymAdminProfileDtos";
import { mapGymAdminToProfileResponse } from "../../../application/mappers/gymAdmin/profileMappers";
import { GymGrowthDto } from "../../../application/dtos/superAdminDto/dashboardDto";
import { PaymentMethodType } from "../../../domain/enums/stripePaymentMethodType";

export class GymAdminRepository
  extends BaseRepository<IGymAdminModel>
  implements IGymAdminRepository
{
  constructor(model: Model<IGymAdminModel>) {
    super(model);
  }

  async findByEmail(email: string): Promise<GymAdminEntity | null> {
    const doc = await this._model.findOne({ email });
    if (!doc) return null;
    return doc;
  }

  async findBySubdomian(subdomain: string): Promise<GymAdminEntity | null> {
    const doc = await this._model.findOne({ subdomain });
    if (!doc) return null;
    return doc;
  }

  async listGyms(params: IListGymsRequestDTO): Promise<{
    gyms: (GymAdminEntity & { planName: string })[];
    total: number;
  }> {
    const skip = (params.page - 1) * params.limit;
    const filter = params.search
      ? { gymName: { $regex: params.search, $options: "i" } }
      : {};

    const gymsData = await this._model
      .find(filter)
      .populate("packageId", "planName")
      .skip(skip)
      .limit(params.limit)
      .sort({ createdAt: -1 });

    type GymWithSubscription = GymAdminEntity & {
      packageId?: {
        planName: string;
      };
    };
    const gyms = gymsData.map((gym) => {
      const g = gym.toObject() as GymWithSubscription;

      return {
        ...g,
        planName: g.packageId?.planName ?? "",
      };
    });

    const total = await this._model.countDocuments(filter);
    return { gyms, total };
  }

  async unBlockById(id: string): Promise<boolean> {
    const result = await this._model.updateOne(
      { _id: id },
      { $set: { status: Status.ACTIVE } },
    );
    return result.modifiedCount > 0;
  }

  async blockById(id: string): Promise<boolean> {
    const result = await this._model.updateOne(
      { _id: id },
      { $set: { status: Status.BLOCKED } },
    );
    return result.modifiedCount > 0;
  }

  async findGymAdminWithBranches(
    gymAdminId: string,
  ): Promise<GymAdminProfileResponseDTO | null> {
    const gymAdmin = await this._model
      .findOne({ _id: gymAdminId })
      .populate({
        path: "branches",
        select: "branchName",
      })
      .lean();

    if (!gymAdmin) return null;

    const branches: string[] = Array.isArray(gymAdmin.branches)
      ? gymAdmin.branches.map((branch: any) => branch?.branchName ?? "")
      : [];

    return mapGymAdminToProfileResponse(gymAdmin, branches);
  }

  async findAllGymIds(): Promise<string[]> {
    const gyms = await this._model.find({}, { _id: 1 }).lean();

    return gyms.map((gym) => gym._id.toString());
  }

  async countTotalGymAdmins(): Promise<number> {
    return await this._model.countDocuments();
  }

  async countGymAdminsCreatedThisMonth(
    start: Date,
    end: Date,
  ): Promise<number> {
    return await this._model.countDocuments({
      createdAt: { $gte: start, $lt: end },
    });
  }

  async countGymAdminsCreatedLastMonth(
    start: Date,
    end: Date,
  ): Promise<number> {
    return await this._model.countDocuments({
      createdAt: { $gte: start, $lt: end },
    });
  }

  async getGymAdminGrowthByMonth(months: number): Promise<GymGrowthDto[]> {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - (months - 1));
    startDate.setDate(1);
    startDate.setHours(0, 0, 0, 0);

    const result = await this._model.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    const growthMap = new Map<string, number>();

    result.forEach((item) => {
      const key = `${item._id.year}-${item._id.month}`;
      growthMap.set(key, item.count);
    });

    const output: GymGrowthDto[] = [];
    const now = new Date();

    for (let i = months - 1; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const year = date.getFullYear();
      const monthNumber = date.getMonth() + 1;

      output.push({
        month: date.toLocaleString("en-US", { month: "short" }),
        count: growthMap.get(`${year}-${monthNumber}`) || 0,
      });
    }

    return output;
  }

  async isBillingConfigAdded(gymId: string): Promise<boolean> {
    const gym = await this._model
      .findById(gymId)
      .select("billingConfig.isDefaultPaymentMethodAdded")
      .lean();

    return !!gym?.billingConfig?.isDefaultPaymentMethodAdded;
  }

  async updateBillingEmail(
    gymId: string,
    billingEmail: string,
  ): Promise<GymAdminEntity | null> {
    return await this._model
      .findByIdAndUpdate(
        gymId,
        {
          $set: {
            "billingConfig.billingEmail": billingEmail,
          },
        },
        { new: true },
      )
      .lean<GymAdminEntity | null>();
  }

  async updateBillingConfig(
    gymId: string,
    data: {
      stripeCustomerId?: string;
      defaultPaymentMethodId?: string;
      paymentMethodType?: PaymentMethodType;
      paymentMethodBrand?: string;
      paymentMethodLast4?: string;
      billingEmail?: string;
      isDefaultPaymentMethodAdded?: boolean;
    },
  ): Promise<GymAdminEntity | null> {
    const updateData: Record<string, unknown> = {};

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        updateData[`billingConfig.${key}`] = value;
      }
    });

    return await this._model
      .findByIdAndUpdate(gymId, { $set: updateData }, { new: true })
      .lean<GymAdminEntity | null>();
  }
}
