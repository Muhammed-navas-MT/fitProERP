import type React from "react";
import { Upload, FileText } from "lucide-react";
import { useState } from "react";
import { SignupPayload } from "@/types/authPayload";

interface Props {
  formData: SignupPayload;
  onDataChange: (data: Partial<SignupPayload>) => void;
  errors: any;
}

export default function UploadDocumentsStep({ formData, onDataChange, errors }: Props) {
  const [dragActive, setDragActive] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent, field: string) => {
    e.preventDefault();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(field);
    if (e.type === "dragleave") setDragActive(null);
  };

  const handleDrop = (e: React.DragEvent, field: string) => {
    e.preventDefault();
    setDragActive(null);
    const file = e.dataTransfer.files?.[0];
    if (file) onDataChange({ [field]: file });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file) onDataChange({ [field]: file });
  };

  return (
    <div className="rounded-xl border-2 border-orange-500 bg-gray-800 overflow-hidden">
      <div className="bg-black px-8 py-8 text-center border-b border-gray-700">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center">
            <FileText className="h-8 w-8 text-white" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-orange-500 mb-2">Upload Documents</h2>
        <p className="text-sm text-gray-400">Required documents for verification</p>
      </div>

      <div className="px-8 py-8 space-y-6">

        <div>
          <label className="block text-sm text-gray-300 mb-2">Business License</label>

          <div
            onDragEnter={(e) => handleDrag(e, "businessLicense")}
            onDragLeave={(e) => handleDrag(e, "businessLicense")}
            onDragOver={(e) => handleDrag(e, "businessLicense")}
            onDrop={(e) => handleDrop(e, "businessLicense")}
            className={`relative px-6 py-6 rounded-lg border-2 border-dashed text-center ${
              dragActive === "businessLicense"
                ? "border-orange-500 bg-orange-500/10"
                : "border-gray-600 bg-gray-700"
            }`}
          >
            {formData.businessLicense ? (
              <p className="text-gray-300 text-sm">{formData.businessLicense.name}</p>
            ) : (
              <p className="text-gray-400 text-sm">Upload JPG/PDF</p>
            )}

            <input
              type="file"
              onChange={(e) => handleFileSelect(e, "fitnessLicense")}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          {errors.fitnessLicense && <p className="text-red-400 text-xs">{errors.fitnessLicense}</p>}
        </div>

        {/* INSURANCE CERTIFICATE */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">Insurance Certificate</label>

          <div
            onDragEnter={(e) => handleDrag(e, "insuranceCertificate")}
            onDragLeave={(e) => handleDrag(e, "insuranceCertificate")}
            onDragOver={(e) => handleDrag(e, "insuranceCertificate")}
            onDrop={(e) => handleDrop(e, "insuranceCertificate")}
            className={`relative px-6 py-6 rounded-lg border-2 border-dashed text-center ${
              dragActive === "insuranceCertificate"
                ? "border-orange-500 bg-orange-500/10"
                : "border-gray-600 bg-gray-700"
            }`}
          >
            {formData.insuranceCertificate ? (
              <p className="text-gray-300 text-sm">{formData.insuranceCertificate.name}</p>
            ) : (
              <p className="text-gray-400 text-sm">Upload JPG/PDF</p>
            )}

            <input
              type="file"
              onChange={(e) => handleFileSelect(e, "insuranceCertificate")}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          {errors.insuranceCertificate && (
            <p className="text-red-400 text-xs">{errors.insuranceCertificate}</p>
          )}
        </div>
      </div>
    </div>
  );
}
