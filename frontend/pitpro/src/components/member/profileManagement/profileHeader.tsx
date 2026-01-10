import { useRef, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Trash2 } from "lucide-react";
import ReactCrop, { Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { MemberDTO } from "./healthDetailsTab";
import {
  useUploadProfilePicture,
  useDeleteProfilePicture,
} from "@/hook/member/profileManagementHook";
interface ProfileHeaderProps {
  member: MemberDTO;
}

export function ProfileHeader({ member }: ProfileHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop | null>(null);
  const [showCropper, setShowCropper] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const uploadMutation = useUploadProfilePicture();
  const deleteMutation = useDeleteProfilePicture();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "suspended":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "inactive":
        return "bg-gray-600/20 text-gray-400 border-gray-600/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const initials = member.name
    .split(/\s+/)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) processFile(file);
  };

  const processFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setShowCropper(true);
  };

  const removeImage = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onImageLoad = (img: HTMLImageElement) => {
    imgRef.current = img;
    const cropInit = centerCrop(
      makeAspectCrop({ unit: "%", width: 80 }, 1, img.width, img.height),
      img.width,
      img.height
    );
    setCrop(cropInit);
  };

  const createCroppedImage = async (): Promise<File | null> => {
    if (!imgRef.current || !crop || !crop.width || !crop.height) return null;

    const image = imgRef.current;
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    return new Promise<File | null>((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) return resolve(null);
        resolve(new File([blob], "cropped-image.jpg", { type: "image/jpeg" }));
      }, "image/jpeg");
    });
  };

  const applyCrop = async () => {
    const croppedFile = await createCroppedImage();
    if (!croppedFile) return;

    const url = URL.createObjectURL(croppedFile);
    setPreviewUrl(url);
    uploadMutation.mutate(croppedFile);
    setShowCropper(false);
  };

  const handleDeleteImage = () => {
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    deleteMutation.mutate();
    setShowConfirmModal(false);
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
  };

  const isUploading = uploadMutation.isPending;
  const isDeleting = deleteMutation.isPending;

  return (
    <Card className="bg-[#0a0a0a] border border-gray-800 overflow-hidden rounded-2xl shadow-2xl">
      <div className="h-32 bg-gradient-to-r from-orange-600/30 to-orange-500/10" />

      <div className="px-4 md:px-8 pb-6 md:pb-8">
        <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6 -mt-16 md:-mt-20 mb-6">
          <div className="relative group">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-[#0a0a0a] ring-2 ring-orange-500/60 transition-all">
              <AvatarImage
                src={previewUrl ?? member.profileImg ?? undefined}
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

            {(previewUrl || member.profileImg) && (
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
              accept="image/*"
              hidden
              onChange={handleFileInput}
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

        {showCropper && previewUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="bg-[#0a0a0a] rounded-xl p-4 max-w-md w-full max-h-[90vh] flex flex-col">
              <h2 className="text-white text-lg font-bold mb-4">Crop Image</h2>

              <div className="flex-1 overflow-auto">
                <ReactCrop
                  crop={crop || undefined}
                  onChange={(newCrop) => setCrop(newCrop)}
                  aspect={1} 
                >
                  <img
                    src={previewUrl}
                    alt="To crop"
                    onLoad={(e) => onImageLoad(e.currentTarget)}
                    className="max-h-[60vh] w-auto mx-auto"
                  />
                </ReactCrop>
              </div>

              {/* Buttons always visible */}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => {
                    removeImage();
                    setShowCropper(false);
                  }}
                  className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={applyCrop}
                  className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}

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
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <Card className="bg-[#0a0a0a] p-6 max-w-sm w-full rounded-xl">
            <h2 className="text-white text-lg font-bold mb-4">
              Confirm Delete
            </h2>
            <p className="text-gray-400 mb-6">
              Are you sure you want to remove your profile picture? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </Card>
        </div>
      )}
    </Card>
  );
}
