import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateGymAdminProfileFormValues,
  updateGymAdminProfileSchema,
} from "@/validation/updateGymAdminSchema";

interface GymAdminData {
  ownerName: string;
  phone: string;
  description: string;
  tagline: string;
  logo: string;
}

interface UpdateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: GymAdminData;
  onSubmit: (formData: FormData) => void;
}

export function UpdateProfileModal({
  isOpen,
  onClose,
  data,
  onSubmit,
}: UpdateProfileModalProps) {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | undefined>(data.logo);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateGymAdminProfileFormValues>({
    resolver: zodResolver(updateGymAdminProfileSchema),
    defaultValues: {
      ownerName: data.ownerName,
      phone: data.phone,
      description: data.description,
      tagline: data.tagline,
    },
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onFormSubmit = (values: UpdateGymAdminProfileFormValues) => {
    const formData = new FormData();

    if (values.ownerName) {
      formData.append("ownerName", values.ownerName);
    }

    if (values.phone) {
      formData.append("phone", values.phone);
    }

    if (values.description) {
      formData.append("description", values.description);
    }

    if (values.tagline) {
      formData.append("tagline", values.tagline);
    }

    if (logoFile) {
      formData.append("logo", logoFile);
    }

    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-xl border bg-black  border-orange-500/20 shadow-xl">
        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">Update Profile</h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="space-y-5 px-6 py-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Gym Logo
            </label>

            <div className="flex items-center gap-4">
              <div className="h-20 w-20 overflow-hidden rounded-lg border border-zinc-900 bg-zinc-800">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-zinc-500">
                    No Logo
                  </div>
                )}
              </div>

              <label className="cursor-pointer rounded-md bg-zinc-800 px-4 py-2 text-sm text-white hover:bg-zinc-700 transition">
                Change Logo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-300">
              Owner Name
            </label>
            <input
              {...register("ownerName")}
              className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              placeholder="Enter owner name"
            />
            {errors.ownerName && (
              <p className="mt-1 text-xs text-red-500">
                {errors.ownerName.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-300">
              Phone
            </label>
            <input
              {...register("phone")}
              className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              placeholder="+91 9876543210"
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-300">
              Description
            </label>
            <textarea
              {...register("description")}
              rows={3}
              className="w-full resize-none rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              placeholder="Short description about the gym"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-300">
              Tagline
            </label>
            <input
              {...register("tagline")}
              className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              placeholder="Your fitness journey starts here"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-md border border-zinc-700 bg-zinc-800 py-2 text-white hover:bg-zinc-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-md bg-orange-500 py-2 font-medium text-white hover:bg-orange-600 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
