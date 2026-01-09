import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"

interface OTPVerificationProps {
  icon?: React.ReactNode
  onSubmit: (otp: string) => Promise<void>
  onResend?: () => Promise<void>
}

const OTP_LENGTH = 6
const TIMER_SECONDS = 60

export function OTPVerification({ icon, onSubmit, onResend }: OTPVerificationProps) {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""))
  const [timer, setTimer] = useState(TIMER_SECONDS)
  const [canResend, setCanResend] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000)
      return () => clearInterval(interval)
    } else setCanResend(true)
  }, [timer])

  const handleInputChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)
    if (value && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) inputRefs.current[index - 1]?.focus()
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()
    if (/^\d+$/.test(pastedData) && pastedData.length === OTP_LENGTH) {
      setOtp(pastedData.split(""))
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

  // Professional dark modal theme
  const theme = {
    container:
      "fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4",
    card:
      "w-full max-w-md rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8 shadow-2xl",
    icon: "w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-6 text-orange-500",
    title: "text-center text-2xl font-bold mb-2 text-white",
    subtitle: "text-center text-sm mb-6 text-gray-400",
    inputContainer: "flex gap-3 justify-center mb-6",
    input:
      "w-12 h-12 text-center text-lg font-bold border-2 rounded-lg bg-gray-800 border-gray-700 text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-offset-1 transition-all duration-200 shadow-md",
    button:
      "w-full py-3 px-4 rounded-xl font-semibold bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50 shadow-lg hover:shadow-xl text-base transition-all duration-200",
    footer: "flex items-center justify-between text-sm text-gray-400",
    timer: "font-mono text-gray-400",
    resend:
      "text-gray-400 hover:text-orange-500 transition-colors duration-200 cursor-pointer underline font-medium",
    error: "text-red-500 text-center text-sm animate-pulse",
  }

  const minutesLeft = Math.floor(timer / 60)
  const secondsLeft = timer % 60

  return (
    <div className={theme.container}>
      <div className={theme.card}>
        <div className="text-center mb-6">
          {icon ? <div className={theme.icon}>{icon}</div> : <Lock className={theme.icon} />}
          <p className={theme.subtitle}>GYM ADMIN</p>
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

          {error && <p className={theme.error}>{error}</p>}

          <div className={theme.footer}>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className={theme.timer}>
                {minutesLeft}:{secondsLeft.toString().padStart(2, "0")}
              </span>
            </div>

            {canResend ? (
              <button type="button" onClick={handleResend} disabled={loading} className={theme.resend}>
                Resend OTP
              </button>
            ) : (
              <span className={`${theme.timer} opacity-70`}>
                Resend in {minutesLeft}:{secondsLeft.toString().padStart(2, "0")}
              </span>
            )}
          </div>

          <Button type="submit" disabled={loading || otp.join("").length !== OTP_LENGTH} className={theme.button}>
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Verifying...
              </span>
            ) : (
              "Validate OTP"
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
