import { MemberDTO } from "@/components/member/profileManagement/healthDetailsTab";
import { UpdateMemberProfileFormValues } from "@/validation/updateMemberProfileValidation";

export function mapMemberToUpdateForm(
  member: MemberDTO
): UpdateMemberProfileFormValues {
  return {
    name: member.name || "",
    phone: member.phone || "",
    address: member.address || "",
    emergencyNumber: member.emergencyNumber || "",

    healthDetails: {
      gender: member.healthDetails?.gender
        ? member.healthDetails.gender.toLowerCase()
        : "",

      dateOfBirth: member.healthDetails?.dateOfBirth
        ? new Date(member.healthDetails.dateOfBirth)
            .toISOString()
            .split("T")[0]
        : "",

      weight: member.healthDetails?.weight?.value
        ? String(member.healthDetails.weight.value)
        : "",

      height: member.healthDetails?.height?.value
        ? String(member.healthDetails.height.value)
        : "",

      targetWeight: member.healthDetails?.targetWeight?.value
        ? String(member.healthDetails.targetWeight.value)
        : "",

      medicalConditions: member.healthDetails?.medicalConditions || "",
      allergies: member.healthDetails?.allergies || "",
      fitnessGoal: member.healthDetails?.fitnessGoal || "",
    },
  };
}
