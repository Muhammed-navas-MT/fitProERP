function ImagePreviewModal({
  image,
  onClose,
}: {
  image: string
  onClose: () => void
}) {
  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <img
        src={image}
        alt="Preview"
        className="max-h-[90vh] max-w-[90vw] rounded-lg"
      />
    </div>
  )
};

export default ImagePreviewModal;