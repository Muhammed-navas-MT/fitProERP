import {
  LayoutDashboard,
  User,
  Calendar,
  ClipboardCheck,
  DollarSign,
  FileText,
  Wallet,
  Users,
  Dumbbell,
  MessageSquare,
  Video,
  Bell,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const mainMenuItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: false },
  { icon: User, label: "Profile", active: false },
  { icon: Calendar, label: "My Schedule", active: false },
  { icon: ClipboardCheck, label: "Attendance", active: false },
  { icon: DollarSign, label: "Salary", active: false },
  { icon: FileText, label: "Leave Request", active: false },
  { icon: Wallet, label: "Wallet", active: false },
]

const clientManagementItems = [
  { icon: Users, label: "Members", active: true },
  { icon: Dumbbell, label: "Workout Plan", active: false },
  { icon: MessageSquare, label: "Chat", active: false },
  { icon: Video, label: "Video Call", active: false },
  { icon: Bell, label: "Notifications", active: false },
]

export function Sidebar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-[220px] lg:flex-col bg-[#0f0f0f] border-r border-[#1f1f1f]">
        <div className="flex h-16 items-center gap-3 border-b border-[#1f1f1f] px-6">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
            <Dumbbell className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white">Energy Gym</h1>
            <p className="text-xs text-gray-400">Member Portal</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4">
          <div className="mb-6">
            <p className="px-3 mb-2 text-xs font-semibold text-purple-400 uppercase tracking-wider">Main</p>
            <nav className="space-y-1">
              {mainMenuItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 text-gray-300 hover:text-white hover:bg-[#1a1a1a]",
                    item.active && "bg-[#1a1a1a] text-white",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-sm">{item.label}</span>
                </Button>
              ))}
            </nav>
          </div>

          <div>
            <p className="px-3 mb-2 text-xs font-semibold text-purple-400 uppercase tracking-wider">
              Client Management
            </p>
            <nav className="space-y-1">
              {clientManagementItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 text-gray-300 hover:text-white hover:bg-[#1a1a1a]",
                    item.active && "bg-[#1a1a1a] text-white",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-sm">{item.label}</span>
                </Button>
              ))}
            </nav>
          </div>
        </div>

        <div className="border-t border-[#1f1f1f] p-3">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-gray-300 hover:text-white hover:bg-[#1a1a1a]"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-sm">Logout</span>
          </Button>
        </div>
      </aside>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0f0f0f] border-t border-[#1f1f1f] px-4 py-2 z-50">
        <div className="flex justify-around items-center">
          <Button variant="ghost" size="sm" className="flex-col h-auto py-2 text-gray-400 hover:text-white">
            <LayoutDashboard className="h-5 w-5" />
            <span className="text-xs mt-1">Dashboard</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-auto py-2 text-white">
            <Users className="h-5 w-5" />
            <span className="text-xs mt-1">Members</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-auto py-2 text-gray-400 hover:text-white">
            <MessageSquare className="h-5 w-5" />
            <span className="text-xs mt-1">Chat</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-auto py-2 text-gray-400 hover:text-white">
            <Bell className="h-5 w-5" />
            <span className="text-xs mt-1">Alerts</span>
          </Button>
        </div>
      </nav>
    </>
  )
}
