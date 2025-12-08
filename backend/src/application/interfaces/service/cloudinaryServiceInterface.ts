export interface ICloudinaryService {
    uploadImageToCloudinary(filePath: Express.Multer.File):Promise<string>;
}