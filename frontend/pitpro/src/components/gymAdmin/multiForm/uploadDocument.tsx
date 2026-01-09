import type React from "react";
import {
  FileText,
  Upload,
  X,
  Crop,
  FileImage
} from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { SignupPayload } from "@/types/authPayload";
import ReactCrop, { type Crop as CropType } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";


interface Props {
  formData: SignupPayload;
  onDataChange: (data: Partial<SignupPayload>) => void;
  errors: Record<string, string>;
}

export default function UploadDocumentsStep({
  formData,
  onDataChange,
  errors,
}: Props) {
  const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({});
  const [showCropper, setShowCropper] = useState<string | null>(null);

  const [crop, setCrop] = useState<CropType>({
    unit: "%",
    width: 50,
    aspect: 1,
  });

  const [completedCrop, setCompletedCrop] = useState<CropType | null>(null);

  const imageRef = useRef<HTMLImageElement | null>(null);
  const businessLicenseRef = useRef<HTMLInputElement>(null);
  const insuranceCertificateRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  },[]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  },[]);

  const handleDrop = useCallback(
    (e: React.DragEvent, field: string) => {
      e.preventDefault();
      e.stopPropagation();

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        processFile(e.dataTransfer.files[0], field);
      }
    },[]);

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const file = e.target.files?.[0];
    if (file) processFile(file, field);
  };

  const processFile = (file: File, field: string) => {
    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewUrls((prev) => ({ ...prev, [field]: url }));
    } else {
      setPreviewUrls((prev) => ({ ...prev, [field]: "file" }));
    }
    onDataChange({ [field]: file });
  };

  const removeFile = (field: string) => {
    if (previewUrls[field] && previewUrls[field] !== "file") {
      URL.revokeObjectURL(previewUrls[field]);
    }

    setPreviewUrls((prev) => {
      const newUrls = { ...prev };
      delete newUrls[field];
      return newUrls;
    });

    onDataChange({ [field]: null });

    if (field === "businessLicense" && businessLicenseRef.current)
      businessLicenseRef.current.value = "";
    if (field === "insuranceCertificate" && insuranceCertificateRef.current)
      insuranceCertificateRef.current.value = "";
  };

  const openCropper = (field: string) => {
    setShowCropper(field);
    setCompletedCrop(null);
    setCrop({ unit: "%", width: 50, aspect: 1 });
  };

  const closeCropper = () => setShowCropper(null);

  const applyCrop = async () => {
    if (!completedCrop || !imageRef.current) return;

    const canvas = document.createElement("canvas");
    const img = imageRef.current;

    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;

    canvas.width = completedCrop.width!;
    canvas.height = completedCrop.height!;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(
      img,
      completedCrop.x! * scaleX,
      completedCrop.y! * scaleY,
      completedCrop.width! * scaleX,
      completedCrop.height! * scaleY,
      0,
      0,
      completedCrop.width!,
      completedCrop.height!
    );

    canvas.toBlob((blob) => {
      if (!blob) return;

      const file = new File([blob], "cropped-image.jpg", {
        type: "image/jpeg",
      });

      const url = URL.createObjectURL(file);
      setPreviewUrls((prev) => ({ ...prev, [showCropper!]: url }));

      onDataChange({ [showCropper!]: file });

      closeCropper();
    }, "image/jpeg");
  };

  const isImage = (field: string) => {
    const file = formData[field as keyof SignupPayload] as File;
    return file && file.type.startsWith("image/");
  };

  const getFileName = (field: string) => {
    const file = formData[field as keyof SignupPayload] as File;
    return file ? file.name : "";
  };

  return (
    <div className="rounded-2xl border border-orange-500/40 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black overflow-hidden shadow-[0_0_40px_-12px_rgba(249,115,22,0.4)]">
      <div className="bg-black px-4 sm:px-8 py-6 sm:py-8 text-center border-b border-neutral-800">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
            <FileText className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-orange-500 mb-2">
          Upload Documents
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400">
          Required documents for verification
        </p>
      </div>

      <div className="px-4 sm:px-8 py-6 sm:py-8 space-y-4 sm:space-y-6">
        <DocumentUploader
          label="Business License"
          field="businessLicense"
          previewUrls={previewUrls}
          isImage={isImage}
          getFileName={getFileName}
          removeFile={removeFile}
          openCropper={openCropper}
          handleDrag={handleDrag}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          handleFileSelect={handleFileSelect}
          inputRef={businessLicenseRef}
          error={errors.businessLicense}
        />

        <DocumentUploader
          label="Insurance Certificate"
          field="insuranceCertificate"
          previewUrls={previewUrls}
          isImage={isImage}
          getFileName={getFileName}
          removeFile={removeFile}
          openCropper={openCropper}
          handleDrag={handleDrag}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          handleFileSelect={handleFileSelect}
          inputRef={insuranceCertificateRef}
          error={errors.insuranceCertificate}
        />
      </div>

      {showCropper &&
        previewUrls[showCropper] &&
        previewUrls[showCropper] !== "file" && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-b from-neutral-900 via-neutral-950 to-black rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col shadow-[0_0_40px_-12px_rgba(249,115,22,0.4)]">
              <div className="flex justify-between items-center p-4 border-b border-neutral-800">
                <h3 className="text-lg font-semibold text-white">Crop Image</h3>
                <button
                  onClick={closeCropper}
                  className="p-2 rounded-full hover:bg-neutral-800 transition-colors"
                >
                  <X className="h-5 w-5 text-neutral-400" />
                </button>
              </div>

              <div className="flex-1 p-4 overflow-hidden">
                <ReactCrop
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={1}
                  className="flex justify-center items-center"
                >
                  <img
                    ref={imageRef}
                    src={previewUrls[showCropper]}
                    alt="Crop"
                    className="max-h-[60vh]"
                  />
                </ReactCrop>
              </div>

              <div className="p-4 border-t border-neutral-800 flex justify-end gap-2">
                <button
                  onClick={closeCropper}
                  className="px-4 py-2 rounded-lg border border-neutral-700 text-neutral-300 hover:bg-neutral-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={applyCrop}
                  className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors"
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

interface DocUploaderProps {
  label: string;
  field: string;
  previewUrls: Record<string, string>;
  isImage: (field: string) => boolean;
  getFileName: (field: string) => string;
  removeFile: (field: string) => void;
  openCropper: (field: string) => void;
  handleDrag: (e: React.DragEvent) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent, field: string) => void;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  error?: string;
}

function DocumentUploader({
  label,
  field,
  previewUrls,
  isImage,
  getFileName,
  removeFile,
  openCropper,
  handleDrag,
  handleDragOver,
  handleDrop,
  handleFileSelect,
  inputRef,
  error,
}: DocUploaderProps) {
  return (
    <div>
      <label className="block text-sm text-neutral-300 mb-2">{label}</label>

      {previewUrls[field] ? (
        <div className="relative">
          {isImage(field) ? (
            <div className="rounded-lg overflow-hidden border-2 border-neutral-700 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black">
              <img
                src={previewUrls[field]}
                alt="Preview"
                className="w-full h-48 object-contain"
              />
            </div>
          ) : (
            <div className="rounded-lg border-2 border-neutral-700 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black p-6 flex items-center justify-center">
              <div className="text-center">
                <FileImage className="h-12 w-12 text-neutral-400 mx-auto mb-2" />
                <p className="text-neutral-300 text-sm truncate max-w-xs">
                  {getFileName(field)}
                </p>
                <p className="text-neutral-500 text-xs mt-1">Document uploaded</p>
              </div>
            </div>
          )}

          <div className="absolute top-2 right-2 flex gap-2">
            {isImage(field) && (
              <button
                onClick={() => openCropper(field)}
                className="p-2 bg-orange-500 rounded-full text-white hover:bg-orange-600 transition-colors shadow-lg"
                title="Crop Image"
              >
                <Crop className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={() => removeFile(field)}
              className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors shadow-lg"
              title="Remove File"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragEnter={(e) => handleDrag(e)}
          onDragLeave={(e) => handleDrag(e)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, field)}
          className={`relative px-4 sm:px-6 py-6 sm:py-8 rounded-lg border-2 border-dashed text-center transition-all ${
            previewUrls[field]
              ? "border-orange-500 bg-orange-500/10"
              : "border-neutral-700 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black hover:bg-neutral-800"
          }`}
        >
          <div className="flex flex-col items-center justify-center">
            <Upload className="h-8 w-8 text-neutral-400 mb-2" />
            <p className="text-neutral-400 text-sm text-center">
              Click to upload or drag and drop
            </p>
            <p className="text-neutral-500 text-xs mt-1">PDF, JPG, PNG (max. 5MB)</p>
          </div>

          <input
            ref={inputRef}
            type="file"
            onChange={(e) => handleFileSelect(e, field)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
