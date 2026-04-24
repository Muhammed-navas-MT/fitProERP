import { useState } from "react"
import { Sidebar } from "@/components/gymAdmin/sidebar"
import { TopBar } from "@/components/gymAdmin/topbar"
import {
  Lock,
  User,
  Mail,
  Phone,
  Building2,
  ShieldCheck,
  CalendarDays,
  BadgeCheck,
  FileText,
  Users,
  Dumbbell,
  GitBranch,
  Crown,
} from "lucide-react"
import { ChangePasswordModal } from "@/components/shared/changePaswordModal"
import { UpdateProfileModal } from "@/components/gymAdmin/profileManagement/updateProfileModal"
import {
  useViewGymAdminProfile,
  useUpdateGymAdminProfile,
  useUpdateGymAdminPassword,
} from "@/hook/gymAdmin/profileManagementHook"
import { toast } from "sonner"
import { Dialog } from "@headlessui/react"
import { GymInfoSkeleton } from "@/components/gymAdmin/profileManagement/gymAdminProfilePageSkeleton"

export default function GymInfoPage() {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isDocModalOpen, setIsDocModalOpen] = useState(false)
  const [selectedDocImage, setSelectedDocImage] = useState("")

  const { data, isLoading, isError } = useViewGymAdminProfile()
  console.log(data);
  const updateProfileMutation = useUpdateGymAdminProfile()
  const updatePasswordMutation = useUpdateGymAdminPassword()

  const handleProfileUpdate = async (updatedData: FormData) => {
    try {
      await updateProfileMutation.mutateAsync(updatedData)
      setIsProfileModalOpen(false)
      toast.success("Profile updated successfully")
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message)
      } else {
        toast.error("Failed to update profile")
      }
    }
  }

  const handlePasswordUpdate = async (data: {
    oldPassword: string
    newPassword: string
  }) => {
    try {
      await updatePasswordMutation.mutateAsync(data)
      setIsPasswordModalOpen(false)
      toast.success("Password updated successfully")
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message)
      } else {
        toast.error("Failed to update password")
      }
    }
  }

  const openDocModal = (imageUrl: string) => {
    setSelectedDocImage(imageUrl)
    setIsDocModalOpen(true)
  }

  if (isLoading) return <GymInfoSkeleton />
  const gymAdminData = data?.data ?? {}
  if (isError || !gymAdminData) return <GymInfoSkeleton />

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Sidebar />

      <TopBar
        title="Gym Profile"
        subtitle="View and manage your gym identity, subscription, and documents"
      >
        <div className="mx-auto w-full max-w-7xl space-y-6 px-1">
          {/* Hero Section */}
          <div className="overflow-hidden rounded-3xl border border-orange-500/20 bg-gradient-to-br from-[#171717] via-black to-[#121212] shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
            <div className="relative p-8 md:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.15),transparent_30%)]" />

              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                  <div className="h-24 w-24 overflow-hidden rounded-2xl border border-orange-500/30 bg-[#111111] shadow-xl">
                    <img
                      src={gymAdminData.logo || ""}
                      alt={`${gymAdminData.gymName} Logo`}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                        {gymAdminData.gymName}
                      </h2>
                      <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                        {gymAdminData.status}
                      </span>
                    </div>

                    <p className="max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
                      {gymAdminData.tagline}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className="rounded-full border border-orange-500/25 bg-orange-500/10 px-3 py-1 text-xs text-orange-300">
                        {gymAdminData.role}
                      </span>
                      <span className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs text-zinc-300">
                        @{gymAdminData.subdomain}
                      </span>
                      <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-300">
                        {gymAdminData.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setIsPasswordModalOpen(true)}
                    className="inline-flex items-center gap-2 rounded-xl border border-blue-500/30 bg-blue-500/10 px-5 py-3 text-sm font-medium text-blue-400 transition hover:bg-blue-500/20"
                  >
                    <Lock className="h-4 w-4" />
                    Change Password
                  </button>

                  <button
                    onClick={() => setIsProfileModalOpen(true)}
                    className="inline-flex items-center gap-2 rounded-xl border border-orange-500/30 bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                  >
                    <User className="h-4 w-4" />
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-zinc-800 bg-[#111111] p-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-xl bg-orange-500/10 p-3 text-orange-400">
                  <Users className="h-5 w-5" />
                </div>
                <span className="text-xs text-zinc-500">Members Limit</span>
              </div>
              <p className="text-3xl font-bold text-white">
                {gymAdminData.limits?.maxMembers}
              </p>
              <p className="mt-1 text-sm text-zinc-400">Maximum members allowed</p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-[#111111] p-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-xl bg-purple-500/10 p-3 text-purple-400">
                  <Dumbbell className="h-5 w-5" />
                </div>
                <span className="text-xs text-zinc-500">Trainers Limit</span>
              </div>
              <p className="text-3xl font-bold text-white">
                {gymAdminData.limits?.maxTrainers}
              </p>
              <p className="mt-1 text-sm text-zinc-400">Maximum trainers allowed</p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-[#111111] p-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-400">
                  <GitBranch className="h-5 w-5" />
                </div>
                <span className="text-xs text-zinc-500">Branches Limit</span>
              </div>
              <p className="text-3xl font-bold text-white">
                {gymAdminData.limits?.maxBranches}
              </p>
              <p className="mt-1 text-sm text-zinc-400">Maximum branches allowed</p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-[#111111] p-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-xl bg-green-500/10 p-3 text-green-400">
                  <Crown className="h-5 w-5" />
                </div>
                <span className="text-xs text-zinc-500">Subscription</span>
              </div>
              <p className="text-xl font-bold capitalize text-white">
                {gymAdminData.paymentStatus}
              </p>
              <p className="mt-1 text-sm text-zinc-400">Current payment status</p>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
            {/* Left Column */}
            <div className="space-y-6 xl:col-span-4">
              <div className="rounded-2xl border border-zinc-800 bg-[#111111] p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-xl bg-orange-500/10 p-2.5 text-orange-400">
                    <User className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    Owner Information
                  </h3>
                </div>

                <div className="space-y-4">
                  <InfoRow
                    icon={<User className="h-4 w-4" />}
                    label="Owner Name"
                    value={gymAdminData.ownerName}
                  />
                  <InfoRow
                    icon={<Mail className="h-4 w-4" />}
                    label="Email"
                    value={gymAdminData.email}
                  />
                  <InfoRow
                    icon={<Phone className="h-4 w-4" />}
                    label="Phone"
                    value={gymAdminData.phone}
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-[#111111] p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-400">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Gym Details</h3>
                </div>

                <div className="space-y-4">
                  <InfoRow
                    icon={<BadgeCheck className="h-4 w-4" />}
                    label="Status"
                    value={gymAdminData.status}
                    valueClassName="text-green-400"
                  />
                  <InfoRow
                    icon={<ShieldCheck className="h-4 w-4" />}
                    label="Role"
                    value={gymAdminData.role}
                  />
                  <InfoRow
                    icon={<Building2 className="h-4 w-4" />}
                    label="Subdomain"
                    value={gymAdminData.subdomain}
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6 xl:col-span-8">
              <div className="rounded-2xl border border-zinc-800 bg-[#111111] p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-xl bg-green-500/10 p-2.5 text-green-400">
                    <CalendarDays className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    Subscription Overview
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <DetailCard
                    label="Payment Status"
                    value={gymAdminData.paymentStatus}
                    valueClassName="text-green-400"
                  />
                  <DetailCard
                    label="Start Date"
                    value={new Date(
                      gymAdminData.subscriptionStart,
                    ).toLocaleDateString()}
                  />
                  <DetailCard
                    label="End Date"
                    value={new Date(
                      gymAdminData.subscriptionEnd,
                    ).toLocaleDateString()}
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-[#111111] p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-xl bg-orange-500/10 p-2.5 text-orange-400">
                    <FileText className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    Documentation
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {gymAdminData.businessLicense && (
                    <DocCard
                      title="Business License"
                      image={gymAdminData.businessLicense}
                      onClick={() => openDocModal(gymAdminData.businessLicense)}
                    />
                  )}

                  {gymAdminData.insuranceCertificate && (
                    <DocCard
                      title="Insurance Certificate"
                      image={gymAdminData.insuranceCertificate}
                      onClick={() =>
                        openDocModal(gymAdminData.insuranceCertificate)
                      }
                    />
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-[#111111] p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-xl bg-purple-500/10 p-2.5 text-purple-400">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">About Gym</h3>
                </div>

                <p className="leading-8 text-zinc-300">
                  {gymAdminData.description}
                </p>
              </div>

              {gymAdminData.branches && gymAdminData.branches.length > 0 && (
                <div className="rounded-2xl border border-zinc-800 bg-[#111111] p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="rounded-xl bg-cyan-500/10 p-2.5 text-cyan-400">
                      <GitBranch className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Branches</h3>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {gymAdminData.branches.map((branch: string, index: number) => (
                      <span
                        key={index}
                        className="rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-300"
                      >
                        {branch}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </TopBar>

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSubmit={handlePasswordUpdate}
      />

      <UpdateProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        data={gymAdminData}
        onSubmit={handleProfileUpdate}
      />

     <Dialog
  open={isDocModalOpen}
  onClose={() => setIsDocModalOpen(false)}
  className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
>
  <div
    className="absolute inset-0"
    onClick={() => setIsDocModalOpen(false)}
  />

  <Dialog.Panel className="relative z-10 flex max-h-[95vh] max-w-[95vw] items-center justify-center">
    <img
      src={selectedDocImage}
      alt="Document"
      className="max-h-[95vh] max-w-[95vw] object-contain rounded-lg shadow-2xl"
    />
  </Dialog.Panel>
</Dialog>
    </div>
  )
}

function InfoRow({
  icon,
  label,
  value,
  valueClassName = "text-white",
}: {
  icon: React.ReactNode
  label: string
  value?: string
  valueClassName?: string
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-[#0d0d0d] p-4">
      <div className="mt-0.5 text-zinc-500">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wide text-zinc-500">{label}</p>
        <p className={`mt-1 break-words text-sm font-medium ${valueClassName}`}>
          {value || "-"}
        </p>
      </div>
    </div>
  )
}

function DetailCard({
  label,
  value,
  valueClassName = "text-white",
}: {
  label: string
  value?: string
  valueClassName?: string
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-[#0d0d0d] p-5">
      <p className="text-xs uppercase tracking-wide text-zinc-500">{label}</p>
      <p className={`mt-3 text-lg font-semibold ${valueClassName}`}>
        {value || "-"}
      </p>
    </div>
  )
}

function DocCard({
  title,
  image,
  onClick,
}: {
  title: string
  image: string
  onClick: () => void
}) {
  return (
    <div className="group rounded-2xl border border-zinc-800 bg-[#0d0d0d] p-4 transition hover:border-orange-500/30">
      <p className="mb-3 text-sm font-medium text-zinc-300">{title}</p>
      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-black">
        <img
          src={image}
          alt={title}
          className="h-48 w-full cursor-pointer object-cover transition duration-300 group-hover:scale-[1.02]"
          onClick={onClick}
        />
      </div>
    </div>
  )
}
