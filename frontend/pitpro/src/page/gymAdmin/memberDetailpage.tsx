import { Sidebar } from "@/components/gymAdmin/sidebar"
import { TopBar } from "@/components/gymAdmin/topbar"
import { useFindMember } from "@/hook/gymAdmin/memberHooks";
import { Mail, Phone, MapPin, Heart, Weight, Ruler, Target, AlertCircle, Calendar, CreditCard } from "lucide-react"
import { useParams } from "react-router-dom";
import { MemberDetailSkeleton } from "./memberDetailSkeleton";

export default function MemberDetailPage() {
  const { memberId } = useParams<{ memberId: string }>();

  const { data, isPending, error } = useFindMember(memberId!);

  if (isPending) return <MemberDetailSkeleton />;

  if (error || !data?.data) {
    return <div className="text-red-500 p-6">Failed to load member</div>;
  }

  const member = data?.data; 
  console.log(data?.data);

  const calculateAge = (dob: Date) => {
    const today = new Date()
    let age = today.getFullYear() - dob.getFullYear()
    const monthDiff = today.getMonth() - dob.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--
    }
    return age
  }

  const formatDate = (date: Date | undefined) => {
    if (!date) return "N/A"
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const isMembershipActive = member.status === "ACTIVE"
  const daysRemaining = member.package?.endDate
    ? Math.ceil((new Date(member.package.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <div className="flex w-full flex-col">
        <TopBar title={member.name} subtitle={`Member ID: ${member.id} • Status: ${member.status}`}>
          <div className="space-y-6">
            {/* Header Card with Profile */}
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                {/* Profile Section */}
                <div className="flex items-center gap-6">
                  <div className="h-32 w-32 overflow-hidden rounded-lg bg-gradient-to-br from-orange-500 to-orange-600">
                    <img
                      src={member.profileImg || "/placeholder.svg"}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h2 className="text-3xl font-bold text-white">{member.name}</h2>
                      <p className="text-sm text-zinc-400">{member.role}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full ${isMembershipActive ? "bg-green-500" : "bg-red-500"}`} />
                      <span className={isMembershipActive ? "text-green-400" : "text-red-400"}>{member.status}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border border-zinc-700 bg-black/50 p-4 text-center">
                    <p className="text-2xl font-bold text-orange-500">
                      {calculateAge(new Date(member.healthDetails.dateOfBirth))}
                    </p>
                    <p className="text-xs text-zinc-400">Years Old</p>
                  </div>
                  <div className="rounded-lg border border-zinc-700 bg-black/50 p-4 text-center">
                    <p className="text-2xl font-bold text-orange-500">{daysRemaining}</p>
                    <p className="text-xs text-zinc-400">Days Left</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-orange-500">
                  <Mail className="h-5 w-5" />
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-zinc-500" />
                    <div>
                      <p className="text-xs text-zinc-400">Email</p>
                      <p className="text-sm text-white">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-zinc-500" />
                    <div>
                      <p className="text-xs text-zinc-400">Phone</p>
                      <p className="text-sm text-white">{member.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-4 w-4 text-zinc-500" />
                    <div>
                      <p className="text-xs text-zinc-400">Emergency</p>
                      <p className="text-sm text-white">{member.emergencyNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-zinc-500" />
                    <div>
                      <p className="text-xs text-zinc-400">Address</p>
                      <p className="text-sm text-white">{member.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Package Information */}
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-orange-500">
                  <CreditCard className="h-5 w-5" />
                  Package Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-zinc-400">Plan ID</p>
                    <p className="text-sm text-white">{member.package?.planId || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400">Price</p>
                    <p className="text-sm font-semibold text-orange-400">${member.package?.price || 0}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-zinc-400">Start Date</p>
                      <p className="text-xs text-white">{formatDate(member.package?.startDate)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-400">End Date</p>
                      <p className="text-xs text-white">{formatDate(member.package?.endDate)}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400">Status</p>
                    <span className="inline-block rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400">
                      {member.package?.status || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Health Details */}
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
              <h3 className="mb-4 text-lg font-semibold text-orange-500">Health Information</h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {/* Gender */}
                <div className="rounded-lg border border-zinc-700 bg-black/50 p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Heart className="h-4 w-4 text-orange-500" />
                    <span className="text-xs font-medium text-zinc-400">Gender</span>
                  </div>
                  <p className="text-base font-semibold text-white">{member.healthDetails.gender}</p>
                </div>

                {/* Date of Birth */}
                <div className="rounded-lg border border-zinc-700 bg-black/50 p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="h-4 w-4 text-orange-500" />
                    <span className="text-xs font-medium text-zinc-400">Date of Birth</span>
                  </div>
                  <p className="text-base font-semibold text-white">
                    {formatDate(new Date(member.healthDetails.dateOfBirth))}
                  </p>
                </div>

                {/* Weight */}
                <div className="rounded-lg border border-zinc-700 bg-black/50 p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Weight className="h-4 w-4 text-orange-500" />
                    <span className="text-xs font-medium text-zinc-400">Current Weight</span>
                  </div>
                  <p className="text-base font-semibold text-white">
                    {member.healthDetails.weight.value}
                    <span className="ml-1 text-xs text-zinc-400">{member.healthDetails.weight.unit}</span>
                  </p>
                </div>

                {/* Height */}
                <div className="rounded-lg border border-zinc-700 bg-black/50 p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Ruler className="h-4 w-4 text-orange-500" />
                    <span className="text-xs font-medium text-zinc-400">Height</span>
                  </div>
                  <p className="text-base font-semibold text-white">
                    {member.healthDetails.height.value}
                    <span className="ml-1 text-xs text-zinc-400">{member.healthDetails.height.unit}</span>
                  </p>
                </div>

                {/* Target Weight */}
                <div className="rounded-lg border border-zinc-700 bg-black/50 p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Target className="h-4 w-4 text-orange-500" />
                    <span className="text-xs font-medium text-zinc-400">Target Weight</span>
                  </div>
                  <p className="text-base font-semibold text-white">
                    {member.healthDetails.targetWeight.value}
                    <span className="ml-1 text-xs text-zinc-400">{member.healthDetails.targetWeight.unit}</span>
                  </p>
                </div>

                {/* Medical Conditions */}
                <div className="rounded-lg border border-zinc-700 bg-black/50 p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                    <span className="text-xs font-medium text-zinc-400">Medical Conditions</span>
                  </div>
                  <p className="text-base font-semibold text-white">
                    {member.healthDetails.medicalConditions || "None"}
                  </p>
                </div>

                {/* Allergies */}
                <div className="rounded-lg border border-zinc-700 bg-black/50 p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                    <span className="text-xs font-medium text-zinc-400">Allergies</span>
                  </div>
                  <p className="text-base font-semibold text-white">{member.healthDetails.allergies || "None"}</p>
                </div>

                {/* Fitness Goal */}
                <div className="rounded-lg border border-zinc-700 bg-black/50 p-4 md:col-span-2 lg:col-span-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Target className="h-4 w-4 text-orange-500" />
                    <span className="text-xs font-medium text-zinc-400">Fitness Goal</span>
                  </div>
                  <p className="text-sm font-semibold text-white">{member.healthDetails.fitnessGoal}</p>
                </div>
              </div>
            </div>

            {/* Progress Card */}
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
              <h3 className="mb-4 text-lg font-semibold text-orange-500">Weight Progress</h3>
              <div className="flex items-center justify-between rounded-lg border border-zinc-700 bg-black/50 p-4">
                <div>
                  <p className="text-sm text-zinc-400">Current vs Target</p>
                  <p className="text-2xl font-bold text-white">
                    {member.healthDetails.weight.value}{" "}
                    <span className="text-lg text-zinc-400">
                      / {member.healthDetails.targetWeight.value} {member.healthDetails.weight.unit}
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-zinc-400">Difference</p>
                  <p className="text-2xl font-bold text-orange-400">
                    {Math.abs(member.healthDetails.weight.value - member.healthDetails.targetWeight.value)}{" "}
                    {member.healthDetails.weight.unit}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TopBar>
      </div>
    </div>
  )
}
