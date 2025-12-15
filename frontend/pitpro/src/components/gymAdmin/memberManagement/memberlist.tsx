import { MemberCard } from "@/components/gymAdmin/memberManagement/memberCard"
export type MemberStatus = "active" | "expired"

export interface Member {
  id: string
  name: string
  initials: string
  email: string
  phone: string
  joinedDate: string
  status: MemberStatus
}

const members: Member[] = [
  {
    id: "1",
    name: "John Smith",
    initials: "JS",
    email: "john.smith@email.com",
    phone: "9876554343",
    joinedDate: "2024-01-15",
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    initials: "SJ",
    email: "sarah.johnson@email.com",
    phone: "9876554343",
    joinedDate: "2024-01-15",
    status: "active",
  },
  {
    id: "3",
    name: "Mike Davis",
    initials: "MD",
    email: "mike.davis@email.com",
    phone: "9876554343",
    joinedDate: "2024-01-15",
    status: "expired",
  },
  {
    id: "4",
    name: "Emma Wilson",
    initials: "EW",
    email: "emma.wilson@email.com",
    phone: "9876554343",
    joinedDate: "2024-01-15",
    status: "active",
  },
]

export function MembersList() {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">All Members</h2>
        <p className="text-sm text-zinc-400">
          Manage members information, membership and status
        </p>
      </div>

      {/* Members */}
      <div className="space-y-3">
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-2">
        <button className="rounded-md border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-white hover:bg-zinc-700">
          1
        </button>
        <button className="rounded-md border border-zinc-800 bg-transparent px-4 py-2 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white">
          2
        </button>
      </div>
    </div>
  )
}
