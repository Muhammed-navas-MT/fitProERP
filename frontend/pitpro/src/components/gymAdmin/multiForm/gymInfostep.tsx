import type React from "react";
import { Building2} from "lucide-react";
import { useState } from "react";
import { SignupPayload } from "@/types/authPayload";

interface Props {
  formData: SignupPayload;
  onDataChange: (data: Partial<SignupPayload>) => void;
  errors: Record<string, string>;
}

export default function GymInformationStep({ formData, onDataChange, errors }: Props) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      onDataChange({ logo: file });
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      onDataChange({ logo: file });
    }
  };

  return (
    <div className="rounded-xl border-2 border-orange-500 bg-gray-800 overflow-hidden">
      <div className="bg-black px-8 py-8 text-center border-b border-gray-700">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center">
            <Building2 className="h-8 w-8 text-white" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-orange-500 mb-2">Gym Information</h2>
        <p className="text-sm text-gray-400">Details about your gym</p>
      </div>

      <div className="px-8 py-8 space-y-6">
        <div>
          <label className="block text-sm text-gray-300 mb-2">Gym Name</label>
          <input
            type="text"
            value={formData.gymName}
            onChange={(e) => onDataChange({ gymName: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-orange-500"
            placeholder="FitZone Gym"
          />
          {errors.gymName && <p className="text-red-500 text-xs">{errors.gymName}</p>}
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">Tagline</label>
          <input
            type="text"
            value={formData.tagline}
            onChange={(e) => onDataChange({ tagline: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-orange-500"
            placeholder="BE YOUR OWN HERO"
          />
          {errors.tagline && <p className="text-red-500 text-xs">{errors.tagline}</p>}
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">Gym Logo</label>
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative px-4 py-3 rounded-lg border-2 border-dashed cursor-pointer transition ${
              dragActive ? "border-orange-500 bg-orange-500/10" : "border-gray-600 bg-gray-700"
            }`}
          >
            {formData.logo ? (
              <p className="text-gray-300 text-sm">{formData.logo.name}</p>
            ) : (
              <p className="text-gray-400 text-sm">Upload or Drag Image</p>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          {errors.logo && <p className="text-red-500 text-xs">{errors.logo}</p>}
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">Description</label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) => onDataChange({ description: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-orange-500"
          />
          {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
        </div>
      </div>
    </div>
  );
}
