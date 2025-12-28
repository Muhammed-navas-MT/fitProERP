import { Mail, Phone } from "lucide-react"

interface OwnerInfoCardProps {
  name: string
  email: string
  phone: string
}

export default function OwnerInfoCard({ name, email, phone }: OwnerInfoCardProps) {
  return (
    <div className="bg-[#0a0b0d] border border-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-6">Owner Information</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">{name}</h3>
        </div>
        <div className="flex items-center gap-3 text-gray-400">
          <Mail className="h-4 w-4 flex-shrink-0" />
          <span className="text-sm">{email}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-400">
          <Phone className="h-4 w-4 flex-shrink-0" />
          <span className="text-sm">{phone}</span>
        </div>
      </div>
    </div>
  )
}
