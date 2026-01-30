import { Upload, X, Crop, FileImage } from "lucide-react";
import React from "react";

/* ================= TYPES ================= */

export type DocumentField = "businessLicense" | "insuranceCertificate";

interface DocumentUploaderProps {
  label: string;
  field: DocumentField;
  preview: string | null;
  onFile: (e: React.ChangeEvent<HTMLInputElement>, field: DocumentField) => void;
  onRemove: (field: DocumentField) => void;
  onCrop: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

/* ================= COMPONENT ================= */

const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  label,
  field,
  preview,
  onFile,
  onRemove,
  onCrop,
  inputRef,
}) => {
  return (
    <div className="border border-neutral-800 rounded-xl p-5 bg-black">
      <h3 className="text-white mb-2 font-medium">{label}</h3>

      {preview ? (
        <div className="relative">
          {preview !== "file" ? (
            <img
              src={preview}
              alt={`${label} preview`}
              className="h-48 w-full object-contain rounded-lg"
            />
          ) : (
            <div className="text-neutral-300 flex items-center gap-2">
              <FileImage className="h-5 w-5" />
              <span>File uploaded</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              type="button"
              onClick={onCrop}
              className="bg-orange-500/20 p-2 rounded-lg hover:bg-orange-500/30 transition"
            >
              <Crop className="text-orange-500 h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => onRemove(field)}
              className="bg-red-500/20 p-2 rounded-lg hover:bg-red-500/30 transition"
            >
              <X className="text-red-400 h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <label className="block border-2 border-dashed border-neutral-700 rounded-lg p-6 text-center cursor-pointer hover:border-orange-500 transition">
          <Upload className="mx-auto text-orange-500 h-6 w-6" />
          <p className="text-neutral-400 text-sm mt-2">
            Click or drag & drop file
          </p>

          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={(e) => onFile(e, field)}
          />
        </label>
      )}
    </div>
  );
};

export default DocumentUploader;
