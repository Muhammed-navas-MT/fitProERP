export interface IDeleteProfilePictureUseCase {
  execute(memberId: string): Promise<void>;
}
