/**
 * Crops square image from center (most common profile pic style)
 * Returns high-quality jpeg File
 */
export const getCroppedImage = async (
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number }
): Promise<File> => {
  const image = new Image()
  image.crossOrigin = "anonymous"

  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve()
    image.onerror = () => reject(new Error("Failed to load image"))
    image.src = imageSrc
  })

  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Cannot get canvas context")

  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  return new Promise<File>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Failed to create image blob"))
          return
        }
        const file = new File([blob], "profile.jpg", {
          type: "image/jpeg",
          lastModified: Date.now(),
        })
        resolve(file)
      },
      "image/jpeg",
      0.92 // ← good quality/size balance
    )
  })
}