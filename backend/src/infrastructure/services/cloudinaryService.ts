import { ICloudinaryService } from "../../application/interfaces/service/cloudinaryServiceInterface";
import cloudinary from "../../config/cloudinary";

export class CloudinaryService implements ICloudinaryService {
    async uploadImageToCloudinary(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream((error, result) => {
            if (error) return reject(error);
            resolve(result!.secure_url);
        }).end(file.buffer);
    });
}

}