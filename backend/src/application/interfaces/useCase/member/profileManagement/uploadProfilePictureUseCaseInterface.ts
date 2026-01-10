export interface IUploadProfileImageUseCase {
  execute(memberId: string, image: Express.Multer.File | string): Promise<string>;
}
