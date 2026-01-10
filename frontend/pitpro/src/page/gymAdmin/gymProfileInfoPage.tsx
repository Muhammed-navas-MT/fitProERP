import { useState } from "react"
import { Sidebar } from "@/components/gymAdmin/sidebar"
import { TopBar } from "@/components/gymAdmin/topbar"
import { Lock, User } from "lucide-react"
import { ChangePasswordModal } from "@/components/shared/changePaswordModal"
import { UpdateProfileModal } from "@/components/gymAdmin/profileManagement/updateProfileModal"
import { useViewGymAdminProfile, useUpdateGymAdminProfile, useUpdateGymAdminPassword } from "@/hook/gymAdmin/profileManagementHook"
import { toast } from "sonner"
import { Dialog } from "@headlessui/react"
import { GymInfoSkeleton } from "@/components/gymAdmin/profileManagement/gymAdminProfilePageSkeleton"

export default function GymInfoPage() {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isDocModalOpen, setIsDocModalOpen] = useState(false)
  const [selectedDocImage, setSelectedDocImage] = useState("")

  const { data, isLoading, isError } = useViewGymAdminProfile()
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

  const handlePasswordUpdate = async (data: { oldPassword: string; newPassword: string }) => {
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
  if (isError || !gymAdminData) return <p className="text-red-500 p-4">Failed to load profile</p>

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <Sidebar />
      <TopBar title="Gym Information" subtitle="Manage your gym profile and settings">
        <div className="max-w-4xl mx-auto w-full">
          <div className="bg-black border border-orange-500/20 rounded-lg p-6 mb-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-md overflow-hidden border border-zinc-700 flex-shrink-0">
                <img
                  src={gymAdminData.logo || ""}
                  alt={`${gymAdminData.gymName} Logo`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">{gymAdminData.gymName}</h2>
                <p className="text-zinc-400">{gymAdminData.tagline}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsPasswordModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 text-blue-400 rounded-md hover:bg-blue-600/30 transition-colors border border-blue-500/30"
              >
                <Lock className="h-4 w-4" />
                Change Password
              </button>
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500/20 text-orange-400 rounded-md hover:bg-orange-500/30 transition-colors border border-orange-500/30"
              >
                <User className="h-4 w-4" />
                Update Profile
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black border border-orange-500/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-orange-500 mb-4">Owner Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-zinc-400 mb-1">Owner Name</p>
                  <p className="text-white font-medium">{gymAdminData.ownerName}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400 mb-1">Email</p>
                  <p className="text-white font-medium">{gymAdminData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400 mb-1">Phone</p>
                  <p className="text-white font-medium">{gymAdminData.phone}</p>
                </div>
              </div>
            </div>

            <div className="bg-black border border-orange-500/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-orange-500 mb-4">Gym Details</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-zinc-400 mb-1">Subdomain</p>
                  <p className="text-white font-medium">{gymAdminData.subdomain}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400 mb-1">Status</p>
                  <p className="text-green-400 font-medium">{gymAdminData.status}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400 mb-1">Role</p>
                  <p className="text-white font-medium">{gymAdminData.role}</p>
                </div>
              </div>
            </div>

            <div className="bg-black border border-orange-500/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-orange-500 mb-4">Documentation</h3>
              <div className="grid grid-cols-2 gap-4">
                {gymAdminData.businessLicense && (
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-sm text-zinc-400">Business License</p>
                    <img
                      src={gymAdminData.businessLicense}
                      alt="Business License"
                      className="w-24 h-24 object-cover rounded cursor-pointer border border-zinc-700"
                      onClick={() => openDocModal(gymAdminData.businessLicense)}
                    />
                  </div>
                )}
                {gymAdminData.insuranceCertificate && (
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-sm text-zinc-400">Insurance Certificate</p>
                    <img
                      src={gymAdminData.insuranceCertificate}
                      alt="Insurance Certificate"
                      className="w-24 h-24 object-cover rounded cursor-pointer border border-zinc-700"
                      onClick={() => openDocModal(gymAdminData.insuranceCertificate)}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="bg-black border border-orange-500/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-orange-500 mb-4">Subscription</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-zinc-400 mb-1">Payment Status</p>
                  <p className="text-green-400 font-medium">{gymAdminData.paymentStatus}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400 mb-1">Start Date</p>
                  <p className="text-white font-medium">{new Date(gymAdminData.subscriptionStart).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400 mb-1">End Date</p>
                  <p className="text-white font-medium">{new Date(gymAdminData.subscriptionEnd).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-black border border-orange-500/20 rounded-lg p-6 md:col-span-2">
              <h3 className="text-lg font-semibold text-orange-500 mb-4">Limits</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-zinc-400 mb-1">Max Members</p>
                  <p className="text-2xl font-bold text-white">{gymAdminData.limits.maxMembers}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400 mb-1">Max Trainers</p>
                  <p className="text-2xl font-bold text-white">{gymAdminData.limits.maxTrainers}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400 mb-1">Max Branches</p>
                  <p className="text-2xl font-bold text-white">{gymAdminData.limits.maxBranches}</p>
                </div>
              </div>
            </div>

            <div className="bg-black border border-orange-500/20 rounded-lg p-6 md:col-span-2">
              <h3 className="text-lg font-semibold text-orange-500 mb-4">About Gym</h3>
              <p className="text-zinc-300 leading-relaxed">{gymAdminData.description}</p>
            </div>

            {gymAdminData.branches && gymAdminData.branches.length > 0 && (
              <div className="bg-black border border-orange-500/20 rounded-lg p-6 md:col-span-2">
                <h3 className="text-lg font-semibold text-orange-500 mb-4">Branches</h3>
                <div className="flex flex-wrap gap-2">
                  {gymAdminData.branches.map((branch: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-sm border border-orange-500/30"
                    >
                      {branch}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </TopBar>

      {/* Modals */}
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

      {/* Document Image Modal */}
      <Dialog open={isDocModalOpen} onClose={() => setIsDocModalOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <Dialog.Panel className="max-w-lg max-h-[80vh]">
          <img src={selectedDocImage} alt="Document" className="w-full h-full object-contain rounded-md" />
        </Dialog.Panel>
      </Dialog>
    </div>
  )
}
