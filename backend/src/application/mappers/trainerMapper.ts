import { TrainerEntity } from "../../domain/entities/trainer/trainerEntity";
import { IListTrainerRequestDTO, IListTrainerResponseDTO } from "../dtos/trainerDto/listAllTrainerDto";

export class TrainerMapper {
    static toListTrainersResponse(trainers:TrainerEntity[],total:number,params:IListTrainerRequestDTO):IListTrainerResponseDTO{
        return{
            total:total,
            page:params.page,
            limit:params.limit,
            totalPages:Math.ceil(total/params.limit),
            search:params.search,
            data:trainers?.map(trainer =>({
                id:trainer._id?.toString(),
                name:trainer.name,
                role:trainer.role,
                email:trainer.email,
                phone:trainer.phone,
                joinDate:trainer.createdAt?.toDateString(),
                specializations:trainer.specialization,
                status:trainer.status,
                avatar:trainer.name.split(" ").map((val)=>val[0].toUpperCase()).join("")

            }))
        }
    }
}