import { Card } from "@/components/ui/card"
import { Mail, Phone, MapPin, AlertCircle } from "lucide-react"
import { MemberDTO } from "./healthDetailsTab"

interface PersonalInfoTabProps {
  member: MemberDTO
}

export function PersonalInfoTab({ member }: PersonalInfoTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Contact Information */}
      <Card className="bg-[#0a0a0a] border border-gray-800 p-6">
        <h3 className="text-lg md:text-xl font-semibold text-white mb-4">Contact Information</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Mail size={20} className="text-orange-500 mt-1 flex-shrink-0" />
            <div>
              <p className="text-xs md:text-sm text-gray-400 font-medium uppercase tracking-wide">
                Email Address
              </p>
              <p className="text-sm md:text-base text-white font-medium mt-1">{member.email}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone size={20} className="text-orange-500 mt-1 flex-shrink-0" />
            <div>
              <p className="text-xs md:text-sm text-gray-400 font-medium uppercase tracking-wide">
                Phone Number
              </p>
              <p className="text-sm md:text-base text-white font-medium mt-1">{member.phone}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={20} className="text-orange-500 mt-1 flex-shrink-0" />
            <div>
              <p className="text-xs md:text-sm text-gray-400 font-medium uppercase tracking-wide">Address</p>
              <p className="text-sm md:text-base text-white font-medium mt-1">{member.address}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Emergency Contact */}
      <Card className="bg-[#0a0a0a] border border-gray-800 p-6">
        <h3 className="text-lg md:text-xl font-semibold text-white mb-4">Emergency Contact</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="text-orange-500 mt-1 flex-shrink-0" />
            <div>
              <p className="text-xs md:text-sm text-gray-400 font-medium uppercase tracking-wide">
                Emergency Number
              </p>
              <p className="text-sm md:text-base text-white font-medium mt-1">{member.emergencyNumber}</p>
            </div>
          </div>
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
              This number will be contacted in case of any medical emergency during your gym activities.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
