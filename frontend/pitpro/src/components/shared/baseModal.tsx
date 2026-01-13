import type React from "react";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  closeOnBackdrop?: boolean;
  backdropClassName?: string;
  containerClassName?: string;
}

export function BaseModal({
  isOpen,
  onClose,
  title,
  children,
  closeOnBackdrop = true,
  backdropClassName = "bg-black/50",
  containerClassName = "bg-zinc-900 border border-zinc-800",
}: BaseModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${backdropClassName}`}
      onClick={closeOnBackdrop ? onClose : undefined}
    >
      <div
        className={`relative w-full max-w-md rounded-lg p-6 ${containerClassName}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <h2 className="mb-4 text-xl font-semibold text-white">
          {title}
        </h2>

        {children}
      </div>
    </div>
  );
}
