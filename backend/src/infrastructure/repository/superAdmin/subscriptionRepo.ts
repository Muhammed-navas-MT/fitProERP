import { ISubscripctionRespoditery } from "../../../application/interfaces/repository/superAdmin/subscriptionRepoInterface";
import { BaseRepository } from "../base/baseRepo";
import { IListSubscriptionRequestDTO, ISubscriptionRequestDTO, ISubscriptionResponseDTO } from "../../../application/dtos/superAdminDto/subscriptionDto";
import { Model } from "mongoose";
import { ISubscriptionModel } from "../databaseConfigs/models/subscriptionModel";
import { SubscriptionEntity } from "../../../domain/entities/superAdmin/subscriptionEntity";


export class SubscriptionRepository extends BaseRepository<ISubscriptionModel> implements ISubscripctionRespoditery {
    constructor(model:Model<ISubscriptionModel>){
        super(model)
    };

    async findByPlanName(planName: string): Promise<boolean> {
        const doc = await this._model.findOne({planName});
        return !!doc
    }

    async listAllSubscriptions(params:IListSubscriptionRequestDTO): Promise<{subscription:SubscriptionEntity[],total:number}> {
        const skip = (params.page-1)*params.limit;
        const filter = params.search ? {planName:{$regex:params.search,$options:"i"}}:{};

        const subscriptions = await this._model.find(filter)
        .skip(skip)
        .limit(params.limit)
        .sort({createdAt:-1});

        const total = await this._model.countDocuments(filter);

        return {subscription:subscriptions,total:total}
    }
    
    async getAllSubscriptions(): Promise<SubscriptionEntity[]> {
        console.log("frentend request")
        const subscriptions = await this._model.find({})
        .sort({createdAt: -1})
        .lean();
    
    return subscriptions;
}

}