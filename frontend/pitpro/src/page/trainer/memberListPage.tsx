import { useState } from "react"
import { Sidebar } from "@/components/trainer/trainerSidebar"
import { MembersHeader } from "@/components/trainer/memberManagement/memberHeader"
import { StatsCards } from "@/components/trainer/memberManagement/statsCard"
import { MembersList } from "@/components/trainer/memberManagement/memberList"
import { AddMemberModal } from "@/components/trainer/memberManagement/addMemberModal"

export function MembersPage() {
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      <Sidebar />
      <main className="flex-1 lg:ml-[220px]">
        <div className="p-4 md:p-8">
          <MembersHeader onAddMember={() => setIsAddMemberOpen(true)} />
          <StatsCards />
          <MembersList />
        </div>
      </main>
      <AddMemberModal open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen} />
    </div>
  )
}
