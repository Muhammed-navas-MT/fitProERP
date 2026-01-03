import { TrainerEntity } from "../../domain/entities/trainer/trainerEntity";
import {
  IListActiveTrainers,
  IListTrainerRequestDTO,
  IListTrainerResponseDTO,
  TrainerDTO,
} from "../dtos/trainerDto/listAllTrainerDto";

export class TrainerMapper {
  static toListTrainersResponse(
    trainers: (TrainerEntity & { branchName: string })[],
    total: number,
    params: IListTrainerRequestDTO
  ): IListTrainerResponseDTO {
    return {
      total: total,
      page: params.page,
      limit: params.limit,
      totalPages: Math.ceil(total / params.limit),
      search: params.search,
      data: trainers?.map((trainer) => ({
        id: trainer._id?.toString(),
        name: trainer.name,
        role: trainer.role,
        email: trainer.email,
        phone: trainer.phone,
        joinDate: trainer.createdAt?.toDateString(),
        branchName: trainer.branchName,
        status: trainer.status,
        avatar: trainer.name
          .split(" ")
          .map((val) => val[0].toUpperCase())
          .join(""),
      })),
    };
  }

  static toActiveTrainersResponse(
    trainers: TrainerEntity[]
  ): IListActiveTrainers[] {
    return trainers.map((trainer) => ({
      id: trainer._id?.toString() || "",
      name: trainer.name,
    }));
  }

  static toFindTrainerResponse(trainer: TrainerEntity): TrainerDTO {
    return {
      id: trainer._id!,
      gymId: trainer.gymId,
      branchId: trainer.branchId || "",
      name: trainer.name,
      email: trainer.email,
      phone: trainer.phone,
      role: trainer.role,
      specialization: trainer.specialization,
      experience: trainer.experience,
      baseSalary: trainer.baseSalary,
      commisionRate: trainer.commisionRate,
      status: trainer.status,
      dutyTime: trainer.dutyTime,
      address: trainer.address,
      createdAt: trainer.createdAt || new Date(),
    };
  }
}
