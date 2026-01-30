import { useState } from "react"
import { useFindGym } from "@/hook/superAdmin/gymMangementHook"
import Sidebar from "@/components/superAdmin/Sidebar"
import Header from "@/components/superAdmin/Header"
import MobileNav from "@/components/superAdmin/MobileNav"
import GymDetailHeader from "@/components/superAdmin/gymDetailHeader"
import StatCard from "../../components/superAdmin/stateCard"
import OwnerInfoCard from "@/components/superAdmin/ownerInfoCard"
import SubscriptionCard from "@/components/superAdmin/subscriptionCard"
import { useNavigate, useParams } from "react-router-dom"
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes"
import DocumentCard from "@/components/superAdmin/documentCard"
import ImagePreviewModal from "@/components/modal/imagePreviewModal"

export default function GymDetailPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const { gymId } = useParams<{ gymId: string }>()
  const { data, isLoading, isError } = useFindGym(gymId||"");
  const gymAdminData = data?.data;
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(`${FRONTEND_ROUTES.SUPER_ADMIN.BASE}/${FRONTEND_ROUTES.SUPER_ADMIN.LIST_GYMS}`)
  }

  if (isLoading) return <div className="p-6 text-white">Loading...</div>
  if (isError || !gymAdminData) return <div className="p-6 text-red-500">Failed to load gym details.</div>

  return (
    <div className="flex h-screen bg-[#0a0b0d] overflow-hidden">
      <div className="hidden lg:block">
        <Sidebar isOpen={true} />
      </div>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isMobile
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Gym Details"
          description={`Manage ${gymAdminData.name} in the system`}
          showMenuButton
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
          <GymDetailHeader
            gymName={gymAdminData.name}
            gymId={gymAdminData.id}
            status={gymAdminData.status}
            onBack={handleBack}
          />

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <StatCard title="Total Members" value={gymAdminData.totalMembers} maxValue={gymAdminData.subscription.limits.maxMembers} />
              <StatCard title="Total Branches" value={gymAdminData.totalBranches} maxValue={gymAdminData.subscription.limits.maxBranches} />
              <StatCard title="Total Trainers" value={gymAdminData.totalTrainers} maxValue={gymAdminData.subscription.limits.maxTrainers} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <OwnerInfoCard {...gymAdminData.owner} />
              {gymAdminData.subscription && (
                <SubscriptionCard
                  currentPlan={gymAdminData.subscription.currentPlan}
                  price={gymAdminData.subscription.price}
                  memberSince={gymAdminData.subscription.memberSince}
                  duration = {gymAdminData.subscription.duration}
                />
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <DocumentCard
                title="Business License"
                image={gymAdminData.businessLicense}
                onClick={setPreviewImage}
              />
              <DocumentCard
                title="Insurance Certificate"
                image={gymAdminData.insuranceCertificate}
                onClick={setPreviewImage}
              />
            </div>
          </div>
        </main>
      </div>

      <MobileNav activeTab="gyms" />

      {previewImage && (
        <ImagePreviewModal
          image={previewImage}
          onClose={() => setPreviewImage(null)}
        />
      )}
    </div>
  )
}