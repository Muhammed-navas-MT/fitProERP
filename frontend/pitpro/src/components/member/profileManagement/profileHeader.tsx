import { useRef } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Trash2 } from "lucide-react"

import { MemberDTO } from "./healthDetailsTab"
import {
  useUploadProfilePicture,
  useDeleteProfilePicture,
} from "@/hook/member/profileManagementHook"
import { getCroppedImage } from "@/utils/cropImage"
import { toast } from "sonner"

interface ProfileHeaderProps {
  member: MemberDTO
}

export function ProfileHeader({ member }: ProfileHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadMutation = useUploadProfilePicture()
  const deleteMutation = useDeleteProfilePicture()

  const getStatusColor = (status: string) => {
    const lower = status.toLowerCase()
    switch (lower) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "suspended":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "inactive":
        return "bg-gray-600/20 text-gray-400 border-gray-600/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const initials = member.name
    .split(/\s+/)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })

      const targetSize = 512;

      const croppedFile = await getCroppedImage(base64, {
        x: 0,
        y: 0,
        width: targetSize,
        height: targetSize,
      })
      uploadMutation.mutate(croppedFile)
    } catch (err) {
      console.error("Profile picture processing failed:", err)
      toast.error("Failed to process image. Please try another photo.")
    } finally {
      e.target.value = ""
    }
  }

  const handleDeleteImage = () => {
    if (window.confirm("Remove profile picture?")) {
      deleteMutation.mutate()
    }
  }

  const isUploading = uploadMutation.isPending
  const isDeleting = deleteMutation.isPending

  return (
    <Card className="bg-[#0a0a0a] border border-gray-800 overflow-hidden rounded-2xl shadow-2xl">
      <div className="h-32 bg-gradient-to-r from-orange-600/30 to-orange-500/10" />

      <div className="px-4 md:px-8 pb-6 md:pb-8">
        <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6 -mt-16 md:-mt-20 mb-6">
          <div className="relative group">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-[#0a0a0a] ring-2 ring-orange-500/60 transition-all">
              <AvatarImage
                src={member.profileImg ?? undefined}
                alt={`${member.name}'s profile`}
              />
              <AvatarFallback className="bg-orange-600 text-white text-lg md:text-2xl font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>

            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-1 right-1 bg-black/70 p-2 rounded-full hover:bg-black/90 transition-colors disabled:opacity-50"
              title="Change profile picture"
            >
              <Camera className="h-4 w-4 text-white" />
            </button>

            {member.profileImg && (
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteImage}
                className="absolute top-1 right-1 bg-black/70 p-2 rounded-full hover:bg-black/90 transition-colors disabled:opacity-50"
                title="Remove profile picture"
              >
                <Trash2 className="h-4 w-4 text-red-400" />
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              hidden
              onChange={handleFileChange}
            />
          </div>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {member.name}
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                  {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                </p>
              </div>

              <Badge
                variant="outline"
                className={`${getStatusColor(member.status)} border px-3 py-1 text-sm font-medium`}
              >
                {member.status}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-gray-800">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-1">
              Email
            </p>
            <p className="text-sm font-medium text-white truncate">
              {member.email}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-1">
              Phone
            </p>
            <p className="text-sm font-medium text-white">
              {member.phone || "—"}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-1">
              Member ID
            </p>
            <p className="text-sm font-medium text-white font-mono">
              {member.id.substring(0, 8)}...
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-1">
              Gym Branch
            </p>
            <p className="text-sm font-medium text-white">
              {member.branchId || "Main Branch"}
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}