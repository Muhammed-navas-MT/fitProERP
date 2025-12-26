import { Model } from "mongoose";
import { BaseRepository } from "../base/baseRepo";
import { ISuperAdminPaymentModel } from "../databaseConfigs/models/superAdminPaymentModel";
import { ISuperAdminPaymentRepository } from "../../../application/interfaces/repository/superAdmin/paymentRepoInterface";

export class SuperAdminPaymentRepository
  extends BaseRepository<ISuperAdminPaymentModel>
  implements ISuperAdminPaymentRepository
{
  constructor(model: Model<ISuperAdminPaymentModel>) {
    super(model);
  }
}