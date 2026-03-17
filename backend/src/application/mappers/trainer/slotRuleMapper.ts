import { SlotRuleEntity } from "../../../domain/entities/trainer/slotRuleEntity";
import {
  FindSlotRuleResponseDto,
  UpdateSlotRuleRequestDto,
} from "../../dtos/trainerDto/slotRuleDtos";

export class SlotRuleMapper {
  static toFindResponse(slotRule: SlotRuleEntity): FindSlotRuleResponseDto {
    return {
      _id: slotRule._id?.toString() as string,
      isActive: slotRule.isActive,
      slots: slotRule.slots,
      startDate: slotRule.startDate,
      endDate: slotRule.endDate,
    };
  }

  static toSlotRuleEntity(
    updatedData: UpdateSlotRuleRequestDto,
    existData: SlotRuleEntity,
  ): SlotRuleEntity {
    return {
      ...existData,

      isActive: updatedData.isActive ?? existData.isActive,

      startDate: updatedData.startDate
        ? new Date(updatedData.startDate)
        : existData.startDate,

      endDate: updatedData.endDate
        ? new Date(updatedData.endDate)
        : existData.endDate,

      slots: updatedData.slots ?? existData.slots,
    };
  }
}
