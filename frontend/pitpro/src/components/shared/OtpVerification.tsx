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
      container: "min-h-screen flex items-center justify-center p-4",
      card: "w-full max-w-md rounded-2xl border p-8",
      icon: "w-12 h-12 mx-auto mb-6",
      title: "text-center text-2xl font-bold mb-2",
      subtitle: "text-center text-sm mb-8",
      inputContainer: "flex gap-3 justify-center mb-6",
      input:
        "w-12 h-12 text-center text-xl font-bold border-2 rounded-lg transition-colors focus:outline-none focus:border-current",
      button: "w-full py-3 rounded-lg font-semibold transition-all",
      footer: "flex items-center justify-between text-xs",
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
          input: `${baseClasses.input} bg-gray-700 border-gray-600 text-white focus:border-orange-500`,
          button: `${baseClasses.button} bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50`,
          footer: `${baseClasses.footer} text-gray-400`,
          timer: `${baseClasses.timer} text-gray-400`,
          resend: `${baseClasses.resend} text-gray-400 hover:text-orange-500`,
          icon: `${baseClasses.icon} text-orange-500`,
        }
      case "TRAINER":
        return {
          ...baseClasses,
          container: `${baseClasses.container} bg-gray-950`,
          card: `${baseClasses.card} bg-gray-800 border-orange-500`,
          title: `${baseClasses.title} text-white`,
          subtitle: `${baseClasses.subtitle} text-gray-400`,
          input: `${baseClasses.input} bg-gray-700 border-gray-600 text-white focus:border-orange-500`,
          button: `${baseClasses.button} bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50`,
          footer: `${baseClasses.footer} text-gray-400`,
          timer: `${baseClasses.timer} text-gray-400`,
          resend: `${baseClasses.resend} text-gray-400 hover:text-orange-500`,
          icon: `${baseClasses.icon} text-white`,
        }
      case "MEMBER":
        return {
          ...baseClasses,
          container: `${baseClasses.container} bg-purple-950`,
          card: `${baseClasses.card} bg-purple-900 border-purple-700`,
          title: `${baseClasses.title} text-white`,
          subtitle: `${baseClasses.subtitle} text-purple-200`,
          input: `${baseClasses.input} bg-purple-800 border-purple-700 text-white focus:border-blue-400`,
          button: `${baseClasses.button} bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50`,
          footer: `${baseClasses.footer} text-purple-300`,
          timer: `${baseClasses.timer} text-purple-300`,
          resend: `${baseClasses.resend} text-purple-300 hover:text-blue-400`,
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
          <p className={`${theme.subtitle} mb-4`}>GYM ADMIN</p>
          <h1 className={theme.title}>OTP Verification</h1>
          <p className={theme.subtitle}>Enter the OTP sent to your Email </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className={theme.inputContainer}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={theme.input}
                placeholder="-"
                disabled={loading}
                autoComplete="off"
              />
            ))}
          </div>
          {error && (
            <p className={`text-center text-sm ${userType === "MEMBER" ? "text-red-300" : "text-red-400"}`}>{error}</p>
          )}

          <div className={theme.footer}>
            <span className={theme.timer}>
              {minutesLeft}:{secondsLeft.toString().padStart(2, "0")}
            </span>
            {canResend ? (
              <button
                type="button"
                onClick={handleResend}
                disabled={loading}
                className={`${theme.resend} cursor-pointer`}
              >
                Resend OTP
              </button>
            ) : (
              <span className={theme.timer}>Do not receive code? Resend</span>
            )}
          </div>
          <Button type="submit" disabled={loading || otp.join("").length !== OTP_LENGTH} className={theme.button}>
            {loading ? "Verifying..." : "Validate OTP"}
          </Button>
        </form>
      </div>
    </div>
  )
}
