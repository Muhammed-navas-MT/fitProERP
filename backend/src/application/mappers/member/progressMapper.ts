import { ProgressEntity } from "../../../domain/entities/member/progressEntity";
import { BMIStatus } from "../../../domain/enums/BMIStatus";
import {
  ICreateProgressDto,
  IFindProgressDto,
  IListProgressRequestDto,
  IListProgressResponseDto,
  IProgressItem,
  IUpdateProgressDto,
} from "../../dtos/memberDto/progressDto";

export class ProgressMapper {
  static toProgressEntity(
    data: ICreateProgressDto,
    memberId: string,
    bmi: number,
    bmiCategory: BMIStatus,
  ): ProgressEntity {
    return {
      memberId,
      weight: data.weight,
      bmi,
      bmiCategory,
      bodyFatPercentage: data.bodyFatPercentage,
      muscleMass: data.muscleMass,
      note: data.note,
      progressDate: data.progressDate ?? new Date(),
    };
  }
  static toFindProgressDto(entity: ProgressEntity): IFindProgressDto {
    return {
      id: entity._id?.toString() ?? "",
      memberId: entity.memberId,
      weight: entity.weight,
      bmi: entity.bmi,
      bmiCategory: entity.bmiCategory,
      bodyFatPercentage: entity.bodyFatPercentage,
      muscleMass: entity.muscleMass,
      note: entity.note,
      progressDate: entity.progressDate,
    };
  }
  static toProgressItem(entity: ProgressEntity): IProgressItem {
    return {
      id: entity._id?.toString() ?? "",
      memberId: entity.memberId,
      weight: entity.weight,
      bmi: entity.bmi,
      bmiCategory: entity.bmiCategory,
      bodyFatPercentage: entity.bodyFatPercentage,
      muscleMass: entity.muscleMass,
      note: entity.note,
      progressDate: entity.progressDate,
    };
  }

  static toListProgressResponse(
    params: IListProgressRequestDto,
    progress: ProgressEntity[],
    total: number,
  ): IListProgressResponseDto {
    return {
      page: params.page,
      limit: params.limit,
      total,
      totalPages: Math.ceil(total / params.limit),
      progress: progress.map((item) => this.toProgressItem(item)),
    };
  }
  static toUpdateProgressEntity(
    existing: ProgressEntity,
    data: IUpdateProgressDto,
    bmi: number,
    bmiCategory: BMIStatus,
  ): ProgressEntity {
    return {
      _id: existing._id,
      memberId: existing.memberId,
      weight: data.weight ?? existing.weight,
      bmi,
      bmiCategory,
      bodyFatPercentage: data.bodyFatPercentage ?? existing.bodyFatPercentage,
      muscleMass: data.muscleMass ?? existing.muscleMass,
      note: data.note ?? existing.note,
      progressDate: data.progressDate ?? existing.progressDate,
      createdAt: existing.createdAt,
      updatedAt: new Date(),
    };
  }
}
