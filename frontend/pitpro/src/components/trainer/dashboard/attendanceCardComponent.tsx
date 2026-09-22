import { useEffect, useState } from "react"
import { CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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

  titleColor?: string
  backgroundColor?: string
  innerBackgroundColor?: string
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
  titleColor = "text-white",
  backgroundColor = "bg-[#1a1a1a]",
  innerBackgroundColor = "bg-[#2a2a2a]",
}: AttendanceCardProps) {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div
      className={cn(
        backgroundColor,
        "border border-[#2a2a2a] rounded-lg p-4 sm:p-6 min-w-0"
      )}
    >
      <h3 className={cn("font-semibold text-base sm:text-lg mb-4 sm:mb-6", titleColor)}>
        {"Today's Attendance"}
      </h3>

      <div
        className={cn(
          innerBackgroundColor,
          "rounded-lg p-3 sm:p-4 mb-4 sm:mb-6"
        )}
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-gray-400 text-xs sm:text-sm shrink-0">Status</span>
          <span className="text-white text-sm sm:text-base font-semibold truncate text-right">{status}</span>
        </div>

        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-gray-400 text-xs sm:text-sm shrink-0">Current Time</span>
          <span className="text-white text-sm sm:text-base font-semibold truncate text-right">{currentTime}</span>
        </div>

        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-gray-400 text-xs sm:text-sm shrink-0">Check-In Time</span>
          <span className="text-white text-sm sm:text-base font-semibold truncate text-right">
            {checkInTime || "Not Checked In"}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="text-gray-400 text-xs sm:text-sm shrink-0">Check-Out Time</span>
          <span className="text-white text-sm sm:text-base font-semibold truncate text-right">
            {checkOutTime || "Not Checked Out"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <Button
          onClick={onCheckIn}
          disabled={isCheckInLoading || disabledCheckIn}
          className="bg-green-600 hover:bg-green-700 text-white gap-1.5 sm:gap-2 px-2 sm:px-4 text-xs sm:text-sm"
        >
          <CheckCircle className="h-4 w-4 shrink-0" />
          <span className="truncate">{isCheckInLoading ? "Checking In..." : "Check In"}</span>
        </Button>

        <Button
          onClick={onCheckOut}
          disabled={isCheckOutLoading || disabledCheckOut}
          className="bg-red-600 hover:bg-red-700 text-white gap-1.5 sm:gap-2 px-2 sm:px-4 text-xs sm:text-sm"
        >
          <XCircle className="h-4 w-4 shrink-0" />
          <span className="truncate">{isCheckOutLoading ? "Checking Out..." : "Check Out"}</span>
        </Button>
      </div>
    </div>
  )
}
