import type React from "react"

interface BaseModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  backdropClassName?: string
  containerClassName?: string
}

export function BaseModal({
  isOpen,
  onClose,
  title,
  children,
  backdropClassName = "bg-black/50",
  containerClassName = "bg-zinc-900 border border-zinc-800",
}: BaseModalProps) {
  if (!isOpen) return null

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${backdropClassName}`}
      onClick={onClose}
    >
      <div
        className={`rounded-lg p-6 w-full max-w-md ${containerClassName}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
        {children}
      </div>
    </div>
  )
}
