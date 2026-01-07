import { Bell, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface HeaderProps {
  avatar: string
  title: string
  subtitle: string
}

export function Header({ avatar, title, subtitle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-[#1f1f1f] bg-[#0f0f0f] px-4 lg:px-6">
      
      <Button variant="ghost" size="icon" className="lg:hidden text-gray-400 hover:text-white">
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex flex-col">
        <h1 className="text-sm font-semibold text-white">{title}</h1>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>

      <div className="flex-1" />

      <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white">
        <Bell className="h-5 w-5" />
        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-purple-500" />
      </Button>

      <Avatar className="h-9 w-9">
        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white">
          {avatar}
        </AvatarFallback>
      </Avatar>

    </header>
  )
}
