import { ProgressEntity } from "../../../domain/entities/member/progressEntity";
import { BMIStatus } from "../../../domain/enums/BMIStatus";
import {
  ICreateProgressDto,
  IFindProgressDto,
  IGoalWeightStatus,
  ILatestProgressSummary,
  IListProgressRequestDto,
  IListProgressResponseDto,
  IMonthlyProgressReport,
  IMonthlyProgressStatus,
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
    latestProgress: ILatestProgressSummary,
    monthlyStatus: IMonthlyProgressStatus,
    goalWeightStatus: IGoalWeightStatus,
  ): IListProgressResponseDto {
    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 5;

    return {
      progress: progress.map((item) => ({
        id: item._id!.toString(),
        memberId: item.memberId.toString(),
        weight: item.weight,
        bmi: item.bmi,
        bmiCategory: item.bmiCategory,
        bodyFatPercentage: item.bodyFatPercentage,
        muscleMass: item.muscleMass,
        note: item.note,
        progressDate: item.progressDate,
      })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),

      latestProgress,
      monthlyStatus,
      goalWeightStatus,
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

  static toGraphData(progress: ProgressEntity[]): IMonthlyProgressReport[] {
    const today = new Date();

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const map = new Map<string, IMonthlyProgressReport>();

    for (const item of progress) {
      const date = new Date(item.progressDate);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      const key = `${year}-${month}`;

      map.set(key, {
        month: `${monthNames[month - 1]} ${year}`,
        bmi: Number((item.bmi ?? 0).toFixed(1)),
        weight: Number((item.weight.value ?? 0).toFixed(1)),
        bodyFatPercentage: Number((item.bodyFatPercentage ?? 0).toFixed(1)),
        muscleMass: Number((item.muscleMass?.value ?? 0).toFixed(1)),
      });
    }

    const finalData: IMonthlyProgressReport[] = [];

    for (let i = 11; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      const key = `${year}-${month}`;

      finalData.push(
        map.get(key) ?? {
          month: `${monthNames[month - 1]} ${year}`,
          bmi: 0,
          weight: 0,
          bodyFatPercentage: 0,
          muscleMass: 0,
        },
      );
    }

    return finalData;
  }

  static toLatestProgressSummary(
    progress: ProgressEntity[],
  ): ILatestProgressSummary {
    if (!progress.length) {
      return {
        currentWeight: null,
        bmi: null,
        bmiCategory: null,
        bodyFatPercentage: null,
        muscleMass: null,
        progressDate: null,
      };
    }

    const latest = [...progress].sort(
      (a, b) =>
        new Date(b.progressDate).getTime() - new Date(a.progressDate).getTime(),
    )[0];

    return {
      currentWeight: latest.weight,
      bmi: latest.bmi,
      bmiCategory: latest.bmiCategory,
      bodyFatPercentage: latest.bodyFatPercentage ?? null,
      muscleMass: latest.muscleMass ?? null,
      progressDate: latest.progressDate,
    };
  }

  static toMonthlyStatus(progress: ProgressEntity[]): IMonthlyProgressStatus {
    const today = new Date();

    const hasAddedThisMonth = progress.some((item) => {
      const date = new Date(item.progressDate);

      return (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth()
      );
    });

    const currentMonth = today.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });

    return {
      hasAddedThisMonth,
      currentMonth,
    };
  }

  static toGoalWeightStatus(
    progress: ProgressEntity[],
    targetWeight?: { value: number; unit?: string },
  ): IGoalWeightStatus {
    if (!targetWeight || !progress.length) {
      return {
        targetWeight: targetWeight
          ? {
              value: targetWeight.value,
              unit: (targetWeight.unit as "kg" | "lbs") || "kg",
            }
          : null,
        achieved: false,
        remainingWeight: null,
        differenceFromTarget: null,
        message: "Set your target weight to track progress",
      };
    }

    const latest = [...progress].sort(
      (a, b) =>
        new Date(b.progressDate).getTime() - new Date(a.progressDate).getTime(),
    )[0];

    const currentWeight = latest.weight.value;
    const target = targetWeight.value;

    const difference = Number(Math.abs(currentWeight - target).toFixed(1));

    let achieved = false;
    let message = "";

    if (currentWeight === target) {
      achieved = true;
      message = "🎉 You achieved your target weight!";
    } else if (currentWeight > target) {
      message = `You need to lose ${difference} ${latest.weight.unit}`;
    } else {
      message = `You need to gain ${difference} ${latest.weight.unit}`;
    }

    return {
      targetWeight: {
        value: target,
        unit: (targetWeight.unit as "kg" | "lbs") || latest.weight.unit,
      },
      achieved,
      remainingWeight: achieved ? 0 : difference,
      differenceFromTarget: difference,
      message,
    };
  }

  static toGoalAchieved(
    progress: ProgressEntity,
    targetWeight?: { value: number; unit?: string },
  ): IGoalWeightStatus {
    if (!targetWeight) {
      return {
        targetWeight: null,
        achieved: false,
        remainingWeight: null,
        differenceFromTarget: null,
        message: "Set your target weight to track progress",
      };
    }

    const progressUnit = (progress.weight.unit as "kg" | "lbs") || "kg";
    const targetUnit = (targetWeight.unit as "kg" | "lbs") || "kg";

    const convertToKg = (value: number, unit: "kg" | "lbs") => {
      return unit === "lbs" ? value * 0.453592 : value;
    };

    const convertFromKg = (value: number, unit: "kg" | "lbs") => {
      return unit === "lbs"
        ? +(value / 0.453592).toFixed(1)
        : +value.toFixed(1);
    };

    const currentWeightInKg = convertToKg(progress.weight.value, progressUnit);
    const targetWeightInKg = convertToKg(targetWeight.value, targetUnit);

    const differenceInKg = Math.abs(currentWeightInKg - targetWeightInKg);
    const difference = convertFromKg(differenceInKg, progressUnit);

    let achieved = false;
    let message = "";

    if (currentWeightInKg === targetWeightInKg) {
      achieved = true;
      message = "🎉 You achieved your target weight!";
    } else if (currentWeightInKg > targetWeightInKg) {
      message = `You need to lose ${difference} ${progressUnit}`;
    } else {
      message = `You need to gain ${difference} ${progressUnit}`;
    }

    return {
      targetWeight: {
        value: convertFromKg(targetWeightInKg, progressUnit),
        unit: progressUnit,
      },
      achieved,
      remainingWeight: achieved ? 0 : difference,
      differenceFromTarget: difference,
      message,
    };
  }
}
