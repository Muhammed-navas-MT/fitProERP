import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface MembersHeaderProps {
  onAddMember: () => void
}

export function MembersHeader({ onAddMember }: MembersHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-2">
          My Members
        </h1>
        <p className="text-gray-400 text-sm">Manage and track your assigned members</p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          onClick={onAddMember}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
        >
          Add Member
        </Button>
        <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-purple-500 rounded-full" />
        </Button>
        <Avatar className="h-9 w-9 bg-gradient-to-br from-purple-600 to-blue-600">
          <AvatarFallback className="bg-transparent text-white text-sm font-semibold">DJ</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
