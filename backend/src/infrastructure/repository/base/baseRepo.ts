import { Model } from "mongoose";
import { IBaseRepository } from "../../../application/interfaces/repository/base/baseRepo";

export abstract class  BaseRepository<T> implements IBaseRepository<T> {
    constructor(protected _model:Model<T>){}

    async create(data: T): Promise<string> {
        const {_id } = await this._model.create(data);
        return _id as string;
    };

    async blockById(id: string): Promise<boolean> {
        const result = await this._model.findOneAndUpdate({_id:id},{$set:{isActive:false}});
        return !!result
    }

    async unBlockById(id: string): Promise<boolean> {
        const result = await this._model.updateOne({_id:id},{$set:{isActive:true}});
        return result.modifiedCount >0;
    }

    async findById(id: string): Promise<T | null> {
        const data = await this._model.findById(id);
        if(!data)return null;
        return data
    }

    async update(data:Partial<T>, id: string): Promise<boolean> {
        console.log(data,"from updating data .......")
        const result = await this._model.findByIdAndUpdate(id,{$set:data})
        return !!result;
    }

};