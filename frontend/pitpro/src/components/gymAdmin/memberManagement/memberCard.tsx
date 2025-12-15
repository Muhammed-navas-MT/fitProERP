import { Mail, Phone, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
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

interface MemberCardProps {
  member: Member
}

export function MemberCard({ member }: MemberCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-zinc-800 bg-black p-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Left Section */}
      <div className="flex items-start gap-3 lg:items-center lg:gap-4">
        {/* Avatar */}
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-black lg:h-14 lg:w-14">
          {member.initials}
        </div>

        {/* Info */}
        <div className="flex-1 space-y-1">
          <h3 className="font-semibold text-white">{member.name}</h3>

          <div className="flex flex-col gap-2 text-xs text-zinc-400 lg:flex-row lg:items-center lg:gap-4">
            <div className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              <span>{member.email}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" />
              <span>{member.phone}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>Joined {member.joinedDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="flex justify-end">
        <span
          className={cn(
            "inline-flex rounded-full px-3 py-1 text-xs font-medium",
            member.status === "active"
              ? "bg-green-500/10 text-green-500"
              : "bg-red-500/10 text-red-500"
          )}
        >
          {member.status === "active" ? "Active" : "Expired"}
        </span>
      </div>
    </div>
  )
}
