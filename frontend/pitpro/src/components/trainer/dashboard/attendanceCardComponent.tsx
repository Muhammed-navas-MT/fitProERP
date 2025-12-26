import { CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AttendanceCardProps {
  status: string
  currentTime: string
}

export function AttendanceCard({ status, currentTime }: AttendanceCardProps) {
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
      <h3 className="text-white font-semibold text-lg mb-6">{"Today's Attendance"}</h3>

      <div className="bg-[#2a2a2a] rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400 text-sm">Status</span>
          <span className="text-gray-400 text-sm">Current Time</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white font-semibold">{status}</span>
          <span className="text-white font-semibold">{currentTime}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button className="bg-green-600 hover:bg-green-700 text-white gap-2">
          <CheckCircle className="h-4 w-4" />
          Check In
        </Button>
        <Button className="bg-red-600 hover:bg-red-700 text-white gap-2">
          <XCircle className="h-4 w-4" />
          Check Out
        </Button>
      </div>
    </div>
  )
}
