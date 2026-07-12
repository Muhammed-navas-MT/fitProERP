import { ICloudinaryService } from "../../application/interfaces/service/cloudinaryServiceInterface";
import cloudinary from "../../config/cloudinary";

export class CloudinaryService implements ICloudinaryService {
  async uploadImageToCloudinary(
    file: Express.Multer.File,
    folder: string,
  ): Promise<string> {
    const result = await cloudinary.uploader.upload(file.path, {
      folder,
    });

    return result.secure_url;
  }
}
