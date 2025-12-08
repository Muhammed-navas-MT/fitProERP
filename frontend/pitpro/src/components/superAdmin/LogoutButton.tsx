import { LogOut } from "lucide-react"

interface LogoutButtonProps {
  onLogout: () => void
  variant?: "full" | "icon"
}

export default function LogoutButton({ onLogout, variant = "full" }: LogoutButtonProps) {
  if (variant === "icon") {
    return (
      <button
        onClick={onLogout}
        className="p-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-red-400 transition"
        title="Logout"
      >
        <LogOut size={20} />
      </button>
    )
  }

  return (
    <button
      onClick={onLogout}
      className="w-full flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-red-400 transition font-semibold"
    >
      <LogOut size={18} />
      <span className="text-sm sm:text-base">Logout</span>
    </button>
  )
}