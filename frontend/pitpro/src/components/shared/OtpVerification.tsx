import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"

interface OTPVerificationProps {
  userType: "MEMBER" | "TRAINER" | "GYMADMIN"
  icon?: React.ReactNode
  onSubmit: (otp: string) => Promise<void>
  onResend?: () => Promise<void>
}

const OTP_LENGTH = 6
const TIMER_SECONDS = 60

export function OTPVerification({ userType, icon, onSubmit, onResend }: OTPVerificationProps) {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState(TIMER_SECONDS)
  const [canResend, setCanResend] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    } else if (timer === 0) {
      setCanResend(true)
    }
  }, [timer])

  const handleInputChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text/plain').trim()
    if (/^\d+$/.test(pastedData) && pastedData.length === OTP_LENGTH) {
      const newOtp = pastedData.split('')
      setOtp(newOtp)
      inputRefs.current[OTP_LENGTH - 1]?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const otpValue = otp.join("")

    if (otpValue.length !== OTP_LENGTH) {
      setError("Please enter all 6 digits")
      return
    }

    setLoading(true)
    setError("")

    try {
      await onSubmit(otpValue)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to verify OTP")
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (!canResend || !onResend) return

    try {
      setLoading(true)
      await onResend()
      setTimer(TIMER_SECONDS)
      setCanResend(false)
      setOtp(Array(OTP_LENGTH).fill(""))
      setError("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend OTP")
    } finally {
      setLoading(false)
    }
  }

  const getThemeClasses = () => {
    const baseClasses = {
      container: "min-h-screen flex items-center justify-center p-4 sm:p-6",
      card: "w-full max-w-md rounded-2xl border p-6 sm:p-8 shadow-xl",
      icon: "w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-6",
      title: "text-center text-xl sm:text-2xl font-bold mb-2",
      subtitle: "text-center text-sm sm:text-base mb-8",
      inputContainer: "flex gap-2 sm:gap-3 justify-center mb-6",
      input:
        "w-10 h-10 sm:w-12 sm:h-12 text-center text-lg sm:text-xl font-bold border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50",
      button: "w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 text-sm sm:text-base",
      footer: "flex items-center justify-between text-xs sm:text-sm",
      timer: "font-mono",
      resend: "text-center",
    }

    switch (userType) {
      case "GYMADMIN":
        return {
          ...baseClasses,
          container: `${baseClasses.container} bg-gray-900`,
          card: `${baseClasses.card} bg-gray-800 border-orange-500`,
          title: `${baseClasses.title} text-white`,
          subtitle: `${baseClasses.subtitle} text-gray-400`,
          input: `${baseClasses.input} bg-gray-700 border-gray-600 text-white focus:border-orange-500 focus:ring-orange-500`,
          button: `${baseClasses.button} bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50 shadow-lg hover:shadow-xl`,
          footer: `${baseClasses.footer} text-gray-400`,
          timer: `${baseClasses.timer} text-gray-400`,
          resend: `${baseClasses.resend} text-gray-400 hover:text-orange-500 transition-colors duration-200`,
          icon: `${baseClasses.icon} text-orange-500`,
        }
      case "TRAINER":
        return {
          ...baseClasses,
          container: `${baseClasses.container} bg-gray-950`,
          card: `${baseClasses.card} bg-gray-800 border-orange-500`,
          title: `${baseClasses.title} text-white`,
          subtitle: `${baseClasses.subtitle} text-gray-400`,
          input: `${baseClasses.input} bg-gray-700 border-gray-600 text-white focus:border-orange-500 focus:ring-orange-500`,
          button: `${baseClasses.button} bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50 shadow-lg hover:shadow-xl`,
          footer: `${baseClasses.footer} text-gray-400`,
          timer: `${baseClasses.timer} text-gray-400`,
          resend: `${baseClasses.resend} text-gray-400 hover:text-orange-500 transition-colors duration-200`,
          icon: `${baseClasses.icon} text-white`,
        }
      case "MEMBER":
        return {
          ...baseClasses,
          container: `${baseClasses.container} bg-purple-950`,
          card: `${baseClasses.card} bg-purple-900 border-purple-700`,
          title: `${baseClasses.title} text-white`,
          subtitle: `${baseClasses.subtitle} text-purple-200`,
          input: `${baseClasses.input} bg-purple-800 border-purple-700 text-white focus:border-blue-400 focus:ring-blue-400`,
          button: `${baseClasses.button} bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 shadow-lg hover:shadow-xl`,
          footer: `${baseClasses.footer} text-purple-300`,
          timer: `${baseClasses.timer} text-purple-300`,
          resend: `${baseClasses.resend} text-purple-300 hover:text-blue-400 transition-colors duration-200`,
          icon: `${baseClasses.icon} text-blue-400`,
        }
      default:
        return baseClasses
    }
  }

  const theme = getThemeClasses()
  const minutesLeft = Math.floor(timer / 60)
  const secondsLeft = timer % 60

  return (
    <div className={theme.container}>
      <div className={theme.card}>
        <div className="text-center mb-8">
          {icon ? <div className={theme.icon}>{icon}</div> : <Lock className={theme.icon} />}
          <p className={`${theme.subtitle} mb-4 font-medium`}>GYM ADMIN</p>
          <h1 className={theme.title}>OTP Verification</h1>
          <p className={theme.subtitle}>Enter the OTP sent to your Email</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className={theme.inputContainer} onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={theme.input}
                placeholder="-"
                disabled={loading}
                autoComplete="one-time-code"
                aria-label={`OTP digit ${index + 1}`}
              />
            ))}
          </div>
          {error && (
            <div className="animate-pulse">
              <p className={`text-center text-sm ${userType === "MEMBER" ? "text-red-300" : "text-red-400"}`}>{error}</p>
            </div>
          )}

          <div className={theme.footer}>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className={theme.timer}>
                {minutesLeft}:{secondsLeft.toString().padStart(2, "0")}
              </span>
            </div>
            {canResend ? (
              <button
                type="button"
                onClick={handleResend}
                disabled={loading}
                className={`${theme.resend} cursor-pointer underline font-medium`}
              >
                Resend OTP
              </button>
            ) : (
              <span className={`${theme.timer} opacity-70`}>Resend in {minutesLeft}:{secondsLeft.toString().padStart(2, "0")}</span>
            )}
          </div>
          <Button 
            type="submit" 
            disabled={loading || otp.join("").length !== OTP_LENGTH} 
            className={theme.button}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </span>
            ) : "Validate OTP"}
          </Button>
        </form>
      </div>
    </div>
  )
}