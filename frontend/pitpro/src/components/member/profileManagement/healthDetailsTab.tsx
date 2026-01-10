import { Card } from "@/components/ui/card"
import { Ruler, Target, Heart, AlertTriangle, User } from "lucide-react"

export interface MemberDTO {
  id: string;
  gymId: string;
  branchId?: string;
  trainerId: string;
  name: string;
  email: string;
  phone: string;
  profileImg?: string;
  address: string;
  role: string;
  emergencyNumber: string;

  healthDetails: {
    gender: string;
    dateOfBirth: Date;
    weight: {
      value: number;
      unit?: string;
    };
    height: {
      value: number;
      unit?: string;
    };
    targetWeight: {
      value: number;
      unit?: string;
    };
    medicalConditions?: string;
    allergies?: string;
    fitnessGoal: string;
  };
  package?: {
    planId: string;
    startDate?: Date;
    endDate?: Date;
    price: number;
    status: string;
  };
  status: string;
}

export function HealthDetailsTab({ member }: { member: MemberDTO }) {
  const health = member.healthDetails
  const bmi =
    health.weight.value /
    ((health.height.value / 100) * (health.height.value / 100))

  const calculateAge = (dob: Date) => {
    const today = new Date()
    const birthDate = new Date(dob)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--
    }
    return age
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Basic Info */}
      <Card className="bg-[#0a0a0a] border border-gray-800 p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <User size={20} className="text-orange-500" />
          <h3 className="text-lg font-semibold text-white">
            Basic Information
          </h3>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-400">Gender</p>
            <p className="text-white font-medium capitalize">
              {health.gender}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Date of Birth</p>
            <p className="text-white font-medium">
              {new Date(health.dateOfBirth).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Age: {calculateAge(new Date(health.dateOfBirth))} years
            </p>
          </div>
        </div>
      </Card>

      {/* Measurements */}
      <Card className="bg-[#0a0a0a] border border-gray-800 p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Ruler size={20} className="text-orange-500" />
          <h3 className="text-lg font-semibold text-white">
            Measurements
          </h3>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-400">Height</p>
            <p className="text-white font-medium">
              {health.height.value} {health.height.unit || "cm"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Current Weight</p>
            <p className="text-white font-medium">
              {health.weight.value} {health.weight.unit || "kg"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">BMI</p>
            <p className="text-orange-500 font-semibold">
              {bmi.toFixed(1)}
            </p>
          </div>
        </div>
      </Card>

      {/* Fitness Target */}
      <Card className="bg-[#0a0a0a] border border-gray-800 p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Target size={20} className="text-orange-500" />
          <h3 className="text-lg font-semibold text-white">
            Fitness Target
          </h3>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-400">Target Weight</p>
            <p className="text-white font-medium">
              {health.targetWeight.value}{" "}
              {health.targetWeight.unit || "kg"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Weight Difference</p>
            <p className="text-orange-500 font-semibold">
              {(health.weight.value - health.targetWeight.value).toFixed(1)}{" "}
              {health.targetWeight.unit || "kg"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Fitness Goal</p>
            <p className="text-white font-medium capitalize">
              {health.fitnessGoal}
            </p>
          </div>
        </div>
      </Card>

      {/* Medical Conditions */}
      {health.medicalConditions && (
        <Card className="bg-red-500/10 border border-red-500/30 p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Heart size={20} className="text-red-400" />
            <h3 className="text-lg font-semibold text-white">
              Medical Conditions
            </h3>
          </div>
          <p className="text-gray-200 text-sm">
            {health.medicalConditions}
          </p>
        </Card>
      )}

      {/* Allergies */}
      {health.allergies && (
        <Card className="bg-yellow-500/10 border border-yellow-500/30 p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={20} className="text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">
              Allergies
            </h3>
          </div>
          <p className="text-gray-200 text-sm">
            {health.allergies}
          </p>
        </Card>
      )}
    </div>
  )
}
