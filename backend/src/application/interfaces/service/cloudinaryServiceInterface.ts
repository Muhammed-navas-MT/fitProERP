export interface ICloudinaryService {
  uploadImageToCloudinary(
    file: Express.Multer.File,
    folder: string,
  ): Promise<string>;
}
