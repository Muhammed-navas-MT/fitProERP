import type React from "react";
import {
  Building2,
  Upload,
  X,
  Crop
} from "lucide-react";

import { useState, useRef, useCallback } from "react";
import { SignupPayload } from "@/types/authPayload";
import ReactCrop, { type Crop as CropType, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface Props {
  formData: SignupPayload;
  onDataChange: (data: Partial<SignupPayload>) => void;
  errors: Record<string, string>;
}

export default function GymInformationStep({ formData, onDataChange, errors }: Props) {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);

  const [crop, setCrop] = useState<CropType>();
  const imgRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (["dragenter", "dragover"].includes(e.type)) setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) processFile(file);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) processFile(file);
  };

  const processFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onDataChange({ logo: file });
    setShowCropper(true);
  };

  const removeImage = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    onDataChange({ logo: null });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onImageLoad = (img: HTMLImageElement) => {
    imgRef.current = img;
    const cropInit = centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 80,
        },
        1,
        img.width,
        img.height
      ),
      img.width,
      img.height
    );

    setCrop(cropInit);
  };

  const createCroppedImage = async () => {
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

        const file = new File([blob], "cropped-image.jpg", { type: "image/jpeg" });
        resolve(file);
      }, "image/jpeg");
    });
  };

  const applyCrop = async () => {
    const croppedFile = await createCroppedImage();
    if (!croppedFile) return;

    const url = URL.createObjectURL(croppedFile);

    setPreviewUrl(url);
    onDataChange({ logo: croppedFile });

    setShowCropper(false);
  };

  return (
    <div className="rounded-2xl border border-orange-500/40 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black overflow-hidden shadow-[0_0_40px_-12px_rgba(249,115,22,0.4)]">
      
      {/* Header */}
      <div className="bg-black px-4 sm:px-8 py-6 text-center border-b border-neutral-800">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
            <Building2 className="h-7 w-7 text-white" />
          </div>
        </div>
        <h2 className="text-xl font-bold text-orange-500">Gym Information</h2>
        <p className="text-sm text-neutral-400">Details about your gym</p>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-4">
        <div>
          <label className="block text-sm text-neutral-300 mb-2">Gym Name</label>
          <input
            type="text"
            value={formData.gymName}
            onChange={(e) => onDataChange({ gymName: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-neutral-900 text-white border border-neutral-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            placeholder="FitZone Gym"
          />
          {errors.gymName && <p className="text-red-500 text-xs">{errors.gymName}</p>}
        </div>

        <div>
          <label className="block text-sm text-neutral-300 mb-2">Tagline</label>
          <input
            type="text"
            value={formData.tagline}
            onChange={(e) => onDataChange({ tagline: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-neutral-900 text-white border border-neutral-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            placeholder="BE YOUR OWN HERO"
          />
          {errors.tagline && <p className="text-red-500 text-xs">{errors.tagline}</p>}
        </div>

        <div>
          <label className="block text-sm text-neutral-300 mb-2">Gym Logo</label>

          {previewUrl ? (
            <div className="relative">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-48 object-contain rounded-lg border border-neutral-800 bg-black"
              />

              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => setShowCropper(true)}
                  className="p-2 bg-orange-500 text-white rounded-full shadow-md"
                >
                  <Crop className="h-4 w-4" />
                </button>
                <button
                  onClick={removeImage}
                  className="p-2 bg-red-600 text-white rounded-full shadow-md"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative px-4 py-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                dragActive
                  ? "border-orange-500 bg-orange-500/10"
                  : "border-neutral-700 bg-neutral-900"
              }`}
            >
              <div className="text-center">
                <Upload className="h-8 w-8 text-neutral-400 mx-auto mb-2" />
                <p className="text-neutral-400">
                  Click to upload or drag and drop
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="absolute inset-0 opacity-0"
              />
            </div>
          )}

          {errors.logo && <p className="text-red-500 text-xs">{errors.logo}</p>}
        </div>

        <div>
          <label className="block text-sm text-neutral-300 mb-2">Description</label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) => onDataChange({ description: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-neutral-900 text-white border border-neutral-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            placeholder="Describe your gym..."
          />
          {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
        </div>
      </div>

      {/* Crop Modal */}
      {showCropper && previewUrl && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
          <div className="bg-neutral-900 rounded-xl w-full max-w-3xl p-4 border border-neutral-800">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Crop Image</h3>
              <button onClick={() => setShowCropper(false)}>
                <X className="text-neutral-400" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-auto flex justify-center bg-black rounded-lg p-2">
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                keepSelection
                aspect={1}
              >
                <img
                  src={previewUrl}
                  onLoad={(e) => onImageLoad(e.currentTarget)}
                  alt="Crop"
                />
              </ReactCrop>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowCropper(false)}
                className="px-4 py-2 border border-neutral-700 text-neutral-300 rounded-lg hover:bg-neutral-800"
              >
                Cancel
              </button>

              <button
                onClick={applyCrop}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg shadow-md"
              >
                Apply Crop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
