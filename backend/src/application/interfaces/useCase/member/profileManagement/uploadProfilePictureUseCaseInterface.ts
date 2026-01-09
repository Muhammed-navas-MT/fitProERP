export interface IUploadProfileImageUseCase {
  execute(memberId: string, image: string): Promise<string>;
}
