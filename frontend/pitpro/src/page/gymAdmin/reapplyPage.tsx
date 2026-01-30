import { ShieldCheck } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import ReactCrop, { Crop as CropType } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useReUploadDocument } from "@/hook/gymAdmin/reApplyHook";
import { useDispatch, useSelector } from "react-redux";
import { rootstate } from "@/store/store";
import { toast } from "sonner";
import { clearGymAdminData } from "@/store/slice/gymAdminSlice";
import { clearAuthContext } from "@/store/slice/authContextState";
import { deleteToken } from "@/store/slice/tokenSlice";
import DocumentUploader from "@/components/gymAdmin/reDocumentUploader";

type DocumentField = "businessLicense" | "insuranceCertificate";

type DocumentState = {
  businessLicense: File | null;
  insuranceCertificate: File | null;
};

export default function ReUploadDocuments() {
  const email = useSelector((state: rootstate) => state.gymAdminData.email);
  const dispatch = useDispatch();

  const [documents, setDocuments] = useState<DocumentState>({
    businessLicense: null,
    insuranceCertificate: null,
  });

  const [previewUrls, setPreviewUrls] = useState<Record<DocumentField, string | null>>({
    businessLicense: null,
    insuranceCertificate: null,
  });

  const [showCropper, setShowCropper] = useState<DocumentField | null>(null);
  const [crop, setCrop] = useState<CropType>({
    unit: "%",
    width: 80,
    aspect: 1,
  });
  const [completedCrop, setCompletedCrop] = useState<CropType | null>(null);

  const imageRef = useRef<HTMLImageElement | null>(null);

  const businessLicenseRef = useRef<HTMLInputElement>(null);
  const insuranceCertificateRef = useRef<HTMLInputElement>(null);

  const { mutate: reUpload, isPending } = useReUploadDocument();

  const handleDrop = useCallback(
    (e: React.DragEvent, field: DocumentField) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (file) processFile(file, field);
    },
    []
  );

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: DocumentField
  ) => {
    const file = e.target.files?.[0];
    if (file) processFile(file, field);
  };

  const processFile = (file: File, field: DocumentField) => {
    const preview = file.type.startsWith("image/")
      ? URL.createObjectURL(file)
      : "file";

    setPreviewUrls((prev) => ({ ...prev, [field]: preview }));
    setDocuments((prev) => ({ ...prev, [field]: file }));
  };

  const removeFile = (field: DocumentField) => {
    setPreviewUrls((prev) => ({ ...prev, [field]: null }));
    setDocuments((prev) => ({ ...prev, [field]: null }));
  };

  const applyCrop = () => {
    if (!completedCrop || !imageRef.current || !showCropper) return;

    const image = imageRef.current;
    const canvas = document.createElement("canvas");

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = completedCrop.width!;
    canvas.height = completedCrop.height!;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(
      image,
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

      const file = new File([blob], "cropped.jpg", { type: "image/jpeg" });
      const url = URL.createObjectURL(file);

      setDocuments((prev) => ({ ...prev, [showCropper]: file }));
      setPreviewUrls((prev) => ({ ...prev, [showCropper]: url }));
      setShowCropper(null);
    });
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = () => {
    if (!documents.businessLicense || !documents.insuranceCertificate) {
      toast.error("Upload all documents");
      return;
    }

    const formData = new FormData();
    formData.append("businessLicense", documents.businessLicense);
    formData.append("insuranceCertificate", documents.insuranceCertificate);
    formData.append("email", email!);

    reUpload(formData, {
      onSuccess: (res) => {
        toast.success(res.message || "Uploaded successfully");
        dispatch(clearGymAdminData());
        dispatch(clearAuthContext());
        dispatch(deleteToken());
      },
      onError: () => toast.error("Upload failed"),
    });
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-black flex justify-center items-center px-4">
      <div className="max-w-4xl w-full space-y-6">

        {/* HEADER */}
        <div className="bg-neutral-950 border border-orange-500/30 rounded-xl p-6 flex gap-4">
          <ShieldCheck className="text-orange-500 h-8 w-8" />
          <div>
            <h1 className="text-white text-xl font-bold">
              Re-Upload Documents
            </h1>
            <p className="text-neutral-400 text-sm">
              Upload valid documents for verification
            </p>
          </div>
        </div>

        {/* UPLOADERS */}
        <div className="bg-neutral-950 border border-orange-500/30 rounded-xl p-6 space-y-6">
          <DocumentUploader
            label="Business License"
            field="businessLicense"
            preview={previewUrls.businessLicense}
            onFile={handleFileSelect}
            onDrop={handleDrop}
            onRemove={removeFile}
            onCrop={() => setShowCropper("businessLicense")}
            inputRef={businessLicenseRef}
          />

          <DocumentUploader
            label="Insurance Certificate"
            field="insuranceCertificate"
            preview={previewUrls.insuranceCertificate}
            onFile={handleFileSelect}
            onDrop={handleDrop}
            onRemove={removeFile}
            onCrop={() => setShowCropper("insuranceCertificate")}
            inputRef={insuranceCertificateRef}
          />

          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full py-4 rounded-xl bg-orange-500 hover:bg-orange-600 font-bold text-black"
          >
            {isPending ? "Uploading..." : "Submit Documents"}
          </button>
        </div>
      </div>

\      {showCropper && previewUrls[showCropper] && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-neutral-900 p-6 rounded-xl max-w-lg w-full">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={1}
            >
              <img
                ref={imageRef}
                src={previewUrls[showCropper]!}
                className="max-h-[400px]"
              />
            </ReactCrop>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowCropper(null)}
                className="px-4 py-2 rounded bg-neutral-700 text-white"
              >
                Cancel
              </button>
              <button
                onClick={applyCrop}
                className="px-4 py-2 rounded bg-orange-500 text-black font-bold"
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