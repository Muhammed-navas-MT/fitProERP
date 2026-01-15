import { useEffect, useState } from "react"
import { CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AttendanceCardProps {
  status: string
  checkInTime?: string
  checkOutTime?: string
  onCheckIn: () => void
  onCheckOut: () => void
  isCheckInLoading: boolean
  isCheckOutLoading: boolean
  disabledCheckIn?: boolean
  disabledCheckOut?: boolean
}

export function AttendanceCard({
  status,
  checkInTime,
  checkOutTime,
  onCheckIn,
  onCheckOut,
  isCheckInLoading,
  isCheckOutLoading,
  disabledCheckIn,
  disabledCheckOut,
}: AttendanceCardProps) {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
      <h3 className="text-white font-semibold text-lg mb-6">
        {"Today's Attendance"}
      </h3>

      <div className="bg-[#2a2a2a] rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400 text-sm">Status</span>
          <span className="text-white font-semibold">{status}</span>
        </div>

        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400 text-sm">Current Time</span>
          <span className="text-white font-semibold">{currentTime}</span>
        </div>

        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400 text-sm">Check-In Time</span>
          <span className="text-white font-semibold">
            {checkInTime || "Not Checked In"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">Check-Out Time</span>
          <span className="text-white font-semibold">
            {checkOutTime || "Not Checked Out"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          onClick={onCheckIn}
          disabled={isCheckInLoading || disabledCheckIn}
          className="bg-green-600 hover:bg-green-700 text-white gap-2"
        >
          <CheckCircle className="h-4 w-4" />
          {isCheckInLoading ? "Checking In..." : "Check In"}
        </Button>

        <Button
          onClick={onCheckOut}
          disabled={isCheckOutLoading || disabledCheckOut}
          className="bg-red-600 hover:bg-red-700 text-white gap-2"
        >
          <XCircle className="h-4 w-4" />
          {isCheckOutLoading ? "Checking Out..." : "Check Out"}
        </Button>
      </div>
    </div>
  )
}
