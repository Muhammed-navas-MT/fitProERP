import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusTypes } from "@/types/statusType"

interface GymDetailHeaderProps {
  gymName: string
  gymId: string
  status: StatusTypes
  onBack: () => void
}

export default function GymDetailHeader({ gymName, gymId, status, onBack }: GymDetailHeaderProps) {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-800">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="text-gray-400 hover:text-white hover:bg-gray-800"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-white">{gymName}</h1>
            {status === "ACTIVE" && (
              <span className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded-full">active</span>
            )}
          </div>
          <p className="text-sm text-gray-400 mt-1">Gym ID: {gymId}</p>
        </div>
      </div>
    </div>
  )
}
