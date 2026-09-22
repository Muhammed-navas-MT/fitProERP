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
  backdropClassName = "bg-black/50 backdrop-blur-sm",
  containerClassName = "bg-zinc-900 border border-zinc-800",
}: BaseModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0 ${backdropClassName}`}
      onClick={closeOnBackdrop ? onClose : undefined}
    >
      <div
        className={`relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-xl p-5 sm:p-6 shadow-2xl ${containerClassName}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <h2 className="mb-4 text-lg sm:text-xl font-semibold text-white">
          {title}
        </h2>

        {children}
      </div>
    </div>
  );
}
