import { Bell } from "lucide-react"
import type React from "react"

interface TopBarProps {
  title: string
  subtitle: string
  showUserMenu?: boolean
  children?: React.ReactNode
}

export function TopBar({
  title,
  subtitle,
  showUserMenu = true,
  children,
}: TopBarProps) {
  return (
    <div className="flex-1 lg:ml-52">
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3 lg:px-6 lg:py-3">
        <div>
          <h1 className="text-lg font-semibold text-orange-500 lg:text-4xl">
            {title}
          </h1>
          <p className="text-2 text-zinc-400">{subtitle}</p>
        </div>
        {showUserMenu && (
          <div className="flex items-center gap-4">
            <button className="relative">
              <Bell className="h-5 w-5 text-orange-500" />
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
            </button>
            <br />
          </div>
        )}
      </div>
      <div className="p-4 lg:p-6">{children}</div>
    </div>
  )
}
